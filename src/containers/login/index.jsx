import React from 'react';
import { Form, Icon, Input, Button, Checkbox, Radio } from 'antd';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './style.scss';

import {login} from '../../actions/api';
import setUIElement from '../../actions/base';
const mapStateToProps = state => ({
  isFetching: state.sessions.isFetching,
  documentTitle: state.layout.documentTitle,
});
const mapDispatchToProps = dispatch => bindActionCreators({
  login,
  setUIElement
}, dispatch);
@connect(mapStateToProps, mapDispatchToProps)
class Login extends React.Component {
  state = {
    employRole: 1
  };
  handleStoreChange() {
    this.setState(
      store.getState()
    )
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      // values = Object.assign({ employRole: this.state.employRole }, values);
      if (!err) {
        this.props.login(values);
      }
    });
  };
  onChangeRole = e => {
    console.log('radio checked', e.target.value);
    this.setState({
      employRole: e.target.value,
    });
  };

  render() {
    const {getFieldDecorator, isFetching} = this.props.form; //组件被Form包装过
    return (
      <div id="login-wrap">
        <div className="wrap">
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator('employeeId', {
                rules: [{ required: true, message: '用户名不能为空!' }],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="用户名"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('passWord', {
                rules: [{ required: true, message: '密码不能为空！' }],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="密码"
                />,
              )}
            </Form.Item>
            <Form.Item>
              <Radio.Group onChange={this.onChangeRole} value={this.state.employRole}>
                <Radio value={1}>管理员</Radio>
                <Radio value={2}>普通员工</Radio>
              </Radio.Group>
            </Form.Item>
            {/* <Form.Item>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(<Checkbox>记住我</Checkbox>)}
            </Form.Item>   */}
            {/* <Link className="login-form-forgot" to={"/reset"}>
              忘记密码？
            </Link> */}
            <Button type="primary" htmlType="submit" loading={isFetching} className="login-form-button">
              登录
            </Button>
            <a href="">马上注册</a>
          </Form>
        </div>
      </div>
    );
  }
}
export default Form.create()(Login);