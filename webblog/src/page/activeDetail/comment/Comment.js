import React, { Component } from 'react'
import { getInvitationCommentList } from '@/remote';
import { DeleteOutlined } from '@ant-design/icons';
import { List, Skeleton, Avatar } from 'antd';
import moment from 'moment';
import css from './Comment.less';

export default class CommentList extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    pageNo: 1,
    pageSize: 10,
    commentTotal: 0,
    commentList: [],
  }
  componentDidMount() {
    this.getCommentList();
  }
  getCommentList = async () => {
    const params = {
      pageNo: this.state.pageNo,
      pageSize: this.state.pageSize,
      invitationId: this.props.invitationId
    }
    const resp = await getInvitationCommentList(params);
    if (resp.status === 200) {
      this.setState({
        commentTotal: resp.data.total,
        commentList: resp.data.list
      })
    }
  }
  render() {
    const userId = window.localStorage.getItem('userId');
    return <div className={css.commentBox}>
      <List
        className="demo-loadmore-list"
        itemLayout="horizontal"
        dataSource={this.state.commentList}
        renderItem={item => (
          <List.Item
          // actions={[+userId === item.userId ? <span><DeleteOutlined style={{ color: 'red' }} /></span> : null]}
          >
            <List.Item.Meta
              avatar={
                <Avatar src={item.photo} />
              }
              title={<span>{item.name}</span>}
              description={<div>{item.content}</div>}
            />
            <div className={css.time}>{moment(item.time).format('YYYY-MM-DD HH:mm:ss')}</div>
          </List.Item>
        )}
      />
    </div>
  }
}
