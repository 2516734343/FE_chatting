import React, { Component } from 'react';
import { observer } from 'mobx-react';
import url from 'url'; //引入url解析模块
import { Button, Divider, Input, message } from 'antd';
import { DeleteOutlined, MessageOutlined, LikeOutlined, EditOutlined, LikeTwoTone } from '@ant-design/icons';
import { getInvitationDetail, invitationComment, invitationLike, invitationLikeUserList } from '@/remote'
import css from './ActiveDetail.less';
import Avatar from 'antd/lib/avatar/avatar';
import moment from 'moment';
import CommentList from './comment/Comment';
import AvatarList from '@/component/avatarList/AvatarList.js';

const { TextArea } = Input;
@observer
class ActiveDetail extends React.Component {
    state = {
        detailInfo: {},
        liked: false,
        commented: false,
        loaded: false,
        commentValue: '',
        likeuserlist: [],
        likeuserTotal: 0,
    }
    componentDidMount() {
        this.getDetail();
    }
    getDetail = async () => {
        try {
            const query = url.parse(this.props.location.search, true).query;
            const id = +query.id;
            if (!id) { return; }
            const resp = await getInvitationDetail({ invitationId: id });
            if (resp.status === 200) {
                this.setState({
                    detailInfo: resp.data || [],
                })
                this.getLikeUserList();
            }
        } catch (e) {

        } finally {
            this.setState({
                loaded: true
            })
        }

    }
    /**
    * 帖子点赞用户列表
    */
    getLikeUserList = async () => {
        const resp = await invitationLikeUserList({ invitationId: this.state.detailInfo.id });
        if (resp.status === 200) {
            this.setState({
                likeuserlist: resp.data.list || [],
                likeuserTotal: resp.data.total
            })
        }
    }
    /**
     * 帖子点赞
     */
    handleLiked = () => {
        this.setState({
            liked: !this.state.liked
        }, () => {
            if (this.state.liked) {
                this.commentLike();
            }
        })
    }/**
     * 帖子评论
     */
    hanldeCommented = () => {
        this.setState({
            commented: !this.state.commented
        })
    }
    hanldeCommentValueChange = (e) => {
        this.setState({
            commentValue: e.target.value
        })
    }
    sendComment = async () => {
        const params = {
            invitationId: this.state.detailInfo.id,
            userId: window.localStorage.getItem('userId'),
            content: this.state.commentValue
        }
        const resp = await invitationComment(params);
        if (resp.status === 200) {
            message.success('评论成功');
            this.setState({
                commentValue: ''
            })
            this.refs.comment.getCommentList();
            this.getDetail();
        }
    }
    cancelComment = () => {
        this.setState({
            commented: !this.state.commented
        })
    }
    clearComment = () => {
        this.setState({
            commentValue: ''
        })
    }
    /**
     * 帖子点赞
     */
    commentLike = async () => {
        const params = {
            invitationId: this.state.detailInfo.id,
            userId: window.localStorage.getItem('userId'),
        }
        const resp = await invitationLike(params);
        if (resp.status === 200) {
            this.getDetail();
            this.getLikeUserList();
        }
    }
    renderDetail() {
        const { detailInfo } = this.state;
        const userId = window.localStorage.getItem('userId');
        return <div className={css.detailBox}>
            <div className={css.infoTop}>
                <div className={css.avatar}>
                    <Avatar size={45} src={detailInfo.photo} />
                </div>
                {detailInfo.canDelete && <div>
                    <Button icon={<DeleteOutlined />}
                        type={'link'}
                        style={{ marginTop: '10px' }}
                        danger />
                </div>}
                <div className={css.userInfo}>
                    <span className={css.name}>{detailInfo.name}</span>
                    <span className={css.time}>{moment(detailInfo.time).startOf('hour').fromNow()}</span>
                </div>
            </div>
            <div className={css.infoContent}>
                {detailInfo.content}
            </div>
            <div className={css.infoBottom}>
                <div className={css.like}>
                    <span onClick={this.handleLiked}>
                        {
                            (this.state.liked || this.state.likeuserlist.findIndex(item => item.userId === +userId) > -1) ?
                                <LikeTwoTone className={css.icon} />
                                : <LikeOutlined className={css.icon} />
                        }

                    </span>
                    <span>{detailInfo.likeNum}</span>
                </div>
                <div className={css.comment}>
                    <span onClick={this.hanldeCommented}><MessageOutlined className={css.icon} /></span>
                    <span>{detailInfo.commentNum}</span>
                </div>
            </div>
        </div>;
    }
    renderCommentArea() {
        return <div className={css.commentBox}>
            <TextArea placeholder={'良言一句三冬暖～'}
                value={this.state.commentValue}
                onChange={this.hanldeCommentValueChange} />
            <div className={css.footer}>
                <Button type={'primary'} onClick={this.cancelComment}>取消</Button>
                <Button type={'primary'} onClick={this.clearComment} style={{ margin: '0px 14px' }}>清空</Button>
                <Button type={'primary'} onClick={this.sendComment}>发表</Button>
            </div>
        </div>
    }
    render() {
        return <div className={css.detailPage}>
            {this.renderDetail()}
            <Divider />
            <div className={css.avatarList}>
                <AvatarList avatarList={this.state.likeuserlist} />
                <span style={{ marginLeft: '5px' }}>{this.state.likeuserlist.length}个趣友觉得很赞</span>
            </div>
            {this.state.loaded && <CommentList invitationId={this.state.detailInfo.id} ref={'comment'} />}
            {this.state.commented && this.renderCommentArea()}
        </div>
    }
}

export default ActiveDetail
