
import React, { Component } from 'react';
import { Breadcrumb } from 'antd';
import _ from 'lodash';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';
import { updateUserInf, getUserInfo } from '../actions/api'
const { Option } = Select;

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
const mapStateToProps = state => ({
  userName: state.sessions.user_name,
  userMsg: state.sessions.userMsg,
  userEmail: state.sessions.user_email,
  userPhone: state.sessions.user_phonenumber,
  userID: state.sessions.user_Id
});
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    updateUserInf,
    getUserInfo
  },
  dispatch
);

@connect(mapStateToProps, mapDispatchToProps)
class Personal extends Component {
  state = {
    edit: false,
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const seriesData = Object.assign({}, {
          employeeName: values.username,
          email: values.email,
          phoneNumber: values.phone
        });
        this.props.updateUserInf(seriesData, this.handleReset);
      }
    });
  };

  componentWillMount() {
    this.props.getUserInfo();
  }
  handleReset = () => {
    this.setState({ edit: false });
    this.props.form.resetFields();
  };
  handleEdit = () => {
    this.setState({ edit: true });
  };
  render() {
    const { getFieldDecorator, userMsg } = this.props.form;

    console.log('userMsg', userMsg);

    return (
      <div className="container">
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>个人中心</Breadcrumb.Item>
        </Breadcrumb>
        {this.state.edit ?
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            <Form onSubmit={this.handleSubmit} style={{ maxWidth: 500 }}>
              <Form.Item label="用户名">
                {getFieldDecorator('username', {
                  initialValue: this.props.userName,
                  rules: [{ required: true, message: '用户名不能为空!' }],
                })(<Input />)}
              </Form.Item>
              <Form.Item label="E-mail">
                {getFieldDecorator('email', {
                  initialValue: this.props.userEmail,
                  rules: [
                    {
                      type: 'email',
                      message: '请输入正确的邮箱!',
                    },
                    {
                      required: true,
                      message: '邮箱不能为空!',
                    },
                  ],
                })(<Input style={{ maxWidth: 200 }} />)}
              </Form.Item>
              <Form.Item label="电话号码">
                {getFieldDecorator('phone', {
                  initialValue: this.props.userPhone,
                  rules: [{ required: true, message: '电话号码不能为空!' }],
                })(<Input style={{ width: '100%' }} />)}
              </Form.Item>
              <Row>
                <Col span={24} style={{ textAlign: 'left' }}>
                  <Button type="primary" htmlType="submit">
                    提交
                  </Button>
                  <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
                    重置
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>
          :
          <div className="show-wrap" style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            <div className="item">用户名: <span>{this.props.userName}</span></div>
            <div className="item">员工号: <span>{this.props.userID}</span></div>
            <div className="item">邮箱: <span>{this.props.userEmail}</span></div>
            <div className="item">电话号码: <span>{this.props.userPhone}</span></div>
            <Row>
              <Col span={24} style={{ textAlign: 'left' }}>
                <Button style={{ marginLeft: 8 }} onClick={this.handleEdit}>
                  编辑
                  </Button>
              </Col>
            </Row>
          </div>
        }
      </div>
    );
  }
}
export default Form.create()(Personal);