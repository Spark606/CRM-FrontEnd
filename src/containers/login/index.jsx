import React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import {Link} from 'react-router-dom';
import { createHashHistory } from 'history';
import './style.scss';
const history = createHashHistory();
class Login extends React.Component {
handleSubmit = e => {
    e.preventDefault();
    history.push('/main/client/table');
    return;
    this.props.form.validateFields((err, values) => {
        if (!err) {
        console.log('Received values of form: ', values);
        }
    });
    };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
        <div id="login-wrap">
            <div className="wrap">
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: '用户名不能为空!' }],
                    })(
                        <Input
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="用户名"
                        />,
                    )}
                    </Form.Item>
                    <Form.Item>
                    {getFieldDecorator('password', {
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
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(<Checkbox>记住我</Checkbox>)}
                    <Link className="login-form-forgot" to={"/reset"}>
                        忘记密码？
                    </Link>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        登录
                    </Button>
                    <a href="">马上注册</a>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
  }
}
export default Form.create()(Login);