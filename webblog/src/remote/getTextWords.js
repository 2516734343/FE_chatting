import fetch from '@/utils/fetch';

// 获取用户地区分布
export const getTextKeyWords= (data) => {
    return fetch('https://nlp.tencentcloudapi.com', data, 'GET')
};
