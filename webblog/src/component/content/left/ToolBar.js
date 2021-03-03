import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import { Menu } from 'antd';
import { AreaChartOutlined, PieChartOutlined, MessageOutlined, TeamOutlined, SolutionOutlined } from '@ant-design/icons';
const { SubMenu } = Menu;
export default class ToolBar extends Component {
    render() {
        return (
            <div className="toolBar">
                <Router>
                    <Menu mode="inline" openKeys={'sub1'} style={{ width: '100%' }}>
                        <Menu.Item key="1" icon={<PieChartOutlined style={{ fontSize: '20px', marginRight: '20px' }} />}>
                            <NavLink to="/allActive">全部动态</NavLink>
                        </Menu.Item>
                        <Menu.Item key="2" icon={<MessageOutlined style={{ fontSize: '20px', marginRight: '20px' }} />}>
                            <NavLink to="/chat">我的聊天</NavLink>
                        </Menu.Item>
                        <Menu.Item key="3" icon={<TeamOutlined style={{ fontSize: '20px', marginRight: '20px' }} />}>好友列表</Menu.Item>
                        <Menu.Item key="4" icon={<SolutionOutlined style={{ fontSize: '20px', marginRight: '20px' }} />}>个人资料</Menu.Item>
                        <Menu.Item key="5" icon={<AreaChartOutlined style={{ fontSize: '20px', marginRight: '20px' }} />}>数据管理</Menu.Item>
                    </Menu>
                </Router>
            </div>
        )
    }
}
