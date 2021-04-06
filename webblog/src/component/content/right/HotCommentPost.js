import React, { Component } from 'react'
import { FireTwoTone } from '@ant-design/icons';
import { getCommentTopList } from '@/remote';
import RouteConfig from '@/routeConfig';
import { withRouter } from "react-router";
class HotCommentPost extends Component {
    state = {
        hotCommentList: []
    }
    componentDidMount() {
        this.getTopFiveList();
    }
    getTopFiveList = async () => {
        try {
            const resp = await getCommentTopList({});
            if (resp.status === 200) {
                this.setState({
                    hotCommentList: resp.data.list || []
                })
            }
        } catch (e) {

        } finally {
            this.setState({
                loaded: true
            })
        }

    }
    goToDetail = (item) => {
        this.props.history.push(RouteConfig.activeDeatil + `?id=${item.id}`)
    }
    render() {
        return (
            <div className="hot">
                <div className="hot-title">
                    <FireTwoTone twoToneColor="#f50" style={{ marginRight: '5px' }} />
                    评论量前五的帖子
                </div>
                <div>
                    {
                        this.state.hotCommentList.map(item => {
                            return <li key={item.id} onClick={() => this.goToDetail(item)}>
                                <span className="hotComment">{`#${item.content.slice(0, 13)}...#`}</span>
                                <span className="like">{item.commentNum}</span>
                            </li>
                        })
                    }
                </div>
            </div>
        )
    }
}

export default withRouter(HotCommentPost);
