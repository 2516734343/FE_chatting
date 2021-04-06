import fetch from '@/utils/fetch';

// 获取用户地区分布
export const getLocation = (data) => {
    return fetch('https://restapi.amap.com/v3/geocode/geo', data, 'GET')
};
