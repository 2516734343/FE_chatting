const crypto = require('crypto');

function get_req_url(params, endpoint) {
    params['Signature'] = escape(params['Signature']);
    const url_strParam = sort_params(params)
    return "https://" + endpoint + "/?" + url_strParam.slice(1);
}

function formatSignString(reqMethod, endpoint, path, strParam) {
    let strSign = reqMethod + endpoint + path + "?" + strParam.slice(1);
    return strSign;
}
function sha1(secretKey, strsign) {
    let signMethodMap = { 'HmacSHA1': "sha1" };
    let hmac = crypto.createHmac(signMethodMap['HmacSHA1'], secretKey || "");
    return hmac.update(Buffer.from(strsign, 'utf8')).digest('base64')
}

function sort_params(params) {
    let strParam = "";
    let keys = Object.keys(params);
    keys.sort();
    for (let k in keys) {
        //k = k.replace(/_/g, '.');
        strParam += ("&" + keys[k] + "=" + params[keys[k]]);
    }
    return strParam
}

export function getInfos(text) {
    // 密钥参数
    const SECRET_ID = "AKIDmKdfy20w2MQdbNGfv846vAE1Z5KKoIk5"
    const SECRET_KEY = "DBuMYOy3vX1EC2k7NyJQhEWXIp7A4aFd"

    const endpoint = "nlp.tencentcloudapi.com"
    const Region = "ap-guangzhou"
    const Version = "2019-04-08"
    const Action = "KeywordsExtraction"
    // const Timestamp = 1465185768  // 时间戳 2016-06-06 12:02:48, 此参数作为示例，以实际为准
    const Timestamp = Math.round(new Date() / 1000);
    console.log(Timestamp);
    // const Nonce = 11886  // 随机正整数
    const Nonce = Math.round(Math.random() * 65535)

    let params = {};
    params['Action'] = Action;
    // params['InstanceIds.0'] = 'ins-09dx96dg';
    // params['Limit'] = 20;
    // params['Offset'] = 0;
    params['Nonce'] = Nonce;
    params['Region'] = Region;
    params['SecretId'] = SECRET_ID;
    params['Timestamp'] = Timestamp;
    params['Version'] = Version;

    // 1. 对参数排序,并拼接请求字符串
    let strParam = sort_params(params)

    // 2. 拼接签名原文字符串
    const reqMethod = "GET";
    const path = "/";
    let strSign = formatSignString(reqMethod, endpoint, path, strParam)

    // 3. 生成签名串
    params['Signature'] = sha1(SECRET_KEY, strSign)

    // 4. 进行url编码并拼接请求url
    const req_url = get_req_url(params, endpoint)
    // console.log(params['Signature'])
    return {
        params: params,
        // Signature: params['Signature']
    }
}
