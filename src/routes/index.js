import {checkLogin} from '../actions/api';
const IndexPage = require('../containers/index/index').default;
const Layout = require('../containers/layout').default;
const NotFoundPage = require('../containers/noPage').default;

export default [
    {
      path: '/',
      component: IndexPage,
    },
    {
      path: '/main',
      // onEnter: checkLogin,
      // onChange: checkLogin,
      getComponent(nextState, callback) {
        callback(null, Layout);
      },
    },
    {
      path: '*',
      component: NotFoundPage,
    },
  ];