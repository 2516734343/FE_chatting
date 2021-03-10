import React, { Component } from 'react'
import { observer } from 'mobx-react';
import './Login.css'
import { Button, Input, Tabs, Radio, Upload, Select, message } from 'antd';
import { UserOutlined, UnlockOutlined } from '@ant-design/icons';
import RouteConfig from '@/routeConfig.js';
import { observe } from 'web-vitals/dist/lib/observe';
import { action, observable, runInAction } from 'mobx';
import ImgCrop from 'antd-img-crop';
import { register, login } from '@/remote';
import Register from './Register';

const { TabPane } = Tabs;

@observer
class Login extends Component {
    state = {
        type: 'login',
        username: '',
        password: '',
    };

    handleModeChange = (e) => {
        this.setState({
            type: e.target.value
        });
    };
    handleUsernameChange = (e) => {
        const reg = /^[^\u4E00-\u9FFF]+$/;
        if (!reg.test(e.target.value)) {
            message.error('用户名不能含有中文');
        }
        this.setState({
            username: e.target.value
        })
    };
    handlePasswordChagne = (e) => {
        this.setState({
            password: e.target.value
        })
    };
    hanldeLogin = async () => {
        if (!this.state.username || !this.state.password) {
            message.error('用户名或密码不能为空');
            return;
        }
        const params = {
            username: this.state.username,
            password: this.state.password,
        };
        const resp = await login(params);
        if (resp.status === 200) {
            if (resp.data.loginStatus === 0) {
                window.localStorage.setItem('authentication', resp.data.authentication);
                window.localStorage.setItem("userId", resp.data.userId);
                this.setState({
                    username: resp.data.username,
                    password: resp.data.password,
                });
                message.success('登陆成功');
                this.props.history.push(RouteConfig.active);
            } else {
                message.error('用户名或密码不正确')
            }
        } else if (resp.status === 400) {
            message.error(resp.message);
        }
    };
    render() {
        return (
            <div className="login">
                <div className="loginWrap">
                    <div className="tab">
                        <Radio.Group onChange={this.handleModeChange} style={{ marginBottom: 8 }} value={this.state.type}>
                            <Radio.Button value="login" style={{ width: '120px' }}>登录</Radio.Button>
                            <Radio.Button value="register" style={{ width: '120px' }}>注册</Radio.Button>
                        </Radio.Group>
                    </div>
                    <div className="loginBox">
                        {
                            this.state.type === 'login' ?
                                <div className='loginForm'>
                                    {/*<div>登陆</div>*/}
                                    <div className="item">
                                        <span className="label">用户名：</span>
                                        <Input
                                            placeholder="请输入用户名"
                                            prefix={<UserOutlined />}
                                            size={'large'}
                                            value={this.state.username}
                                            onChange={this.handleUsernameChange}
                                            style={{ borderRadius: '4px' }}
                                        />
                                    </div>
                                    <div className="item">
                                        <span className="label">密码：</span>
                                        <Input.Password
                                            placeholder="请输入密码"
                                            prefix={<UnlockOutlined />}
                                            size={'large'}
                                            value={this.state.password}
                                            onChange={this.handlePasswordChagne}
                                            style={{ borderRadius: '4px' }}
                                        />
                                    </div>
                                    <Button onClick={this.hanldeLogin}
                                        type={'primary'}
                                        style={{ width: '250px', marginTop: '50px' }}>
                                        登陆
                                    </Button>
                                </div>
                                :
                                <div className="registerForm">
                                    <Register />
                                </div>
                        }
                    </div>


                </div>

            </div>
        )
    }
}
export default Login;
