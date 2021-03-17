import React, { Component } from 'react'
import './Header.css';
import { Col, Row, Input, Avatar, Popover, Menu, Button, Tooltip, message } from 'antd';
import { EnvironmentOutlined, CloudOutlined, SkinOutlined, AntDesignOutlined, LoginOutlined } from '@ant-design/icons/lib/icons';
import { getUserInfo } from '@/remote';
import { loginout } from '@/remote';
import RouteConfig from '../../routeConfig';

const { Search } = Input;
export default class Header extends Component {
    state = {
        userInfo: {

        },
        loading: false,
    };
    componentDidMount = () => {
        this.getUserInfos();

    };
    getUserInfos = async () => {
        const userId = window.localStorage.getItem('userId');
        try {
            const resp = await getUserInfo({ userId: +userId });
            if (resp.status === 200) {
                this.setState({
                    userInfo: Object.assign({}, resp.data)
                });
            }

        } catch (e) {

        } finally {
            this.setState({
                loading: true
            });
        }
    };
    loginOut = async () => {
        const resp = await loginout({ username: this.state.userInfo.username });
        if (resp.status === 200) {
            message.success('退出登录成功');
            window.localStorage.clear();
            this.props.history.push(RouteConfig.login);
        }
    };
    render() {
        return (
            <div className="header">
                <div className="headerBox">
                    <Row style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                        <Col span={2} className="col">
                            <div className="logo">
                                <Avatar style={{ backgroundColor: '#1890ff' }} icon={<AntDesignOutlined />} />
                                <span className="logoName">趣聊</span>
                            </div>
                        </Col>
                        <Col span={6} className="info" style={{ display: 'flex', alignItems: 'center' }}>
                            <div className="divs">
                                <EnvironmentOutlined style={{ fontSize: '18px' }} />
                                <span>北京</span>
                            </div>
                            <div className="divs">
                                <CloudOutlined style={{ fontSize: '18px' }} />
                                <span>晴天</span>
                            </div>
                            <div className="divs">
                                <SkinOutlined style={{ fontSize: '18px' }} />
                                <Popover placement="bottom"
                                    title={'皮肤选择'}
                                    content={<div>
                                        <Menu>
                                            <Menu.Item>菜单项1</Menu.Item>
                                            <Menu.Item>菜单项2</Menu.Item>
                                        </Menu>
                                    </div>}
                                    trigger="click">
                                    <span>换肤</span>
                                </Popover>
                            </div>
                        </Col>
                        <Col span={9}>
                            <Search placeholder={'请输入好友昵称'}
                                style={{ width: '400px', height: '36px' }} />
                        </Col>
                        <Col span={3} offset={4}>
                            <Avatar src={this.state.userInfo.photo} />
                            <span style={{ marginLeft: '5px' }}>{this.state.userInfo.name}</span>
                            <Tooltip title={'退出登录'}>
                                <Button icon={<LoginOutlined style={{ color: 'red' }} />}
                                    onClick={this.loginOut}
                                    style={{ marginLeft: '5px' }}
                                    type={'link'} />
                            </Tooltip>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}
