import React from 'react';
import { Form, Icon, Input, Button, Result } from 'antd';
const { Search } = Input;
import './style.scss';
import { getPassKey } from '../../actions/api';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createHashHistory } from 'history';
const history = createHashHistory();
const mapStateToProps = state => ({
});
const mapDispatchToProps = dispatch => bindActionCreators({
  getPassKey,
}, dispatch);
@connect(mapStateToProps, mapDispatchToProps)
class RestPassWord extends React.Component {
  state = {
    hadGetPass: false, // 已经发送验证码，开始倒计时60秒
    hadPass: false, // 已经通过验证码验证，开始输入新密码
    hadChange: false, //提交新密码，显示修改结果
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
      }
    });
  };
  getPassKey = () => {
    this.props.form.validateFields((err, values) => {
      console.log(values);
      if (!err) {
        this.props.getPassKey(values);
      }
    });
  }
  toLogin = () => {
    history.push('/login');
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { hadPass, hadGetPass, hadChange } = this.state;
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
                !hadPass ?
                  <Form onSubmit={this.handleSubmit} className="reset-form">
                    <Form.Item>
                      <Form.Item>
                        {getFieldDecorator('employeePhone', {
                          rules: [{ required: true, message: '电话号码不能为空!' }],
                        })(
                          <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="电话号码"
                          />,
                        )}
                      </Form.Item>
                      {hadGetPass ?
                        <Search
                          enterButton="倒计时59"
                          onSearch={this.getPassKey}
                        />
                        :
                        <Search
                          enterButton="获取验证码"
                          onSearch={this.getPassKey}
                        />
                      }
                    </Form.Item>
                    <Button type="primary" htmlType="submit" className="reset-form-button"> 提交  </Button>
                  </Form>
                  :
                  <Form onSubmit={this.handleSubmit} className="reset-form">
                    <Form.Item>
                      {getFieldDecorator('employeePhone', {
                        rules: [{ required: true, message: '电话号码不能为空!' }],
                      })(
                        <Input
                          prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                          placeholder="新密码"
                        />,
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