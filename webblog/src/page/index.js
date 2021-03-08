import React, { Component } from 'react'
import { BrowserRouter as Router , Switch} from 'react-router-dom';
import { Route } from 'react-router';
import LoginPage from './login/Login';
import HomePage from './homePage/HomePage';
import RouteConfig from '../routeConfig';
export default class MyRoute extends Component {
    render() {
        return (
            <Router>
                <Route path={RouteConfig.login} exact component={LoginPage} />
                <Route path={RouteConfig.homePage}  component={HomePage} />
            </Router>
        )
    }
}
