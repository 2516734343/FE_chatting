import React, { Component } from 'react'
import './HomePage.css';
import { Route } from 'react-router';
import { withRouter } from "react-router";
import { BrowserRouter as Router } from 'react-router-dom';
import RouteConfig from '@/routeConfig.js';
import Header from '@/component/header/Header';
import Layout from '@/component/layout/Layout';
import { Active, ChatRoom, SendActive, ActiveDetail, PersonalInfo, DataAnalysize } from '@/importComponent';


class HomePage extends Component {
    state = {
        skin: 'flower',
    }
    selectSkin = (target) => {
        switch (target) {
            case 'blint': return 'blint';
            case 'black': return 'black';
            case 'girl': return 'girl';
            case 'flower': return 'flower';
            case 'spring': return 'spring';
            case 'katong': return 'katong';
            default: return null;
        }
    }
    changeSkin = (target) => {
        const div = document.getElementById('index');
        this.setState({
            skin: target
        })

    }
    render() {
        return (
            <div className={`index ${this.selectSkin(this.state.skin)}`} key={this.props.location.key} id={'index'}>
                <Header changeSkin={this.changeSkin} />
                <Layout>
                    <Router>
                        <Route path={RouteConfig.active} component={Active} exact />
                        <Route path={RouteConfig.chat} component={ChatRoom} exact />
                        <Route path={RouteConfig.sendActive} component={SendActive} exact />
                        <Route path={RouteConfig.activeDeatil} component={ActiveDetail} />
                        <Route path={RouteConfig.personalInfo} component={PersonalInfo} />
                    </Router>
                </Layout>
            </div>
        )
    }
}

export default withRouter(HomePage);
