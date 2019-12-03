import React, { Component } from 'react';
import { Layout, Menu, Avatar, Icon, Dropdown } from 'antd';
import { Link } from 'react-router-dom';
import ContentMain from './contentMain';
import { createHashHistory } from 'history';
import './style.scss';
import { restoreSessionFromLocalStorage } from '../actions/api';
const history = createHashHistory();
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
const mapStateToProps = state => ({
  isFetching: state.sessions.isFetching,
  documentTitle: state.layout.documentTitle,
  userName: state.sessions.user_name
});
const mapDispatchToProps = dispatch => bindActionCreators({
  restoreSessionFromLocalStorage
}, dispatch);
@connect(mapStateToProps, mapDispatchToProps)

export default class LayoutPagae extends Component {
  state = {
    collapsed: false,
    menu: 'todo'
  };
  componentWillMount() {
    this.onInit();
    const hash = window.location.hash;
    if (hash === '#/main/todo') {
      this.setState({
        menu: 'todo'
      })
    } else if (hash === '#/main/client/table') {
      this.setState({
        menu: 'clienttable'
      })
    } else if (hash === '#/main/firms/table') {
      this.setState({
        menu: 'firmstable'
      })
    } else if (hash === '#/main/account/table') {
      this.setState({
        menu: 'accounttable'
      })
    } else {
      history.push('/main/todo');
    }
  }
  onInit = () => {
    this.props.restoreSessionFromLocalStorage();
  }
  onCollapse = collapsed => {
    console.log(collapsed);
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
    const { userName } = this.props;
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
            <Menu.Item key="todo">
              <Link to={'/main/todo'}>
                <Icon type="calendar" />
                <span>待办事项</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="clienttable">
              <Link to={'/main/client/table'}>
                <Icon type="user" />
                <span>个人客户</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="firmstable">
              <Link to={'/main/firms/table'}>
                <Icon type="team" />
                <span>企业客户</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="accounttable">
              <Link to={'/main/account/table'}>
                <Icon type="area-chart" />
                <span>绩效汇总</span>
              </Link>
            </Menu.Item>
            {/* <SubMenu
              key="person"
              title={
                <span>
                  <Icon type="user" />
                  <span>个人客户</span>
                </span>
              }
            >
              <Menu.Item key="clienttable"><Link to={'/main/client/table'}>个人客户表</Link></Menu.Item>
              <Menu.Item key="clientnew"><Link to={'/main/client/new'}>添加个人客户</Link></Menu.Item>
            </SubMenu>
            <SubMenu
              key="firms"
              title={
                <span>
                  <Icon type="team" />
                  <span>企业客户</span>
                </span>
              }
            >
              <Menu.Item key="firmstable"><Link to={'/main/firms/table'}>企业客户表</Link></Menu.Item>
              <Menu.Item key="firmsnew"><Link to={'/main/firms/new'}>添加企业客户</Link></Menu.Item>
            </SubMenu>
            <SubMenu
              key="account"
              title={
                <span>
                  <Icon type="area-chart" />
                  <span>绩效汇总</span>
                </span>
              }
            >
              <Menu.Item key="accounttable"><Link to={'/main/account/table'}>绩效汇总表</Link></Menu.Item>
              <Menu.Item key="accountnew"><Link to={'/main/account/new'}>添加新成交</Link></Menu.Item>
            </SubMenu> */}
          </Menu>
        </Sider>
        <Layout>
          <Header>
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