import React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import './style.scss';
class RestPassWord extends React.Component {
handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
        if (!err) {
        console.log('Received values of form: ', values);
        }
    });
    };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
        <div id="reset-wrap">
            <div className="wrap">
                <Form onSubmit={this.handleSubmit} className="reset-form">
                    <Form.Item>
                    {getFieldDecorator('email', {
                        rules: [{ required: true, message: '邮箱不能为空!' }],
                    })(
                        <Input
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="邮箱"
                        />,
                    )}
                    </Form.Item>
                    <Form.Item>
                    <Button type="primary" htmlType="submit" className="reset-form-button">
                        提交
                    </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
  }
}
export default Form.create()(RestPassWord);