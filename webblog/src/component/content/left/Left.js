import React, { Component } from 'react'
import Activation from './Activation';
import './Left.css';
import ToolBar from './ToolBar';
import UserInfo from './UserInfo';
export default class LeftView extends Component {
    render() {
        return (
            <div className="leftContent">
                <UserInfo/>
                <ToolBar/>
                {/* <Activation/> */}
            </div>
        )
    }
}
