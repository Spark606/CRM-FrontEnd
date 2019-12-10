import React from 'react';
import { Form, Icon, Input, Button, Result, message } from 'antd';
const { Search } = Input;
import './style.scss';
import { getCode, verifyCode, resetPassword } from '../../actions/api';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createHashHistory } from 'history';
const history = createHashHistory();
const mapStateToProps = state => ({
});
const mapDispatchToProps = dispatch => bindActionCreators({
  getCode,
  verifyCode,
  resetPassword
}, dispatch);

@connect(mapStateToProps, mapDispatchToProps)
class RestPassWord extends React.Component {
  state = {
    hadGetCode: false, // 已经发送验证码，开始倒计时60秒
    hadVerify: false, // 已经通过验证码验证，开始输入新密码
    hadChange: false, //提交新密码，显示修改结果
    employeeEmail: '',
    sendCode:false,
    waitTime: 59
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (!this.state.hadVerify) {
          this.props.verifyCode(values, () => {
            this.setState({
              hadVerify: true,
              employeeEmail: values.employeeEmail
            })
          });
        }
        else
          this.props.resetPassword(values, () => {
            message.success("更改密码成功！");
            this.toLogin()
          });
      }
    });
  };

  getCode = () => {
    if (this.state.hadGetCode) return;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.getCode({ employeeEmail: values.employeeEmail }, () => {
          this.setState({ hadGetCode: true, sendCode:true});
          let { waitTime } = this.state;
          let siv = setInterval(() => {
            this.setState({ waitTime: (waitTime--) }, () => {
              if (waitTime <= 0) {
                clearInterval(siv);
                this.setState({ hadGetCode: false, waitTime: 59 })
              }
            });
          }, 1000);
        });
      }
    });
  }

  toLogin = () => {
    history.push('/login');
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { sendCode, hadVerify, hadGetCode, hadChange, employeeEmail } = this.state;
    return (
      <div id="reset-wrap">
        {
          hadChange ?
            <Result
              icon={<Icon type="smile" theme="twoTone" />}
              title="修改密码成功!"
              extra={<Button type="primary" onClick={this.toLogin}>去登录</Button>}
            />
            :
            <div className="wrap">
              {
                !hadVerify ?
                  <Form onSubmit={this.handleSubmit} className="reset-form">

                    <Form.Item>
                      {getFieldDecorator('employeeEmail', {
                        rules: [
                          {
                            type: 'email',
                            message: '请输入正确的邮箱!',
                          },
                          {
                            required: true,
                            message: '邮箱不能为空!',
                          }]
                      })(
                        <Input
                          prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                          placeholder="E-MAIL"
                        />,
                      )}
                    </Form.Item>

                    <Form.Item>
                      {getFieldDecorator('verifyCode', () => {
                        if (sendCode) return {
                          rules: [
                            {
                              required: true,
                              message: '验证码不能为空!',
                            }]
                        }
                      })(
                        <Search
                          placeholder="请输入验证码"
                          enterButton={hadGetCode ? `${this.state.waitTime}s重试` : "获取验证码"}
                          onSearch={this.getCode}
                        />)
                      }
                    </Form.Item>
                    <Button type="primary" htmlType="submit" className="reset-form-button"> 提交  </Button>
                  </Form>
                  :
                  <Form onSubmit={this.handleSubmit} className="reset-form">
                    <Form.Item>
                      {getFieldDecorator('employeeEmail', {
                        initialValue: employeeEmail,
                        rules: [{ required: true, message: '密码不能为空!' }],
                      })(
                        <Input
                          prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                          disabled
                        />
                      )}
                    </Form.Item>

                    <Form.Item>
                      {getFieldDecorator('newPassword', {
                        rules: [{ required: true, message: '密码不能为空!' }],
                      })(
                        <Input.Password
                          prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                          placeholder="新密码"
                        />
                      )}
                    </Form.Item>
                    <Button type="primary" htmlType="submit" className="reset-form-button"> 提交 </Button>
                  </Form>
              }
            </div>
        }
      </div >
    );
  }
}
export default Form.create()(RestPassWord);