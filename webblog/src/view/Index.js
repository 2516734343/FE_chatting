import React, { Component } from 'react'
import './Index.css';
import Header from '../component/header/Header';
import Content from '../component/content/Content';
export default class componentName extends Component {
    render() {
        return (
            <div className="index">
                <Header />
                <Content />
            </div>
        )
    }
}
