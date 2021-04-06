import React, { Component } from 'react'
import { HeartTwoTone } from '@ant-design/icons';
import { getLikeTopList } from '@/remote';
import RouteConfig from '@/routeConfig';
import { withRouter } from "react-router";
class HotPost extends Component {
    state = {
        hotList: [],
        loaded: false,
    }
    componentDidMount() {
        this.getTopFiveList();
    }
    getTopFiveList = async () => {
        try {
            const resp = await getLikeTopList({});
            if (resp.status === 200) {
                this.setState({
                    hotList: resp.data.list || []
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
                    <HeartTwoTone twoToneColor="#eb2f96" style={{ marginRight: '5px' }} />
                    点赞量前五的帖子
                </div>
                <div>
                    {
                        this.state.hotList.map(item => {
                            return <li key={item.id} onClick={() => this.goToDetail(item)}>
                                <span className="hotComment">{`#${item.content.slice(0, 13)}...#`}</span>
                                <span className="like">{item.likeNum}</span>
                            </li>
                        })
                    }
                </div>
            </div>
        )
    }
}

export default withRouter(HotPost);
