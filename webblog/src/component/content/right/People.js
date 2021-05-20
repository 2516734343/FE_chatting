import React, { Component } from 'react'
import { List, Avatar, Button, Skeleton, Space, Empty } from 'antd';
import { SmileTwoTone, UserAddOutlined } from '@ant-design/icons';
import { getRecommendList } from '@/remote';
import AddUserModal from '@/component/addUserModal/AddUserModal';
export default class People extends Component {
    state = {
        userList: [],
        loaded: false,
    }
    componentDidMount() {
        this.getData();
    }
    getData = async () => {
        try {
            const resp = await getRecommendList({ userId: +window.localStorage.getItem('userId') });
            if (resp.status === 200) {
                this.setState({
                    userList: resp.data.list.slice(0,5) || []
                })
            }
        } catch (e) {

        } finally {
            this.setState({
                loaded: true,
            })
        }
    }
    adduser = (e, userId) => {
        this.refs.addUserModal.showModal(true, userId);
    }
    render() {
        return (
            <div className="people">
                <div className="user-recom"><SmileTwoTone style={{ marginRight: '5px' }} />好友推荐</div>
                {
                    this.state.userList.length > 0 ?
                        <List itemLayout="horizontal"
                            dataSource={this.state.userList}
                            renderItem={item => (
                                <List.Item
                                    actions={[<Button icon={<UserAddOutlined style={{ color: '#1890ff' }} />}
                                        className="addUser" onClick={e => { this.adduser(e, item.userId) }} />]}
                                >
                                    <List.Item.Meta
                                        avatar={
                                            <Avatar src={item.photo} />
                                        }
                                        title={<span>{item.name}</span>}
                                        description={<span className="user_note">{item.signature}</span>}
                                    />
                                </List.Item>
                            )}>
                        </List>
                        :
                        <div style={{ paddingBottom: '20px' }}>
                            <Empty
                                image={Empty.PRESENTED_IMAGE_SIMPLE}
                                description={
                                    <span style={{ fontSize: '12px' }}>
                                        暂无与自己相匹配的用户
                                    </span>
                                }
                            >
                            </Empty>
                        </div>

                }
                <AddUserModal ref={'addUserModal'} />
            </div>
        )
    }
}
