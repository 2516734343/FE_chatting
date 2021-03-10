import fetch from '@/utils/fetch';

// 获取用户信息
export const getUserInfo = (data) => {
  return fetch('/api/be/chatting/get/user/info', data, "GET");
};
