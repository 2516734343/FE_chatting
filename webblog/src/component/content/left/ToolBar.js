import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { withRouter } from "react-router";
import { Menu } from 'antd';
import RouteConfig from '@/routeConfig.js';
import { AreaChartOutlined, PieChartOutlined, CommentOutlined, TeamOutlined, SolutionOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;


class ToolBar extends Component {
    state = {
        selectedKeys: [],
    }
    clickSelect = (item, key) => {
        this.setState({
            selectedKeys: [item.key]
        })
        console.log(this.state.selectedKeys);
    }
    render() {
        return (
            <div className="toolBar">
                <Menu mode="inline" openKeys={'1'} style={{ width: '100%' }}
                    defaultSelectedKeys={['1']}
                    onClick={(item, key) => { this.clickSelect(item, key) }}
                    selectedKeys={this.state.selectedKeys}>
                    <Menu.Item key="1" icon={<PieChartOutlined style={{ fontSize: '20px', marginRight: '20px' }} />}>
                        <Link to={RouteConfig.active}>全部动态</Link>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<CommentOutlined style={{ fontSize: '20px', marginRight: '20px' }} />}>
                        <Link to={RouteConfig.chat}>我的聊天</Link>
                    </Menu.Item>
                    {/* <Menu.Item key="3" icon={<TeamOutlined style={{ fontSize: '20px', marginRight: '20px' }} />}>好友列表</Menu.Item> */}
                    <Menu.Item key="4" icon={<SolutionOutlined style={{ fontSize: '20px', marginRight: '20px' }} />}>
                        <Link to={RouteConfig.personalInfo}>个人中心</Link></Menu.Item>
                    {/* <Menu.Item key="5" icon={<AreaChartOutlined style={{ fontSize: '20px', marginRight: '20px' }} />}>数据管理</Menu.Item> */}
                </Menu>
            </div>
        )
    }
}

export default withRouter(ToolBar);
