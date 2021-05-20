import React, { Component } from 'react';
import { withRouter } from "react-router";
import { List, Avatar, Button, Modal, Space, Input, message, Popconfirm } from 'antd';
import { DeleteOutlined, MessageOutlined, LikeOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import moment from 'moment';
import css from './Post.less';
import { getInvitationList, releasePost, deleteInvitation } from '@/remote';
import { observer } from 'mobx-react';
import RouteConfig from '@/routeConfig';
const { TextArea } = Input;
const { confirm } = Modal;
class Post extends Component {
    state = {
        dataList: [],
        loading: false,
        initLoading: true,
        pageNo: 1,
        pageSize: 100,
        total: 0,
        contentValue: '',
    };
    componentDidMount() {
        this.getDataList();
    }
    getDataList = async () => {
        this.setState({
            loading: true,
        });
        try {
            const params = {
                pageNo: this.state.pageNo,
                pageSize: this.state.pageSize,
            };
            const resp = await getInvitationList(params);
            if (resp.status === 200) {
                this.setState({
                    dataList: resp.data.list,
                    total: resp.data.total,
                })
            }
        } catch (e) {
        } finally {
            this.setState({
                loading: false
            })
        }
    };
    onLoadMore = async () => {
        this.setState({
            loading: true,
            dataList: this.state.dataList.concat([].map(() => ({ loading: true, name: {} }))),
            pageNo: this.state.pageNo++
        });
        try {
            const params = {
                pageNo: this.state.pageNo,
                pageSize: this.state.pageSize,
            };
            const resp = await getInvitationList(params);
            if (resp.status === 200) {
                this.setState({
                    dataList: this.state.dataList.concat(resp.data.list),
                    total: resp.data.total,
                })
            }
        } catch (e) {
        } finally {
            this.setState({
                loading: false
            })
        }
    };
    contentValueChange = (e) => {
        this.setState({
            contentValue: e.target.value
        })

    };
    clearAll = () => {
        this.setState({
            contentValueChange: ''
        })
    };
    releaseContent = async () => {
        const params = {
            userId: window.localStorage.getItem('userId'),
            content: this.state.contentValue
        };
        const resp = await releasePost(params);
        if (resp.status === 200) {
            message.success('发布成功');
            this.setState({
                contentValue: ''
            });
            this.getDataList();
        }
    };
    goToDetail = (item) => {
        this.props.history.push(RouteConfig.activeDeatil + `?id=${item.id}`)
    }
    delete = async (e, id) => {
        const resp = await deleteInvitation({ invitationId: id, userId: +window.localStorage.getItem('userId') });
        if (resp.status === 200) {
            message.success('删除成功');
            this.getDataList();
        }
    }
    cancel = () => {
        return;
    }
    renderList() {
        const userId = +window.localStorage.getItem('userId');
        const IconText = ({ icon, text }) => (
            <Space>
                {React.createElement(icon)}
                {text}
            </Space>
        );
        const loadMore =
            !this.state.initLoading && !this.state.loading ? (
                <div
                    style={{
                        textAlign: 'center',
                        marginTop: 12,
                        height: 32,
                        lineHeight: '32px',
                    }}
                >
                    <Button onClick={this.onLoadMore}>点击加载更多</Button>
                </div>
            ) : null;
        return <List itemLayout="horizontal"
            dataSource={this.state.dataList}
            loading={this.state.loading}
            // loadMore={loadMore}
            renderItem={item => (
                <List.Item actions={[
                    <IconText icon={LikeOutlined} text={item.likeNum} key="list-vertical-like-o" />,
                    <IconText icon={MessageOutlined} text={item.commentNum} key="list-vertical-message" />,
                ]} onClick={() => this.goToDetail(item)}
                // style={{ backgroundImage: 'url(../../../../static/assets/img/flower.png)' }}
                >
                    <div className={css.item} key={item.id}>
                        <div className={css.top}>
                            <div className={css.userInfo}>
                                <Avatar size={50} src={item.photo} />
                                <div>
                                    <div className={css.name}>{item.name}</div>
                                    <div className={css.time}>{moment(item.time).format('YYYY-MM-DD HH:mm:ss')}</div>
                                </div>
                            </div>
                            {/*{*/}
                            {/*    (item.userId === userId || userId === 1 || userId === 5) &&*/}
                            {/*    <div>*/}
                            {/*        <div>*/}
                            {/*            <Popconfirm*/}
                            {/*                title="确定要删除这条动态吗？"*/}
                            {/*                onConfirm={(e) => { this.delete(e, item.id) }}*/}
                            {/*                onCancel={this.cancel}*/}
                            {/*                okText="删除"*/}
                            {/*                cancelText="取消"*/}
                            {/*            >*/}
                            {/*                <Button icon={<DeleteOutlined />}*/}
                            {/*                    type={'link'}*/}
                            {/*                    onClick={(e) => { e.stopPropagation() }}*/}
                            {/*                    style={{ marginTop: '10px' }}*/}
                            {/*                    danger />*/}
                            {/*            </Popconfirm>*/}
                            {/*        </div>*/}
                            {/*    </div>*/}
                            {/*}*/}
                        </div>
                        <div className={css.comment}>
                            {item.content}
                        </div>
                    </div>
                    <div className={css.line}></div>
                </List.Item>
            )}>
        </List>
    }

    renderSendPost() {
        return <div className={css.sendPost}>
            <TextArea placeholder="说点什么吧..."
                onPressEnter={this.releaseContent}
                onChange={this.contentValueChange}
                value={this.state.contentValue}
                style={{ outline: 'none' }} />
            <div className={css.bottom}>
                <div className={css.tips}>文明社会，文明发言</div>
                <div className={css.btn}>
                    <Button type={'primary'}
                        style={{ marginRight: '10px' }}
                        onClick={this.clearAll}
                    >清空</Button>
                    <Button type={'primary'}
                        style={{ marginRight: '10px' }}
                        onClick={this.releaseContent}
                    >发表</Button>
                </div>
            </div>
        </div>;
    }

    render() {
        return (
            <div className={css.postPage}>
                {this.renderSendPost()}
                <div className={css.list}>
                    {this.renderList()}
                </div>
            </div>
        )
    }
}
// export default Post;
// export default (props)=><Post {...props} key={props.location.pathname}/>;
export default withRouter(Post);
