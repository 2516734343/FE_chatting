import fetch from '@/utils/fetch';

// 退出登录
export const loginout = (data) => {
    return fetch('/api/be/chatting/common/logout', data, "POST");
};
