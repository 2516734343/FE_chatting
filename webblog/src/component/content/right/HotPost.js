import React, { Component } from 'react'
import { HeartTwoTone } from '@ant-design/icons';
export default class HotPost extends Component {
    state = {
        hotList: [
            {
                id: 1,
                comment: '焦虑的真正原因',
                like: 240,
                commtnCount: 250,
            },
            {
                id: 1,
                comment: '为什么90后不想结婚',
                like: 200,
                commtnCount: 250,
            },
            {
                id: 1,
                comment: '先成家还是先立业',
                like: 140,
                commtnCount: 250,
            },
            {
                id: 1,
                comment: '留守儿童',
                like: 40,
                commtnCount: 250,
            },
            {
                id: 1,
                comment: '新的一年你想说的话',
                like: 20,
                commtnCount: 250,
            }
        ]
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
                            return <li>
                                <span className="hotComment">{`#${item.comment}#`}</span>
                                <span className="like">{item.like}</span>
                            </li>
                        })
                    }
                </div>
            </div>
        )
    }
}
