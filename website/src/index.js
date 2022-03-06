import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import LoginComponent from './components/login/login';
import SignupComponent from './components/signup/signup';
import DashboardComponent from './components/dashboard'

const routing = (
    <Router>
        <div>
            <Route exact path="/" component={LoginComponent} />
            <Route path="/login" component={LoginComponent} />
            <Route path="/signup" component={SignupComponent} />
            <Route path="/dashboard" component={DashboardComponent}/>
        </div>
    </Router>
)
ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
