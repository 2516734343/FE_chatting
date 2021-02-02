import React, { Component } from 'react'
import HotCommentPost from './HotCommentPost';
import HotPost from './HotPost';
import People from './People';
import Notice from './Notice';
import './Right.css';
export default class RightView extends Component {
    render() {
        return (
            <div>
                <People/>
                <HotPost/>
                <HotCommentPost/>
                <Notice/>
            </div>
        )
    }
}
