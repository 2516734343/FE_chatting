import React, { Component } from 'react'
import './Left.css';
import ToolBar from './ToolBar';
import UserInfo from './UserInfo';
export default class LeftView extends Component {
    render() {
        return (
            <div>
                <UserInfo/>
                <ToolBar/>
            </div>
        )
    }
}
