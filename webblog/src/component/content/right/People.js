import React, { Component } from 'react'
import { List, Avatar, Button, Skeleton, Space } from 'antd';
import { SmileTwoTone, UserAddOutlined } from '@ant-design/icons';
export default class People extends Component {
    state = {
        userList: [
            {
                userId: 1,
                name: '小辣椒',
                age: 18,
                sex: 0,
                avatarUrl: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3155998395,3600507640&fm=26&gp=0.jpg',
                tag: [{ name: '互联网民工', color: 'magenta' }, { name: '小清新', color: 'green' }, { name: '技术宅', color: 'blue' }, { name: '二次元', color: 'purple' }],
                note: '我是一条不想翻身的咸鱼。'
            },
            {
                userId: 2,
                name: '猫南北',
                age: 18,
                sex: 0,
                avatarUrl: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3155998395,3600507640&fm=26&gp=0.jpg',
                tag: [{ name: '互联网民工', color: 'magenta' }, { name: '小清新', color: 'green' }, { name: '技术宅', color: 'blue' }, { name: '二次元', color: 'purple' }],
                note: '我是一条不想翻身的咸鱼。'
            },
            {
                userId: 3,
                name: '艺海',
                age: 18,
                sex: 0,
                avatarUrl: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3155998395,3600507640&fm=26&gp=0.jpg',
                tag: [{ name: '互联网民工', color: 'magenta' }, { name: '小清新', color: 'green' }, { name: '技术宅', color: 'blue' }, { name: '二次元', color: 'purple' }],
                note: '我是一条不想翻身的咸鱼。'
            },
            {
                userId: 4,
                name: '专业二哈拆家',
                age: 18,
                sex: 0,
                avatarUrl: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3155998395,3600507640&fm=26&gp=0.jpg',
                tag: [{ name: '互联网民工', color: 'magenta' }, { name: '小清新', color: 'green' }, { name: '技术宅', color: 'blue' }, { name: '二次元', color: 'purple' }],
                note: '我是一条不想翻身的咸鱼，每天就想着下班和干饭。'
            }
        ]
    }
    render() {
        return (
            <div className="people">
                <div className="user-recom"><SmileTwoTone style={{marginRight: '5px'}}/>好友推荐</div>
                <List itemLayout="horizontal"
                    dataSource={this.state.userList}
                    renderItem={item => (
                        <List.Item
                            actions={[<Button icon={<UserAddOutlined style={{ color: '#1890ff' }} />}
                                className="addUser"/>]}
                        >
                            <List.Item.Meta
                                avatar={
                                    <Avatar src={item.avatarUrl} />
                                }
                                title={<span>{item.name}</span>}
                                description={<span className="user_note">{item.note}</span>}
                            />
                        </List.Item>
                    )}>
                </List>
            </div>
        )
    }
}
