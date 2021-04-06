import React, { Component } from 'react'
import { withRouter } from 'react-router';
import { getCommentedList } from '@/remote';
import { List, Space } from 'antd';
import { MessageOutlined, LikeOutlined, } from '@ant-design/icons/lib/icons';
import RouteConfig from '@/routeConfig';
import css from './CommentList.less';


class CommentList extends Component {
  state = {
    dataList: [],
  }
  componentDidMount() {
    this.getList();
  }
  getList = async () => {
    const resp = await getCommentedList({ userId: window.localStorage.getItem('userId') });
    if (resp.status === 200) {
      this.setState({
        dataList: resp.data.list || []
      })
    }
  }
  goToDetail = (item) => {
    this.props.history.push(RouteConfig.activeDeatil + `?id=${item.id}`)
  }
  render() {
    const IconText = ({ icon, text }) => (
      <Space>
        {React.createElement(icon)}
        {text}
      </Space>
    );
    return (
      <div className={css.commentList}>
        <List itemLayout="horizontal"
          dataSource={this.state.dataList}
          renderItem={item => (
            <List.Item actions={[
              <IconText icon={LikeOutlined} text={item.likeNum} key="list-vertical-like-o" />,
              <IconText icon={MessageOutlined} text={item.commentNum} key="list-vertical-message" />,
            ]} onClick={() => this.goToDetail(item)}>
              <div className={css.item} key={item.id}>
                <div className={css.comment}>
                  {item.content}
                </div>
              </div>
            </List.Item>
          )}>
        </List>
      </div>
    )
  }
}


export default withRouter(CommentList);
