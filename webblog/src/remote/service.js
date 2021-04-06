import fetch from '@/utils/fetch';

// 获取用户信息
export const getUserInfo = (data) => {
  return fetch('/api/be/chatting/get/user/info', data, "GET");
};
// 修改用户信息
export const updateUserInfo = (data) => {
  return fetch('/api/be/chatting/update/user/info', data, "POST");
};
// 获取帖子列表
export const getInvitationList = (data) => {
  return fetch('/api/be/chatting/invitation/list', data, "GET")
};
// 8.帖子删除
export const deleteInvitation = (data) => {
  return fetch('/api/be/chatting/invitation/delete', data, "POST")
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

// 获取点赞量前五的帖子
export const getLikeTopList = (data) => {
  return fetch('/api/be/chatting/invitation/like/top/five/list', data, 'GET')
};

// 获取评论量量前五的帖子
export const getCommentTopList = (data) => {
  return fetch('/api/be/chatting/invitation/comment/top/five/list', data, 'GET')
};

// 获取用户最近一周的点赞量，发帖量，评论量
export const getUserWeek = (data) => {
  return fetch('/api/be/chatting/invitation/user/action/list', data, 'GET')
};

// 获取用户推荐列表（返回匹配度最高的前五条倒序）
export const getRecommendList = (data) => {
  return fetch('/api/be/chatting/user/recommend/list', data, 'GET')
};

// 搜索好友
export const searchUsers = (data) => {
  return fetch('/api/be/chatting/user/friend/find', data, 'GET')
};

// 添加好友
export const addUsers = (data) => {
  return fetch('/api/be/chatting/user/friend/add', data, 'POST')
};

// 获取用户好友列表
export const getUsersList = (data) => {
  return fetch('/api/be/chatting/user/friend/list', data, 'GET')
};

// 获取用户好友申请列表
export const getUsersApplyList = (data) => {
  return fetch('/api/be/chatting/user/friend/apply/list', data, 'GET')
};

// 21.处理好友申请
export const handleApply = (data) => {
  return fetch('/api/be/chatting/user/friend/apply', data, 'POST')
};

// 获取用户的聊天记录
export const getChatRecord = (data) => {
  return fetch('/api/be/chatting/user/chat/record/list', data, 'GET')
};

// 获取用户点赞的帖子
export const getLikedList = (data) => {
  return fetch('/api/be/chatting/user/like/invitation/list', data, 'GET')
};

// 获取用户评论的帖子
export const getCommentedList = (data) => {
  return fetch('/api/be/chatting/user/comment/invitation/list', data, 'GET')
};

// 获取用户地区分布
export const getUsersArea = (data) => {
  return fetch('/api/be/chatting/city/user/list', data, 'GET')
};


// 获取标签选择数量
export const getTagUserList = (data) => {
  return fetch('/api/be/chatting/tag/user/list', data, 'GET')
};