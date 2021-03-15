import React, { Component } from 'react'
import './HomePage.css';
import { Route } from 'react-router';
import { withRouter } from "react-router";
import { BrowserRouter as Router } from 'react-router-dom';
import RouteConfig from '@/routeConfig.js';
import Header from '@/component/header/Header';
import Layout from '@/component/layout/Layout';
import { Active, ChatRoom, SendActive, ActiveDetail } from '@/importComponent';


class HomePage extends Component {
    render() {
        return (
            <div className="index" key={this.props.location.key}>
                <Header />
                <Layout>
                    <Router>
                        <Route path={RouteConfig.active} component={Active} exact />
                        <Route path={RouteConfig.chat} component={ChatRoom} exact />
                        <Route path={RouteConfig.sendActive} component={SendActive} exact />
                        <Route path={RouteConfig.activeDeatil} component={ActiveDetail} />
                    </Router>
                </Layout>
            </div>
        )
    }
}

export default withRouter(HomePage);
