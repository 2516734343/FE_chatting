import fetch from '@/utils/fetch';

// 登录
export const login = (data) => {
    return fetch('/api/be/chatting/common/login', data, "POST");
};
