// // Depends on tencentcloud-sdk-nodejs version 4.0.3 or higher
// const tencentcloud = require("tencentcloud-sdk-nodejs");
// import * as tencentcloud from 'tencentcloud-sdk-nodejs';

// const NlpClient = tencentcloud.nlp.v20190408.Client;
//
// const clientConfig = {
//     credential: {
//         secretId: "AKIDmKdfy20w2MQdbNGfv846vAE1Z5KKoIk5",
//         secretKey: "DBuMYOy3vX1EC2k7NyJQhEWXIp7A4aFd",
//     },
//     region: "ap-guangzhou",
//     profile: {
//         httpProfile: {
//             endpoint: "nlp.tencentcloudapi.com",
//         },
//     },
// };
//
// const client = new NlpClient(clientConfig);
// export const getKeyWord = (params) => {
//     client.KeywordsExtraction(params).then(
//         (data) => {
//             console.log(data);
//         },
//         (err) => {
//             console.error("error", err);
//         }
//     );
// }
const crypto = require('crypto');

function sha256(message, secret = '', encoding) {
    const hmac = crypto.createHmac('sha256', secret)
    return hmac.update(message).digest(encoding)
}
function getHash(message, encoding = 'hex') {
    const hash = crypto.createHash('sha256')
    return hash.update(message).digest(encoding)
}
function getDate(timestamp) {
    const date = new Date(timestamp * 1000)
    const year = date.getUTCFullYear()
    const month = ('0' + (date.getUTCMonth() + 1)).slice(-2)
    const day = ('0' + date.getUTCDate()).slice(-2)
    return `${year}-${month}-${day}`
}
export function getUrl(){
    // 密钥参数
    const SECRET_ID = "AKIDmKdfy20w2MQdbNGfv846vAE1Z5KKoIk5"
    const SECRET_KEY = "DBuMYOy3vX1EC2k7NyJQhEWXIp7A4aFd"

    const endpoint = "nlp.tencentcloudapi.com"
    const service = "nlp"
    const region = "ap-guangzhou"
    const action = "KeywordsExtraction"
    const version = "2019-04-08"
    // const timestamp = Math.round(Date.now() / 1000);
    const Text = 'text';
    const timestamp = Math.round(new Date()/1000)
    //时间处理, 获取世界时间日期
    const date = getDate(timestamp)

    // ************* 步骤 1：拼接规范请求串 *************
    const signedHeaders = "content-type;host"

    const payload = "{\"Limit\": 1, \"Filters\": [{\"Values\": [\"\\u672a\\u547d\\u540d\"], \"Name\": \"instance-name\"}]}"

    // const hashedRequestPayload = getHash(payload);
    const httpRequestMethod = "POST"
    const canonicalUri = "/"
    const canonicalQueryString = ""
    const canonicalHeaders = "content-type:application/json; charset=utf-8\n" + "host:" + endpoint + "\n"

    const canonicalRequest = httpRequestMethod + "\n"
        + canonicalUri + "\n"
        + canonicalQueryString + "\n"
        + canonicalHeaders + "\n"
        + signedHeaders + "\n"
        // + hashedRequestPayload
    console.log(canonicalRequest)
    console.log("----------------------------")

    // ************* 步骤 2：拼接待签名字符串 *************
    const algorithm = "TC3-HMAC-SHA256"
    const hashedCanonicalRequest = getHash(canonicalRequest);
    const credentialScope = date + "/" + service + "/" + "tc3_request"
    const stringToSign = algorithm + "\n" +
        timestamp + "\n" +
        credentialScope + "\n" +
        hashedCanonicalRequest
    console.log(stringToSign)
    console.log("----------------------------")

    // ************* 步骤 3：计算签名 *************
    const kDate = sha256(date, 'TC3' + SECRET_KEY)
    const kService = sha256(service, kDate)
    const kSigning = sha256('tc3_request', kService)
    const signature = sha256(stringToSign, kSigning, 'hex')
    console.log(signature);
    console.log(timestamp.toString());
    console.log("----------------------------")

    // ************* 步骤 4：拼接 Authorization *************
    const authorization = algorithm + " " +
        "Credential=" + SECRET_ID + "/" + credentialScope + ", " +
        "SignedHeaders=" + signedHeaders + ", " +
        "Signature=" + signature
    console.log(authorization)
    console.log("----------------------------")

    const Call_Information = 'curl -X POST ' + "https://" + endpoint
        + ' -H "Authorization: ' + authorization + '"'
        + ' -H "Content-Type: application/json; charset=utf-8"'
        + ' -H "Host: ' + endpoint + '"'
        + ' -H "X-TC-Action: ' + action + '"'
        + ' -H "X-TC-Timestamp: ' + timestamp.toString() + '"'
        + ' -H "X-TC-Version: ' + version + '"'
        + ' -H "X-TC-Region: ' + region + '"'
        + '-d ' + Text
    // return Call_Information;
    return {
        signature:signature,
        authorization:authorization
    }
}
