import React, { Component } from 'react'
import { observer } from 'mobx-react';
import './Login.css'
import {Button, Input,Tabs, Radio, Upload, Select } from 'antd';
import  {UserOutlined, UnlockOutlined} from '@ant-design/icons';
import RouteConfig from '@/routeConfig.js';
import { observe } from 'web-vitals/dist/lib/observe';
import { action, observable, runInAction } from 'mobx';
import ImgCrop from 'antd-img-crop';
import {getTagList, register} from '@/remote';

const { TabPane } = Tabs;
const Option = Select.Option;
@observer
class Login extends Component {
    state = {
        type: 'login',
        fileList: [],
        tagList: [],
    };
    componentDidMount() {
       this.getTags();
    }
    getTags = async () => {
        console.log(111);
        const respData = await getTagList({});
        if (respData.status === 200) {
            this.setState({
                tagList: respData.data.list || []
            })
        }
    };

    handleModeChange = (e) => {
        this.setState({
            type: e.target.value
        });
    };
    onPreview = async (file) => {
        let src = file.url;
        if (!src) {
            src = await new Promise(resolve => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow.document.write(image.outerHTML);
    };
    onChange = (fileList) => {
        this.setState({
            fileList: fileList
        });
        console.log(this.state.fileList);
    };
    render() {
        return (
            <div className="login">
                <div className="loginWrap">
                    <div className="tab">
                        <Radio.Group onChange={this.handleModeChange} style={{ marginBottom: 8 }} value={this.state.type}>
                            <Radio.Button value="login" style={{width: '120px'}}>登录</Radio.Button>
                            <Radio.Button value="register" style={{width: '120px'}}>注册</Radio.Button>
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
                                            prefix={ <UserOutlined /> }
                                            size={ 'large' }
                                            style={ { borderRadius: '4px' } }
                                        />
                                    </div>
                                    <div className="item">
                                        <span className="label">密码：</span>
                                        <Input.Password
                                            placeholder="请输入密码"
                                            prefix={ <UnlockOutlined /> }
                                            size={ 'large' }
                                            style={ { borderRadius: '4px' } }
                                        />
                                    </div>
                                    <Button onClick={ () => {this.props.history.push(RouteConfig.active)} }
                                            type={ 'primary' }
                                            style={{width: '250px', marginTop: '50px'}}>
                                        登陆
                                    </Button>
                                </div>
                                :
                                <div className="registerForm">
                                    <div className="item">
                                        <span className="required">* </span>
                                        <span className="label">头像：</span>
                                        {/*<ImgCrop rotate>*/}
                                            <Upload
                                                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                                listType="picture-card"
                                                fileList={this.state.fileList}
                                                onChange={this.onChange}
                                                onPreview={this.onPreview}
                                            >
                                                上传头像
                                            </Upload>
                                        {/*</ImgCrop>*/}
                                    </div>
                                    <div className="item">
                                        <span className="required">* </span>
                                        <span className="label">用户名：</span>
                                        <Input placeholder={'请输入用户名'}/>
                                    </div>
                                    <div className="item">
                                        <span className="required">* </span>
                                        <span className="label">昵称：</span>
                                        <Input placeholder={'请输入昵称'}/>
                                    </div>
                                    <div className="item">
                                        <span className="required">* </span>
                                        <span className="label">性别：</span>
                                        <Select style={{width: '100%', flex: 1}}>
                                            <Option value={0}>男</Option>
                                            <Option value={1}>女</Option>
                                        </Select>
                                    </div>
                                    <div className="item">
                                        <span className="required">* </span>
                                        <span className="label">年龄：</span>
                                        <Input placeholder={'请输入年龄'}/>
                                    </div>
                                    <div className="item">
                                        <span className="required">* </span>
                                        <span className="label">城市：</span>
                                        <Select style={{width: '100%', flex: 1}}>
                                            <Option value={0}>男</Option>
                                            <Option value={1}>女</Option>
                                        </Select>
                                    </div>
                                    <div className="item">
                                        <span className="required">* </span>
                                        <span className="label">感情状态：</span>
                                        <Select style={{width: '100%', flex: 1}}>
                                            <Option value={1}>单身</Option>
                                            <Option value={2}>离婚</Option>
                                            <Option value={3}>已婚</Option>
                                            <Option value={4}>恋爱</Option>
                                        </Select>
                                    </div>
                                    <div className="item">
                                        <span className="required">* </span>
                                        <span className="label">个人签名：</span>
                                        <Input placeholder={'请输入个人签名'}/>
                                    </div>
                                    <div className="item">
                                        <span className="required">* </span>
                                        <span className="label">标签选择：</span>
                                        {/*<Input placeholder={'请输入个人签名'}/>*/}
                                </div>
                                </div>
                        }
                    </div>


                </div>

            </div>
        )
    }
}
export default Login;
