import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route } from 'react-router';
import './Main.css';
import Post from './allActive/Post';
import ChatRoom from './chatRoom/ChatRoom';
export default class MainView extends Component {
    render() {
        return (
            <Router>
                <Route path="/" component={Post} />
                <Route path="/allActive" component={Post} />
                <Route path="/chat" component={ChatRoom} />
            </Router>
        )
    }
}
