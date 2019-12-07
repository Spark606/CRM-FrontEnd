import React, { Component } from 'react';
import { Breadcrumb, Menu, Avatar, Icon, Dropdown } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
const mapStateToProps = state => ({
  isFetching: state.sessions.isFetching,
  userRole: state.sessions.user_role
});
const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch);
@connect(mapStateToProps, mapDispatchToProps)

export default class EmployeePagae extends Component {
  state = {
  };
  componentWillMount() {
    this.onInit();
  }
  onInit = () => {

  }


  render() {
    const { userName } = this.props;

    return (
      <div>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>员工管理</Breadcrumb.Item>
        </Breadcrumb>
      </div>
    );
  }
}