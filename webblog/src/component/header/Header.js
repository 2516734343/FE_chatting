import React, { Component } from 'react'
import './Header.css';
import { Col, Row, Input, Avatar, Popover, Menu } from 'antd';
import { EnvironmentOutlined, CloudOutlined, SkinOutlined } from '@ant-design/icons/lib/icons';

const { Search } = Input;
export default class Header extends Component {
    render() {
        return (
            <div className="header">
                <div className="headerBox">
                    <Row style={{ width: '100%', display: 'flex' }}>
                        <Col span={2} className="col">
                            <div className="logo">
                                <Avatar style={{ backgroundColor: '#f56a00', verticalAlign: 'middle' }} size="large">
                                    user
                                </Avatar>
                                <span className="logoName">logo</span>
                            </div>
                        </Col>
                        <Col span={5} className="info" style={{display: 'flex'}}>
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
                        <Col span={5}>
                            <Search placeholder={'请输入好友昵称'}
                                style={{ width: '400px', height: '36px' }} />
                        </Col>
                        <Col span={2} offset={10}>
                            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                            <span>小辣椒</span>
                        </Col>

                    </Row>
                </div>
            </div>
        )
    }
}
