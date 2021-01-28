import React, { Component } from 'react'
import './Content.css';
import LeftView from './left/Left';
import MainView from './main/Main';
import RightView from './right/Right';
export default class Content extends Component {
    render() {
        return (
            <div className="content">
                <div className="left">
                    <LeftView/>
                </div>
                <div className="main">
                    <MainView/>
                </div>
                <div className="right">
                    <RightView/>
                </div>
            </div>
        )
    }
}
