import React, { Component } from 'react';
import { Col, Row, Input, Avatar, Divider, Menu, Button, Tooltip, message, Select, List, Empty } from 'antd';
import { UserAddOutlined } from '@ant-design/icons/lib/icons';
import { getUsersList, getUsersApplyList, handleApply } from '@/remote'
import css from './MyUserList.less';

export default class MyUserList extends Component {
  state = {
    userList: [],
    applyList: [],
  }
  componentDidMount() {
    this.getData();
    this.getUsersApply();
  }
  getData = async () => {
    const resp = await getUsersList({ userId: +window.localStorage.getItem('userId') });
    if (resp.status === 200) {
      this.setState({
        userList: resp.data.list || []
      })
    }
  }
  getUsersApply = async () => {
    const resp = await getUsersApplyList({ userId: +window.localStorage.getItem('userId') });
    if (resp.status === 200) {
      this.setState({
        applyList: resp.data.list || []
      })
    }
  }
  handleUserApply = async (e, recordId, status) => {
    const params = {
      recordId,
      status, //1：通过，2：拒绝
    }
    const resp = await handleApply(params);
    if (resp.status === 200) { // 处理完后刷新好友列表和好友申请列表
      message.success(`已${status === 1 ? '通过' : '拒绝'}`);
      if (status === 1) {
        this.getData();
        this.getUsersApply();
      }
    }
  }
  render() {
    return (
      <div className={css.myUserList}>
        <div>
          <p>我的好友申请</p>
          {
            this.state.applyList.length > 0 ?
              <List itemLayout="horizontal"
                dataSource={this.state.applyList}
                renderItem={item => (
                  <List.Item
                    actions={[<Button
                      className={css.addUser} onClick={e => { this.handleUserApply(e, item.recordId, 1) }} >同意</Button>,
                    <Button
                      className={css.reject} onClick={e => { this.handleUserApply(e, item.recordId, 2) }} >拒绝</Button>
                    ]}
                  >
                    <List.Item.Meta
                      avatar={
                        <Avatar src={item.photo} />
                      }
                      title={<span>{item.name}</span>}
                      description={<span className={css.user_note}>{item.reason}</span>}
                    />
                  </List.Item>
                )}>
              </List>
              :
              <div style={{ paddingBottom: '20px' }}>
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description={
                    <span style={{ fontSize: '14px' }}>
                      暂无好友申请
      </span>
                  }
                >
                </Empty>
              </div>
          }
        </div>
        <Divider style={{ margin: '0px 0px 20px 0px' }} />
        {
          this.state.userList.length > 0 ?
            <List itemLayout="horizontal"
              dataSource={this.state.userList}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar src={item.photo} />
                    }
                    title={<span>{item.name}</span>}
                    description={<span className="user_note">{item.signature}</span>}
                  />
                </List.Item>
              )}>
            </List>
            :
            <div style={{ paddingBottom: '20px' }}>
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={
                  <span style={{ fontSize: '14px' }}>
                    没有添加过任何好友
                  </span>
                }
              >
              </Empty>
            </div>
        }
      </div>
    )
  }
}
