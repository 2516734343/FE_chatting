import { asyncComponent as async } from '@/utils/AsyncComponent.js';


//import() 返回的是一个promise
// 全部动态
export const Active = async(() => import(/* webpackChunkName: "welcome" */'@/page/allActive/Post')); //配置webpackChunkName，打包出来的异步chunk的名称

// 聊天室
export const ChatRoom = async(() => import(/* webpackChunkName: "welcome" */'@/page/chatRoom/ChatRoom')); //配置webpackChunkName，打包出来的异步chunk的名称

// 发布帖子

export const SendActive = async(() => import(/* webpackChunkName: "welcome" */'@/page/sendActive/SendActive'));

// 帖子详情页

export const ActiveDetail = async(() => import(/* webpackChunkName: "welcome" */'@/page/activeDetail/ActiveDetail'));

// 个人资料

export const PersonalInfo = async(() => import(/* webpackChunkName: "welcome" */'@/page/personalInfo/PersonalInfo'));

// 数据分析

export const DataAnalysize = async(() => import(/* webpackChunkName: "welcome" */'@/page/dataAnalysize/DataAnalysize'));
