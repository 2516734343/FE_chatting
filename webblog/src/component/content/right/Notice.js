import React, { Component } from 'react'
import { NotificationTwoTone } from '@ant-design/icons';
export default class Notice extends Component {
    state={
        notice: '维护社区文明，人人有责'
    }
    render() {
        return (
            <div className="notice">
                <div className="notice-title">
                    <NotificationTwoTone twoToneColor="#108ee9" style={{ marginRight: '5px' }} />
                    公告
                </div>
                <div className="notice-content">
                   {this.state.notice}
                </div>
            </div>
        )
    }
}
