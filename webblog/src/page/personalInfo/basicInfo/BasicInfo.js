import React, { Component } from 'react'
import { Button, Col, Input, Row, Select, Cascader, Tag, Divider, message, Upload } from 'antd';
import css from './BasicInfo.less';
import { getUserInfo, getTagList, updateUserInfo } from '@/remote';
import { UserOutlined, WomanOutlined, ManOutlined } from '@ant-design/icons/lib/icons';
import Avatar from 'antd/lib/avatar/avatar';
import cityList from '@/city.json';
import { getColors, getTagColors } from '@/utils/TagColor';
import TagList from './TagEdit';

const { Option } = Select;
let FormData = window.FormData;
let formdata = new FormData();

export default class BasicInfo extends Component {
  state = {
    isEdit: false,
    userInfo: {},
    loaded: false,
    tagList: [],
    username: '',
    name: '',
    sex: 1,
    age: 0,
    city: '',
    signature: '',
    photo: '',
    emotion: 1,
    password: '',
    selectCitys: [],
    fileList: [],
    file: null,
  }
  componentDidMount = () => {
    this.getUserInfos();
    this.getTags();

  };
  getUserInfos = async () => {
    const userId = window.localStorage.getItem('userId');
    try {
      const resp = await getUserInfo({ userId: +userId });
      if (resp.status === 200) {
        this.setState({
          username: resp.data.username,
          name: resp.data.name,
          password: resp.data.password,
          age: resp.data.age,
          sex: resp.data.sex,
          city: resp.data.city,
          emotion: resp.data.emotion,
          photo: resp.data.photo,
          signature: resp.data.signature,
          selectCitys: ["北京市", "北京"],
          tagList: resp.data.tagList.map(item => {
            return {
              ...item,
              bgColor: getColors()
            }
          })
        });
      }

    } catch (e) {

    } finally {
      this.setState({
        loaded: true
      });
      // console.log(this.state.userInfo);
    }
  };
  updateUserInfos = async () => {
    const { username, name, age, sex, signature, emotion, city, password, fileList } = this.state;
    formdata.append('userId', +window.localStorage.getItem('userId'));
    formdata.append('username', username);
    formdata.append('password', password);
    formdata.append('name', name);
    formdata.append('sex', sex);
    formdata.append('age', age);
    formdata.append('city', city);
    formdata.append('emotion', emotion);
    formdata.append('signature', signature);
    formdata.append('tagList', this.state.tagList.map(item => item.tagId).join(','));
    fetch('/api/be/chatting/update/user/info', {
      method: 'post',
      headers: {
        'authentication': window.localStorage.getItem('authentication')
      },
      body: formdata,
    }).then(resp => {
      if (resp.status === 200) {
        message.success('修改成功');
        this.setState({
          isEdit: false
        });
        this.getUserInfos();
      }
    });
  }
  editInfo = () => {
    this.setState({
      isEdit: true
    })
  }
  saveInfo = () => {
    this.updateUserInfos();
  }
  handelSex = (e) => {
    this.setState({
      sex: e,
    })
  };
  hanldeNameChange = (e) => {
    this.setState({
      name: e.target.value
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
  onChangeCity = (value, selectedOptions) => {
    this.setState({
      selectCitys: value
    }, () => {
      this.setState({
        city: this.state.selectCitys.join(' ')
      });
    });

  };
  onChangeFile = (fileList) => {
    console.log(fileList);
  }
  closeTag = (e, tagId) => {
    const idx = this.state.tagList.findIndex(it => it.tagId === tagId);
    console.log(idx);
    if (idx > -1) {
      this.state.tagList.splice(idx, 1);
    }
    console.log(this.state.tagList);
    this.setState({
      tagList: [...this.state.tagList]
    })
  }
  getEmotionType = (emotion) => {
    switch (emotion) {
      case 1: return '单身';
        break;
      case 2: return '离婚';
        break;
      case 3: return '已婚';
        break;
      case 4: return '恋爱';
        break;
    }
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
  selectTag = (item, index) => {
    const span = document.getElementById(`tag${index}`);
    const color = span.style.color;
    const idx = this.state.tagList.findIndex(it => it.tagId === item.tagId);
    if (idx > -1) {
      // span.style.background = '#fff';
      // span.style.color = getColors();
      // this.state.tagList.splice(idx, 1);
      // this.setState({
      //   tagList: [...this.state.tagList]
      // })
      message.error('标签已存在');
    } else {
      span.style.background = color;
      span.style.color = '#fff';
      this.state.tagList.push({ tagId: item.tagId, tagName: item.tagName });
      this.setState({
        tagList: this.state.tagList.map(item => {
          return {
            ...item,
            bgColor: getColors(),
          }
        })
      });
    }
  };
  render() {
    const { username, name, age, sex, signature, emotion, city, photo, fileList } = this.state;
    return (
      <div className={css.basicInfo}>
        {/* <div>
          <img src='../../../static/assets/img/card.png' />
        </div> */}
        {/* <div className={css.userPhoto}>
          <div>
            {
              this.state.isEdit ? <Button onClick={this.saveInfo}>保存修改</Button>
                : <Button onClick={this.editInfo}>修改资料</Button>
            }
          </div>
        </div> */}
        <div className={css.basicInfoContent}>
          <Row>
            <Col className={css.label}>头像：</Col>
            <Col style={{ display: 'flex', justifyContent: 'space-between' }} span={16}>
              {
                this.state.isEdit ?
                  <Upload
                    action="/api/be/chatting/update/user/photo"
                    listType="picture-card"
                    headers={{ authentication: window.localStorage.getItem("authentication") ? window.localStorage.getItem("authentication") : null }}
                    data={{ userId: +window.localStorage.getItem('userId') }}
                    fileList={fileList}
                    onChange={this.onChangeFile(fileList)}
                  >
                    点击上传
                  </Upload>
                  :
                  <Avatar src={photo} size={45} />
              }
              <div>
                {
                  this.state.isEdit ? <span onClick={this.saveInfo} className={css.save} />
                    :
                    // <Button onClick={this.editInfo}
                    //   icon={<span className={css.icon}></span>}>修改资料</Button>
                    <span className={css.icon} onClick={this.editInfo}></span>
                }
              </div>
            </Col>
          </Row>
          <Row>
            <Col className={css.label}>用户名：</Col>
            <Col>{this.state.isEdit ? <Input value={username} disabled /> : <div>{username}</div>}</Col>
          </Row>
          <Row>
            <Col className={css.label}>昵称：</Col>
            <Col>{this.state.isEdit ? <Input value={name} onChange={this.hanldeNameChange} /> : <div>{name}</div>}</Col>
          </Row>
          <Row>
            <Col className={css.label}>性别：</Col>
            <Col>
              {
                this.state.isEdit ?
                  <Select style={{ width: '100%', flex: 1 }} value={sex} onChange={this.handelSex}>
                    <Option value={0}>男</Option>
                    <Option value={1}>女</Option>
                  </Select>
                  :
                  <div> {sex === 1 ? <WomanOutlined className={css.woman} /> : <ManOutlined className={css.man} />}</div>
              }
            </Col>
          </Row>
          <Row>
            <Col className={css.label}>年龄：</Col>
            <Col>{this.state.isEdit ? <Input value={age} type="number" onChange={this.handleAge} /> : <div>{age}</div>}</Col>
          </Row>
          <Row>
            <Col className={css.label}>城市：</Col>
            <Col>{this.state.isEdit ?
              <Cascader
                style={{ width: '100%', flex: 1, textAlign: 'left' }}
                fieldNames={{ value: 'label', label: 'label', children: 'children' }}
                options={cityList}
                expandTrigger={'hover'}
                changeOnSelect
                value={this.state.selectCitys}
                onChange={(value, selectedOptions) => { this.onChangeCity(value, selectedOptions); }}
                placeholder="请选择城市"
              /> : <div>{city}</div>}</Col>
          </Row>
          <Row>
            <Col className={css.label}>感情状态：</Col>
            <Col>
              {
                this.state.isEdit ?
                  <Select style={{ width: '100%', flex: 1 }} value={emotion} onChange={this.handleEmotion}>
                    <Option value={1}>单身</Option>
                    <Option value={2}>离婚</Option>
                    <Option value={3}>已婚</Option>
                    <Option value={4}>恋爱</Option>
                  </Select>
                  :
                  <div> {this.getEmotionType(emotion)}</div>
              }
            </Col>
          </Row>
          <Row>
            <Col className={css.label}>个人签名：</Col>
            <Col>{this.state.isEdit ? <Input value={signature} onChange={this.handleSignature} /> : <div>{signature}</div>}</Col>
          </Row>
          {this.state.loaded && <Row>
            <Col className={css.label}>标签：</Col>
            <Col>
              <div>
                {
                  this.state.tagList.map((item, index) => {
                    return <Tag key={item.tagId} className={css.tag}
                      // id={`tag${index}`}
                      closable={this.state.isEdit}
                      onClose={e => { this.closeTag(e, item.tagId) }}
                      // color={item.bgColor}
                      style={{ backgroundColor: `${item.bgColor}`, }}
                    // onClick={() => { this.selectTag(item, index); }}
                    >{item.tagName}</Tag>
                  })
                }
              </div>
              {this.state.isEdit && <><Divider />
                <div>
                  {
                    this.state.tags.map((item, index) => {
                      return <span key={item.tagId} className={css.tag}
                        id={`tag${index}`}
                        style={{ color: `${this.state.tagList.includes(item.tagId) ? '#fff' : item.tagColor}` }}
                        onClick={() => { this.selectTag(item, index); }}>{item.tagName}</span>
                    })
                  }
                </div></>
              }
            </Col>
          </Row>}
        </div>

      </div>
    )
  }
}
