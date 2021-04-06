import React, { Component } from 'react'
import { Modal, Input, message } from 'antd';
import { addUsers } from '@/remote';

const { TextArea } = Input;

export default class AddUserModal extends Component {
  state = {
    visible: false,
    content: '',
    targetUserId: 0,
  }
  cancel = () => {
    this.setState({
      visible: false,
      content: '',
    })
  }
  showModal = (flag, targetUserId) => {
    this.setState({
      visible: true,
      targetUserId,
    })
  }
  contentValueChange = (e) => {
    this.setState({
      content: e.target.value
    })
  };
  handleOK = async () => {
    const params = {
      userId: +window.localStorage.getItem('userId'),
      targetUserId: this.state.targetUserId,
      content: this.state.content
    }
    const resp = await addUsers(params);
    if (resp.status === 200) {
      message.success('已发送好友申请');
      this.setState({
        visible: false,
        content: '',
      })
    } else if (resp.status === 400 && resp.message === "当前用户已经是您的好友") {
      message.warning('此用户已经是您的好友');
      this.setState({
        visible: false,
        content: '',
      })
    }
  }
  render() {
    return (
      <Modal visible={this.state.visible}
        onCancel={this.cancel}
        onOk={this.handleOK}
        cancelText={'取消'}
        okText={'发送'}
        title={'申请添加好友'}>
        <div>
          <p style={{ color: '#898a8c' }}>发送添加好友申请</p>
          <TextArea
            onChange={this.contentValueChange}
            value={this.state.contentValue}
            style={{ outline: 'none' }} />
        </div>
      </Modal>
    )
  }
}
