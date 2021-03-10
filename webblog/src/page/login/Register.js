import React, { Component, useState } from 'react'
import './Login.css';
import { Button, Input, Tabs, Radio, Upload, Select, message, Tag, Cascader } from 'antd';
import { getTagList, register, login } from '@/remote';
import { getColors } from '@/utils/TagColor';
import cityList from '@/city.json';

const Option = Select.Option;
// eslint-disable-next-line no-undef
let FormData = window.FormData;
let formdata = new FormData();

export default class Register extends Component {
  state = {
    fileList: [],
    file: null,
    username: '',
    password: '',
    name: '',
    sex: 0,
    age: '',
    city: '',
    selectCitys: [],
    emotion: 1,
    signature: '',
    tagList: [],
    tags: [],
  }
  componentDidMount() {
    this.getTags();
  }
  getTags = async () => {
    const respData = await getTagList({});
    if (respData.status === 200) {
      this.setState({
        tags: respData.data.list.map(item => {
          return {
            ...item,
            tagColor: getColors()
          }
        })
      })
    }
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
  onChange = (info) => {
    formdata.append('file', info.file);
    this.setState({
      file: formdata.get('file'),// info.file,
      fileList: info.fileList,
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
  hanldeNameChange = (e) => {
    this.setState({
      name: e.target.value
    })
  };
  handelSex = (e) => {
    this.setState({
      sex: e,
    })
  };
  handleAge = (e) => {
    this.setState({
      age: e.target.value
    })
  };
  handleEmotion = (e) => {
    this.setState({
      emotion: e,
    })
  };
  handleSignature = (e) => {
    this.setState({
      signature: e.target.value
    })
  };
  validata() {
    if (!this.state.username) {
      return {
        code: 0,
        msg: '请输入用户名'
      }
    }
    const reg = /^[^\u4E00-\u9FFF]+$/;
    if (!reg.test(this.state.username)) {
      return {
        code: 0,
        msg: '用户名不能含有中文'
      }
    }
    if (!this.state.password) {
      return {
        code: 0,
        msg: '请输入密码'
      }
    }
    if (!this.state.name) {
      return {
        code: 0,
        msg: '请输入昵称'
      }
    }
    if (!this.state.age) {
      return {
        code: 0,
        msg: '请输入年龄'
      }
    }
    if (!this.state.city) {
      return {
        code: 0,
        msg: '请输入城市'
      }
    }
    if (!this.state.signature) {
      return {
        code: 0,
        msg: '请输入个人签名'
      }
    }
    if (this.state.tagList.length <= 0) {
      return {
        code: 0,
        msg: '请选择标签'
      }
    } if (!this.state.fileList[0]) {
      return {
        code: 0,
        msg: '请上传头像'
      }
    } else {
      return {
        code: 1,
        msg: ''
      }
    }
  }
  hanldeRegister = async () => {
    const val = this.validata();
    const { username, file, name, password, fileList, sex, age, city, emotion, signature, tagList } = this.state;
    if (val.code === 0) {
      message.error(val.msg);
      return;
    }
    formdata.append('file', fileList[0]);
    formdata.append('username', username);
    formdata.append('password', password);
    formdata.append('name', name);
    formdata.append('sex', sex);
    formdata.append('age', age);
    formdata.append('city', city);
    formdata.append('emotion', emotion);
    formdata.append('signature', signature);
    formdata.append('tagList', tagList.join(','));
    fetch('/api/be/chatting/common/register', {
      method: 'post',
      body: formdata,
    }).then(resp => {
      if (resp.status === 200) {
        message.success('注册成功，请前往登录');
      }
    });
  };
  selectTag = (item, index) => {
    const span = document.getElementById(`tag${index}`);
    const color = span.style.color;
    const idx = this.state.tagList.findIndex(it => it === item.tagId);
    if (idx > -1) {
      span.style.background = '#fff';
      span.style.color = getColors();
      this.state.tagList.splice(idx, 1);
      this.setState({
        tagList: [...this.state.tagList]
      })
    } else {
      span.style.background = color;
      this.state.tagList.push(item.tagId);
      this.setState({
        tagList: [...this.state.tagList]
      });
      span.style.color = 'red';
    }
  };
  onChangeCity = (value, selectedOptions) => {
    this.setState({
      selectCitys: value
    },() => {
      this.setState({
        city: this.state.selectCitys.join('')
      });
    });

  };
  beforeUpload = (file) => {
    this.setState({
      fileList: [file]
    });
    return false;
  };
  render() {
    return <>
      <div className="item">
        <span className="required">* </span>
        <span className="label">用户名：</span>
        <Input placeholder={'请输入用户名'} value={this.state.username} onChange={this.handleUsernameChange} />
      </div>
      <div className="item">
        <span className="required">* </span>
        <span className="label">密码：</span>
        <div style={{ flex: 1 }}>
          <Input.Password placeholder="请输入密码" value={this.state.password} onChange={this.handlePasswordChagne} style={{ borderRadius: '4px' }} />
        </div>
      </div>
      <div className="item">
        <span className="required">* </span>
        <span className="label">昵称：</span>
        <Input placeholder={'请输入昵称'} value={this.state.name} onChange={this.hanldeNameChange} />
      </div>
      <div className="item">
        <span className="required">* </span>
        <span className="label">性别：</span>
        <Select style={{ width: '100%', flex: 1 }} value={this.state.sex} onChange={this.handelSex}>
          <Option value={0}>男</Option>
          <Option value={1}>女</Option>
        </Select>
      </div>
      <div className="item">
        <span className="required">* </span>
        <span className="label">年龄：</span>
        <Input placeholder={'请输入年龄'} value={this.state.age} type="number" onChange={this.handleAge} />
      </div>
      <div className="item">
        <span className="required">* </span>
        <span className="label">城市：</span>
        <Cascader
          style={{ width: '100%', flex: 1, textAlign: 'left' }}
          fieldNames={{ value: 'label', label: 'label', children: 'children' }}
          options={cityList}
          expandTrigger={'hover'}
          changeOnSelect
          value={this.state.selectCitys}
          onChange={(value, selectedOptions) => { this.onChangeCity(value, selectedOptions); }}
          placeholder="请选择城市"
        />
      </div>
      <div className="item">
        <span className="required">* </span>
        <span className="label">感情状态：</span>
        <Select style={{ width: '100%', flex: 1 }} value={this.state.emotion} onChange={this.handleEmotion}>
          <Option value={1}>单身</Option>
          <Option value={2}>离婚</Option>
          <Option value={3}>已婚</Option>
          <Option value={4}>恋爱</Option>
        </Select>
      </div>
      <div className="item">
        <span className="required">* </span>
        <span className="label">个人签名：</span>
        <Input placeholder={'请输入个人签名'} value={this.state.signature} onChange={this.handleSignature} />
      </div>
      <div className="item" style={{ alignItems: 'baseline' }}>
        <span className="required">* </span>
        <span className="label">标签选择：</span>
        <div className="tagList">
          {
            this.state.tags.map((item, index) => {
              return <span key={item.tagId} className="tag"
                id={`tag${index}`}
                style={{ color: `${this.state.tagList.includes(item.tagId) ? '#fff' : item.tagColor}` }}
                onClick={() => { this.selectTag(item, index); }}>{item.tagName}</span>
            })
          }
        </div>
      </div>
      <div className="item" style={{ alignItems: 'normal' }}>
        <span className="required">* </span>
        <span className="label">头像：</span>
        {/*<ImgCrop rotate>*/}
        <Upload
          // action=""
          listType="picture-card"
          fileList={this.state.fileList}
          // onChange={this.onChange}
          // onPreview={this.onPreview}
          beforeUpload={this.beforeUpload}
        >上传头像</Upload>
        {/*</ImgCrop>*/}
        <input id="file" onChange={this.handleFileChange} type="file" name="file" />
      </div>
      <div>
        <Button onClick={this.hanldeRegister}
          type={'primary'}
          style={{ width: '250px', marginTop: '50px' }}>
          注册
        </Button>
      </div>
    </>
  }
}
