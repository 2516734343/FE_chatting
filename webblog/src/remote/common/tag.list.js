import fetch from '@/utils/fetch';

// 标签列表
export const getTagList = (data) => {
    return fetch('/api/be/chatting/common/tag/List', data, "GET");
};
