import React, { Component } from 'react'
import css from './SendActive.less';
import { List, Avatar, Button, Skeleton, Space, Input } from 'antd';
import { DeleteOutlined, MessageOutlined, LikeOutlined, EditOutlined } from '@ant-design/icons';

export default class SendActive extends Component {
    render() {
        return (
            <div className={css.SendActive}>
                <div className={css.top}>
                    <Button>取消</Button>
                </div>
                <div>

                </div>
            </div>
        )
    }
}
