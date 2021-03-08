import {asyncComponent as async} from '@/utils/AsyncComponent.js';


//import() 返回的是一个promise
export const Active = async(()=>import(/* webpackChunkName: "welcome" */'@/page/allActive/Post')); //配置webpackChunkName，打包出来的异步chunk的名称

export const ChatRoom = async(()=>import(/* webpackChunkName: "welcome" */'@/page/chatRoom/ChatRoom')); //配置webpackChunkName，打包出来的异步chunk的名称

