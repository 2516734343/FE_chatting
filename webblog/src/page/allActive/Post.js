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
                like: 20,
                commtnCount: 0,
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
                comment: '在目前的扶贫政策下，像视频里这对父子这类人，有各种扶贫政策给他们钱，对于他们来说，干不干活都已经不重要了，越懒越养，越养越懒。',
                like: 940,
                commtnCount: 650,
                canDelete: true,
                time: 1612160935789,
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
                comment: '情人节你期待什么样的惊喜吗？2021年情人节是如此与众不同，虽然不能和爱人远行、不能旅行、更不能远赴异国度假。在枯燥的宅家生活中，情人节的仪式感显得尤为重要了。用心对待这个特殊的情人节，用心陪伴爱人，相信在情人节收获一份爱的礼物会是多么的感动',
                like: 621,
                commtnCount: 750,
                canDelete: true,
                time: 1612180835568,
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
                comment: 'Jackson不喜欢黄景瑜，王嘉尔忙圆场，陈学冬带娃有妙招戚薇点赞,萌娃和帅哥太养眼了。哥哥们养娃太可爱了。',
                like: 901,
                commtnCount: 1024,
                canDelete: true,
                time: 1612360835568,
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
                comment: '回家过年了。',
                like: 90,
                commtnCount: 20,
                canDelete: true,
                time: 1612560835568,
                userInfo: {
                    userId: 1,
                    name: '我是一个小辣椒',
                    age: 18,
                    sex: 0,
                    avatarUrl: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3155998395,3600507640&fm=26&gp=0.jpg',
                    tag: [{ name: '互联网民工', color: 'magenta' }, { name: '小清新', color: 'green' }, { name: '技术宅', color: 'blue' }, { name: '二次元', color: 'purple' }],
                    note: '我是一条不想翻身的咸鱼。'
                }
            }

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
                            <IconText icon={LikeOutlined} text={item.like} key="list-vertical-like-o" />,
                            <IconText icon={MessageOutlined} text={item.commtnCount} key="list-vertical-message" />,
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
                                    {/* {item.canDelete && <div>
                                        <Button icon={<DeleteOutlined />}
                                            type={'link'}
                                            style={{ marginTop: '10px' }}
                                            danger />
                                    </div>} */}
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
