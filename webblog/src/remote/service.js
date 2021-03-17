import fetch from '@/utils/fetch';

// 获取用户信息
export const getUserInfo = (data) => {
  return fetch('/api/be/chatting/get/user/info', data, "GET");
};
// 获取帖子列表
export const getInvitationList = (data) => {
  return fetch('/api/be/chatting/invitation/list', data, "GET")
};


// 帖子发布
export const releasePost = (data) => {
  return fetch('/api/be/chatting/invitation/release', data, "POST")
};

// 获取帖子详情页
export const getInvitationDetail = (data) => {
  return fetch('/api/be/chatting/invitation/info', data, 'GET')
};

// 获取帖子的评论列表
export const getInvitationCommentList = (data) => {
  return fetch('/api/be/chatting/invitation/comment/list', data, 'GET')
};

// 帖子评论
export const invitationComment = (data) => {
  return fetch('/api/be/chatting/invitation/comment', data, 'POST')
};

// 帖子点赞
export const invitationLike = (data) => {
  return fetch('/api/be/chatting/invitation/like', data, 'POST')
};
// 获取帖子的点赞的用户列表
export const invitationLikeUserList = (data) => {
  return fetch('/api/be/chatting/invitation/like/user/list', data, 'GET')
};