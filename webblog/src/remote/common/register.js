import fetch from '@/utils/fetch';

// 注册
export const register = (data) => {
    return fetch('/api/be/chatting/common/register', data, "POST");
};
