import React, { Component } from 'react'
import { FireTwoTone } from '@ant-design/icons';
export default class HotCommentPost extends Component {
    state = {
        hotCommentList: [
            {
                id: 1,
                comment: '为什么90后不想结婚',
                like: 840,
                commtnCount: 867,
            },
            {
                id: 1,
                comment: '代孕',
                like: 200,
                commtnCount: 750,
            },
            {
                id: 1,
                comment: '新的一年你想说的话',
                like: 140,
                commtnCount: 640,
            },
            {
                id: 1,
                comment: '父母就地过年留守儿童怎么办？',
                like: 140,
                commtnCount: 140,
            },
            {
                id: 1,
                comment: '先成家还是先立业',
                like: 120,
                commtnCount: 120,
            }
        ]
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
                            return <li>
                                <span className="hotComment">{`#${item.comment}#`}</span>
                                <span className="like">{item.commtnCount}</span>
                            </li>
                        })
                    }
                </div>
            </div>
        )
    }
}
