import React, { Component } from 'react';
import { Layout, Menu, Avatar, Icon, Dropdown, Badge } from 'antd';
import { Link } from 'react-router-dom';
import ContentMain from './contentMain';
import { createHashHistory } from 'history';
import './style.scss';
import { verifyToken } from '../actions/api';
const history = createHashHistory();
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
const mapStateToProps = state => ({
  isFetching: state.sessions.isFetching,
  documentTitle: state.layout.documentTitle,
  userName: state.sessions.user_name,
  userRole: state.sessions.user_role,
  noticeCount: state.layout.noticeCount
});
const mapDispatchToProps = dispatch => bindActionCreators({
  verifyToken
}, dispatch);
@connect(mapStateToProps, mapDispatchToProps)

export default class LayoutPagae extends Component {
  state = {
    collapsed: false,
    menu: 'clientable'
  };
  componentWillMount() {
    this.onInit();
  }
  onInit = () => {
    const tokenString = localStorage.getItem('sessions');
    if (tokenString) {
      this.props.verifyToken();
      this.checkHash();
    } else {
      history.push('/login');
    }
  }
  checkHash = () => {
    const hash = window.location.hash;
    if (hash === '#/main/workspace' || this.props.userRole === '2') {
      this.setState({
        menu: 'workspace'
      })
    } else if (hash === '#/main/client') {
      this.setState({
        menu: 'clienttable'
      })
    } else if (hash === '#/main/todo') {
      this.setState({
        menu: 'todo'
      })
    } else if (hash === '#/main/firms') {
      this.setState({
        menu: 'firmstable'
      })
    } else if (hash === '#/main/order') {
      this.setState({
        menu: 'ordertable'
      })
    } else if (hash === '#/main/employee') {
      this.setState({
        menu: 'employeetable'
      })
    } else if (hash === '#/main/salary') {
      this.setState({
        menu: 'salary'
      })
    } else {
      this.setState({
        menu: 'workspace'
      })
      history.push('/main/workspace');
    }
  }
  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  handleLoginOut = e => {
    e.preventDefault();
    // this.props.loginOut();
    localStorage.removeItem('sessions');
    localStorage.removeItem('user');
    history.push('/login');
  };
  render() {
    const { userName, noticeCount } = this.props;
    const menu = (
      <Menu>
        <Menu.Item>
          <Link to={'/main/personal'}>个人中心</Link>
        </Menu.Item>
        <Menu.Item>
          <div onClick={this.handleLoginOut}>退出</div>
        </Menu.Item>
      </Menu>
    );
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <div className="logo"> CRM </div>
          <Menu className="menu-box" theme="dark" defaultSelectedKeys={this.state.menu} defaultOpenKeys={this.state.menu} mode="inline">

            <Menu.Item key="workspace">
              <Link to={'/main/workspace'}>
                <Icon type="reconciliation" />
                <span>汇总简报</span>
              </Link>
            </Menu.Item>
            {this.props.userRole === '2' ?
              <Menu.Item key="todo">
                <Link to={'/main/todo'}>
                  <Icon type="schedule" />
                  <span>待办事项</span>
                </Link>
              </Menu.Item>
              :
              null}
            <Menu.Item key="clienttable">
              <Link to={'/main/client'}>
                <Icon type="user" />
                <span>个人客户</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="firmstable">
              <Link to={'/main/firms'}>
                <Icon type="team" />
                <span>企业客户</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="ordertable">
              <Link to={'/main/order'}>
                <Icon type="area-chart" />
                <span>订单回款</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="salary">
              <Link to={'/main/salary'}>
                <Icon type="money-collect" />
                <span>工资统计</span>
              </Link>
            </Menu.Item>
            {this.props.userRole === '2' ?
              <Menu.Item key="employeetable">
                <Link to={'/main/employee'}>
                  <Icon type="team" />
                  <span>员工管理</span>
                </Link>
              </Menu.Item>
              :
              null}
          </Menu>
        </Sider>
        <Layout>
          <Header>
            {/* <Badge count={noticeCount}>
              {noticeCount > 0 ? <Icon className="active" type="bell-o" /> : <Icon type="bell" />}
            </Badge> */}
            <Dropdown overlay={menu}>
              <Avatar style={{ backgroundColor: '#f56a00', verticalAlign: 'middle' }} size="large">
                {userName}
              </Avatar>
            </Dropdown>
          </Header>
          <Content style={{ margin: '0 16px' }}>
            <ContentMain />
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    );
  }
}