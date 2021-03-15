import React, { Component } from 'react';
import { withRouter } from "react-router";
import { List, Avatar, Button, Skeleton, Space, Input, message } from 'antd';
import { DeleteOutlined, MessageOutlined, LikeOutlined, EditOutlined } from '@ant-design/icons';
import moment from 'moment';
import css from './Post.less';
import { getInvitationList, releasePost } from '@/remote';
import { observer } from 'mobx-react';
import RouteConfig from '@/routeConfig';
const { TextArea } = Input;

class Post extends Component {
    state = {
        dataList: [],
        loading: false,
        pageNo: 1,
        pageSize: 10,
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
    renderList() {
        const IconText = ({ icon, text }) => (
            <Space>
                {React.createElement(icon)}
                {text}
            </Space>
        );
        return <List itemLayout="horizontal"
            dataSource={this.state.dataList}
            renderItem={item => (
                <List.Item actions={[
                    <IconText icon={LikeOutlined} text={item.likeNum} key="list-vertical-like-o" />,
                    <IconText icon={MessageOutlined} text={item.commentNum} key="list-vertical-message" />,
                ]} onClick={() => this.goToDetail(item)}>
                    <div className={css.item} key={item.id}>
                        <div className={css.top}>
                            <div className={css.userInfo}>
                                <Avatar size={50} src={'localhost:8080/img/test2.jpg'} />
                                <div>
                                    <div className={css.name}>{item.name}</div>
                                    <div className={css.time}>{moment(item.time).format('YYYY-MM-DD HH:mm:ss')}</div>
                                </div>
                            </div>
                            {/* {item.canDelete && <div>
                                        <Button icon={<DeleteOutlined />}
                                            type={'link'}
                                            style={{ marginTop: '10px' }}
                                            danger />
                                    </div>} */}
                        </div>
                        <div className={css.comment}>
                            {item.content}
                        </div>
                    </div>
                </List.Item>
            )}>
        </List>
    }

    renderSendPost() {
        return <div className={css.sendPost}>
            <TextArea placeholder="说点什么吧..."
                // row={1}
                // autoSize={false}
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
