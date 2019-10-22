import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { Breadcrumb} from 'antd';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete} from 'antd';
const { Option } = Select;

const AutoCompleteOption = AutoComplete.Option;



const mapStateToProps = state => ({
  documentTitle: state.layout.documentTitle,
});
const mapDispatchToProps = dispatch => bindActionCreators(
  {},
  dispatch
);
@connect(mapStateToProps, mapDispatchToProps)
class ClientsNew extends Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  componentWillMount() {
  }
  handleReset = () => {
    this.props.form.resetFields();
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86',
    })(
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>,
    );
    
    return (
      <div className="container">
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>个人客户</Breadcrumb.Item>
          <Breadcrumb.Item>添加个人客户</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{ padding: 24, background: '#fff', minHeight: 360}}>
          <Form onSubmit={this.handleSubmit} style={{  maxWidth: 500}}>
            <Form.Item  label="用户名">
              {getFieldDecorator('username', {
                  rules: [{ required: true, message: '用户名不能为空!' }],
              })(<Input />)}
            </Form.Item>
            <Form.Item  label="员工号">
              {getFieldDecorator('employeeId', {
                  rules: [{ required: true, message: '用户名不能为空!' }],
              })(<Input placeholder="注意：此内容只能修改一次"/>)}
            </Form.Item>
            <Form.Item label="E-mail">
              {getFieldDecorator('email', {
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
              })(<Input />)}
            </Form.Item>
            <Form.Item label="电话号码">
              {getFieldDecorator('phone', {
                rules: [{ required: true, message: '电话号码不能为空!' }],
              })(<Input addonBefore={prefixSelector} style={{ width: '100%' }} />)}
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
      </div>
    );
  }
}
export default  Form.create()(ClientsNew);