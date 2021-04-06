import React, { Component } from 'react'
import { withRouter } from "react-router";
import { Col, Row, Input, Avatar, Divider, Menu, Button, Tooltip, message, Select, List, Empty } from 'antd';
import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons/lib/icons';
import { getUsersList, getChatRecord, handleApply, getUserInfo } from '@/remote'
import css from './ChatRoom.less';
import Socket from './Socket';


const { TextArea } = Input;

let websocket = null;
class ChatRoom extends Component {
    state = {
        userList: [],
        targetUserId: 0,
        targetName: '',
        targetPhoto: '',
        chatMsg: '',
        recordList: [],
        chatList: [],
        userInfo: {},

    }
    componentDidMount() {
        this.getData();
        this.setConnect();
        this.getUserInfos();

    }
    /**
     * 获取好友列表
     */
    getData = async () => {
        const resp = await getUsersList({ userId: +window.localStorage.getItem('userId') });
        if (resp.status === 200) {
            this.setState({
                userList: resp.data.list || []
            })
        }
    }
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

            // console.log(this.state.userInfo);
        }
    };
    /**
     * 获取聊天记录
     */
    getChatRecords = async () => {
        const params = {
            userId: +window.localStorage.getItem('userId'),
            targetUserId: this.state.targetUserId,
        }
        const resp = await getChatRecord(params);
        if (resp.status === 200) {
            this.setState({
                recordList: resp.data.list || []
            })
        }
    }
    /**
     * 选择聊天对象
     * @param {*} e 
     * @param {*} item 
     */
    selectTarget = (e, item) => {
        this.setState({
            targetName: item.name,
            targetUserId: item.userId,
            targetPhoto: item.photo
        }, () => {
            this.getChatRecords();
        })
    }
    hanldeMsg = (e) => {
        this.setState({
            chatMsg: e.target.value
        })
    }
    clear = () => {
        this.setState({
            chatMsg: ''
        })
    }
    /**
     * 
     * 建立websocket链接
     */
    setConnect = () => {
        const userId = window.localStorage.getItem('userId');
        this.socket = new Socket("ws://localhost:8080/api/be/chatting/websocket/" + userId, '');
        // this.socket = new Socket("ws://121.40.165.18:8800" + '', '');
        this.socket.init();
        this.socket.onmessage(this.resivemessage.bind(this));
    }
    /**
     * 从服务端接受的消息
     * @param {*} data 
     */
    resivemessage = (data) => {
        if (data === '当前用户不在线') {
            message.warning(data);
        } else {
            const datas = JSON.parse(data);
            this.state.chatList.push(datas);
            this.setState({
                chatList: [...this.state.chatList]
            })
        }
    }
    /**
     * 发消息给服务端
     */
    sendMessage = () => {
        const div = document.getElementById('chatItems');
        const params = {
            userId: +window.localStorage.getItem('userId'),
            targetUserId: this.state.targetUserId,
            content: this.state.chatMsg
        }
        this.state.chatList.push(params);
        this.setState({
            chatList: [...this.state.chatList]
        })
        this.socket.send(JSON.stringify(params));
        this.setState({
            chatMsg: ''
        })
        div.scrollTop = div.scrollHeight;
    }

    renderChat() {
        const userId = +window.localStorage.getItem('userId');
        return <div className={css.chatItems} id={'chatItems'}>
            {
                this.state.recordList.concat(this.state.chatList).map(item => {
                    return <>
                        {
                            +item.userId === userId ?
                                <div className={css.my}>
                                    <div className={css.myContent}>
                                        {
                                            item.content
                                        }
                                    </div>
                                    <CaretRightOutlined className={css.myIcon} />
                                    <Avatar src={this.state.userInfo.photo} />
                                </div>
                                :
                                <div className={css.target}>
                                    <Avatar src={this.state.targetPhoto} />
                                    <CaretLeftOutlined className={css.targetIcon} />
                                    <div className={css.targetContent}>
                                        {
                                            item.content
                                        }
                                    </div>
                                </div>

                        }
                    </>

                })
            }
        </div>
    }
    render() {
        return (
            <div className={css.chatPage}>
                <div className={css.userList}>
                    <List itemLayout="horizontal"
                        dataSource={this.state.userList}
                        renderItem={item => (
                            <List.Item onClick={e => { this.selectTarget(e, item) }}
                                className={item.userId === this.state.targetUserId ? css.active : ''}>
                                <div className={css.item}>
                                    <Avatar src={item.photo} />
                                    <span>{item.name}</span>
                                </div>
                            </List.Item>
                        )}>
                    </List>
                </div>
                <div className={css.chat_Box}>
                    {
                        this.state.targetName === '' ?
                            <div className={css.noOne}>
                                <div>
                                    <div className={css.topText}>主动一点，</div>
                                    <div>世界会更大！</div>
                                </div>
                            </div>
                            :
                            <>
                                <div className={css.chatContent}>
                                    <div className={css.chat_partner}>
                                        {this.state.targetName}
                                    </div>
                                    <div className={css.chatBox}>
                                        {this.renderChat()}
                                    </div>
                                </div>
                                <div className={css.inpuBox}>
                                    <TextArea value={this.state.chatMsg}
                                        rows={5}
                                        style={{
                                            borderRadius: '4px'
                                        }}
                                        onPressEnter={this.sendMessage}
                                        onChange={this.hanldeMsg} />
                                    <div className={css.btn}>
                                        <Button type={'primary'} style={{
                                            marginRight: '15px'
                                        }} onClick={this.clear}>清空</Button>
                                        <Button type={'primary'} onClick={this.sendMessage}>发送</Button>
                                    </div>
                                </div>
                            </>
                    }

                </div>
            </div>
        )
    }
}

export default withRouter(ChatRoom);
