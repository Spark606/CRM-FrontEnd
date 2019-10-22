import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

const IndexPage = require('./containers/index/index').default;
const Layout = require('./containers/layout').default;
const Login = require('./containers/login').default;
const RestPassWord = require('./containers/resetpassword').default;
const NotFoundPage = require('./containers/noPage').default;

import checkLogin from './actions/api';

import configureStore from './store';
import './style.scss'
const store = configureStore();

render(
    <Provider store={store}>
      <Router>
          <Switch>
            <Route path="/main" component={Layout} />
            <Route exact path="/index" component={IndexPage} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/reset" component={RestPassWord} />
            <Route component={NotFoundPage} />
          </Switch>
        </Router>
    </Provider>, document.getElementById('root')
  );
