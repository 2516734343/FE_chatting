import Async from "./fetch";
import { message } from 'antd';

export default async (url = "", data = {}, type = "GET", notify = false) => {
    const $http = new Async(url, data, type);
    $http.httpProvider = function () {
        return {
            response(response, responseJson) {
                if (response.status == 200) {
                    if (notify && responseJson) {
                        if (responseJson.status === "success") {
                            // Message({
                            //     message: responseJson.message || "操作成功",
                            //     type: "success",
                            //     showClose: true,
                            //     duration: 2000
                            // });
                            message.success(responseJson.message || "操作成功");
                        } else {
                            // Message({
                            //     message: responseJson.message || "操作失败",
                            //     type: "error",
                            //     showClose: true,
                            //     duration: 2000
                            // });
                            // throw new Error();
                            message.error(responseJson.message || "操作失败");
                        }
                    }
                    return responseJson;
                }
                if (response.status == 401) {
                    // Message({
                    //     type: 'error',
                    //     message: "登录超时,3秒后退出登录"
                    // })
                    message.error("登录超时,3秒后退出登录");
                    setTimeout(() => {
                        window.location.href = "/";
                    }, 3000);
                    // throw new Error();
                    return responseJson;
                }
                // Message({
                //     message: `操作失败,请联系管理员,错误代码${response.status}`,
                //     type: "error",
                //     showClose: true,
                //     duration: 2000
                // });
                message.error(`操作失败,请联系管理员,错误代码${response.status}`);
                throw new Error();
            }
        };
    };
    const res = await $http.send();
    return res;
};
