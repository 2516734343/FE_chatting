import React, { Component } from 'react'
import './Left.css';
import { Col, Row, Input, Avatar, Popover, Menu, Tag } from 'antd';
import { UserOutlined } from '@ant-design/icons/lib/icons';
import { getUserInfo } from '@/remote';

const url = 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3155998395,3600507640&fm=26&gp=0.jpg';
export default class UserInfo extends Component {
    state = {
        userInfo: {
            name: '我是一个小辣椒',
            age: 18,
            sex: 0,
            avatarUrl: '',
            tag: [{ name: '互联网民工', color: 'magenta' }, { name: '小清新', color: 'green' }, { name: '技术宅', color: 'blue' }, { name: '二次元', color: 'purple' }],
            note: '我是一条不想翻身的咸鱼。'
        }
    };
    componentDidMount = () => {
        this.getUserInfos();

    };
    getUserInfos = async () => {
        const userId = window.localStorage.getItem('userId');
        const resp = await getUserInfo({ userId: +userId });
        console.log(resp.data);
        if (resp.status) {
            this.setState({
                userInfo: { ...resp.data }
            })
        }
    }
    render() {
        const { userInfo } = this.state;
        return (
            <div className="userInfo">
                <div className="basicInfo">
                    <Avatar size={64} src={url} />
                    <div>
                        <div className="username">{userInfo.name}</div>
                        <div className="userage">
                            <span>{userInfo.age}岁</span>
                            {userInfo.sex === 0 ? <span className="woman">♀</span> : <span className="man">♂</span>}
                        </div>

                    </div>
                </div>
                <div className="note">{`「${userInfo.note}」`}</div>
                <div className="tag">
                    {
                        userInfo.tag.map((item, index) => {
                            return <Tag color={item.color} style={{ borderRadius: '4px' }}>{item.name}</Tag>
                        })
                    }
                </div>
            </div>
        )
    }
}
