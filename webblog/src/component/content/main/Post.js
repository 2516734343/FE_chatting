import React, { Component } from 'react'
import { List, Avatar, Button, Skeleton, Space } from 'antd';
import { DeleteOutlined, MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import moment from 'moment';
import './Post.css';
export default class Post extends Component {
    state = {
        commentList: [
            {
                id: 1,
                comment: '火山突兀赤亭口，火山五月火云厚。火云满山凝未开，飞鸟千里不敢来。平明乍逐胡风断，薄暮浑随塞雨回。火云满山凝未开，飞鸟千里不敢来。平明乍逐胡风断，薄暮浑随塞雨回。',
                like: 240,
                commtnCount: 250,
                canDelete: true,
                time: 1612160835568,
                userInfo: {
                    userId: 1,
                    name: '我是一个小辣椒',
                    age: 18,
                    sex: 0,
                    avatarUrl: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3155998395,3600507640&fm=26&gp=0.jpg',
                    tag: [{ name: '互联网民工', color: 'magenta' }, { name: '小清新', color: 'green' }, { name: '技术宅', color: 'blue' }, { name: '二次元', color: 'purple' }],
                    note: '我是一条不想翻身的咸鱼。'
                }
            },
            {
                id: 1,
                comment: '火山突兀赤亭口，火山五月火云厚。火云满山凝未开，飞鸟千里不敢来。平明乍逐胡风断，薄暮浑随塞雨回。',
                like: 240,
                commtnCount: 250,
                canDelete: true,
                time: 1612160835568,
                userInfo: {
                    userId: 1,
                    name: '我是一个小辣椒',
                    age: 18,
                    sex: 0,
                    avatarUrl: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3155998395,3600507640&fm=26&gp=0.jpg',
                    tag: [{ name: '互联网民工', color: 'magenta' }, { name: '小清新', color: 'green' }, { name: '技术宅', color: 'blue' }, { name: '二次元', color: 'purple' }],
                    note: '我是一条不想翻身的咸鱼。'
                }
            },
            {
                id: 1,
                comment: '火山突兀赤亭口，火山五月火云厚。火云满山凝未开，飞鸟千里不敢来。平明乍逐胡风断，薄暮浑随塞雨回。',
                like: 240,
                commtnCount: 250,
                canDelete: true,
                time: 1612160835568,
                userInfo: {
                    userId: 1,
                    name: '我是一个小辣椒',
                    age: 18,
                    sex: 0,
                    avatarUrl: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3155998395,3600507640&fm=26&gp=0.jpg',
                    tag: [{ name: '互联网民工', color: 'magenta' }, { name: '小清新', color: 'green' }, { name: '技术宅', color: 'blue' }, { name: '二次元', color: 'purple' }],
                    note: '我是一条不想翻身的咸鱼。'
                }
            },
            {
                id: 1,
                comment: '火山突兀赤亭口，火山五月火云厚。火云满山凝未开，飞鸟千里不敢来。平明乍逐胡风断，薄暮浑随塞雨回。',
                like: 240,
                commtnCount: 250,
                canDelete: true,
                time: 1612160835568,
                userInfo: {
                    userId: 1,
                    name: '我是一个小辣椒',
                    age: 18,
                    sex: 0,
                    avatarUrl: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3155998395,3600507640&fm=26&gp=0.jpg',
                    tag: [{ name: '互联网民工', color: 'magenta' }, { name: '小清新', color: 'green' }, { name: '技术宅', color: 'blue' }, { name: '二次元', color: 'purple' }],
                    note: '我是一条不想翻身的咸鱼。'
                }
            },
          
        ]
    }

    render() {
        const IconText = ({ icon, text }) => (
            <Space>
              {React.createElement(icon)}
              {text}
            </Space>
          );
        return (
            <div className="list">
                <List itemLayout="horizontal"
                    dataSource={this.state.commentList}
                    renderItem={item => (
                        <List.Item actions={[
                            <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                            <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                        ]}>             
                            <div className="item">
                                <div className="top">
                                    <div className="userInfo">
                                        <Avatar size={50} src={item.userInfo.avatarUrl} />
                                        <div>
                                            <div className="name">{item.userInfo.name}</div>
                                            <div className="time">{moment(item.time).format('YYYY-MM-DD hh:mm:ss')}</div>
                                        </div>
                                    </div>
                                    <div>
                                        <Button icon={<DeleteOutlined />}
                                            type={'link'}
                                            style={{ marginTop: '10px' }}
                                            danger />
                                    </div>
                                </div>
                                <div className="comment">
                                    {item.comment}
                                </div>
                            </div>
                        </List.Item>
                    )}>
                </List>
            </div>
        )
    }
}
