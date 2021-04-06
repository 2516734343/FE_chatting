import React, { Component } from 'react'
import { Tabs } from 'antd';
import { IdcardOutlined, MessageOutlined, TeamOutlined, HeartOutlined } from '@ant-design/icons';
import css from './PersonalInfo.less';
import BasicInfo from './basicInfo/BasicInfo';
import MyUserList from './myUsers/MyUserList';
import LikeList from './likeList/LikeList';
import CommentList from './commentList/CommentList';


const { TabPane } = Tabs;

export default class PersonalInfo extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log(this.child);
    return (
      <div className={css.personalInfoPage}>
        <div className={css.top}>
        </div>
        <div className={css.content}>
          <Tabs defaultActiveKey="1">
            <TabPane tab={<span><IdcardOutlined />基本信息</span>} key="1">
              <BasicInfo />
            </TabPane>
            <TabPane tab={<span><TeamOutlined />好友列表</span>} key="2">
              <MyUserList />
            </TabPane>
            <TabPane tab={<span><HeartOutlined />我的点赞</span>} key="3">
              <LikeList />
            </TabPane>
            <TabPane tab={<span><MessageOutlined />我的评论</span>} key="4">
              <CommentList />
            </TabPane>
          </Tabs>
        </div>
      </div>
    )
  }
}
