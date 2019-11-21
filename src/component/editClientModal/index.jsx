import React, { Component } from 'react';
import { Modal, Form, Input, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, DatePicker, Radio } from 'antd';
const { TextArea } = Input;

class EditClentModal extends Component {
  state = {
    visible: false,
    confirmDirty: false,
    autoCompleteResult: [],
    genders: 1,
    options: this.props.options
  };

  handleSubmit = e => {
    e.preventDefault();
      // this.props.form.validateFieldsAndScroll((err, values) => {
      //   this.props.updateFormData(values); // 提交新数据
      // });
    // 提交成功，关闭模态框
    this.setState({
      visible: false,
    });
  };

  showModal = (record) => {
    console.log(record);
    this.setState({
      visible: true,
    });
  };

  handleCancel = e => {
    // this.props.form.resetFields(); //重置表单并关闭模态框
    this.setState({
      visible: false,
    });
  };

  render() {
    const options = [
      {
        value: 'zhejiang',
        label: 'Zhejiang',
        children: [
          {
            value: 'hangzhou',
            label: 'Hangzhou',
            children: [
              {
                value: 'xihu',
                label: 'West Lake',
              },
            ],
          },
        ],
      },
      {
        value: 'jiangsu',
        label: 'Jiangsu',
        children: [
          {
            value: 'nanjing',
            label: 'Nanjing',
            children: [
              {
                value: 'zhonghuamen',
                label: 'Zhong Hua Men',
              },
            ],
          },
        ],
      },
    ];
    return (
      <div>
        <Modal
          title="添加个人客户"
          width={820}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              关闭
            </Button>,
            <Button key="submit" htmlType="submit" type="primary" form="formBox" onClick={this.handleOk}>
              提交
            </Button>,
          ]}
        >
          <div className="container">
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              <Form id="formBox" onSubmit={this.handleSubmit} style={{ textAlign: 'left' }}>
                <Row>
                  <Col span={12}>
                    获得客户时间：<DatePicker />
                  </Col>
                  <Col span={12}>
                    负责人： Liz
                    </Col>
                </Row>
                <hr style={{ marginTop: 20 }} />
                <Row style={{ marginTop: 20 }}>
                  <Col span={12}>
                    客户名：<Input style={{ maxWidth: 200 }} />
                  </Col>
                  <Col span={12}>
                    手机号：<Input style={{ maxWidth: 200 }} />
                  </Col>
                </Row>
                <Row style={{ marginTop: 20 }}>
                  <Col span={12}>
                    证书及专业：<Input style={{ maxWidth: 200 }} />
                  </Col>
                  <Col span={12}>
                    到期时间：<DatePicker />
                  </Col>
                </Row>
                <Row style={{ marginTop: 20 }}>
                  <Col span={12}>注册省份：<Cascader defaultValue={['zhejiang', 'hangzhou', 'xihu']} options={options} style={{ maxWidth: 200 }} /></Col>
                  <Col span={12}>QQ：<Input style={{ maxWidth: 200 }} /></Col>
                </Row>
                <Row style={{ marginTop: 20 }}>
                  <Col span={12}>性别：
                    <Radio.Group onChange={this.onChangeGenders} value={this.state.genders}>
                      <Radio value={1}>女</Radio>
                      <Radio value={2}>男</Radio>
                    </Radio.Group>
                  </Col>
                  <Col span={12}>邮箱：<Input style={{ maxWidth: 200 }} /></Col>
                </Row>
                <Row style={{ marginTop: 20 }}>
                  <Col span={24} className="marker">
                    备注：<TextArea placeholder="textarea with clear icon" rows={4} style={{ maxWidth: 400 }} />
                  </Col>
                </Row>
                <Row style={{ marginTop: 20 }}>
                  <Col span={12}>客户状态：<Input style={{ maxWidth: 200 }} /></Col>
                  <Col span={12}>所在城市：<Cascader defaultValue={['zhejiang', 'hangzhou', 'xihu']} options={options} style={{ maxWidth: 200 }} /></Col>
                </Row>
              </Form>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default EditClentModal;