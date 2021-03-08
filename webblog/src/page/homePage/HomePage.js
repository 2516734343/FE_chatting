import React, { Component } from 'react'
import './HomePage.css';
import { Route } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import RouteConfig from '@/routeConfig.js';
import Header from '@/component/header/Header';
import Layout from '@/component/layout/Layout';
import  {Active, ChatRoom} from '@/importComponent';
// import  Active from '../allActive/Post';
// import ChatRoom from '../chatRoom/ChatRoom';
export default class HomePage extends Component {
    render() {
        return (
            <div className="index">
                <Header />
                <Layout>
                    <Router>
                        <Route path={RouteConfig.active} component={Active} />
                        <Route path={RouteConfig.chat} component={ChatRoom} />
                    </Router>
                </Layout>
            </div>
        )
    }
}
