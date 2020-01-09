import React, { Component } from 'react';
import moment from 'moment';
import { hourFormat, yearFormat, yearAndHourFormat } from '../../constants';
import { Modal, Form, Input, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, DatePicker, Radio } from 'antd';
const { TextArea } = Input;
const { Option } = Select;
import { addNewClient, getClients } from '../../actions/client';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
const mapStateToProps = state => ({
  pageSize: state.client.pageSize,
  currentPage: state.client.currentPage,
});
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    addNewClient,
    getClients
  },
  dispatch
);
@connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })
class AddNewClientModal extends Component {
  state = {
    visible: false,
    confirmDirty: false,
    autoCompleteResult: [],
    genders: 1,
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const seriesData = Object.assign({}, {
          resourceName: values.clientName,
          certificate: values.certificate,
          info: values.remark,
          createDate: moment(values.createDate).format(yearAndHourFormat),
          endDate: moment(values.expireDate).format(yearAndHourFormat),
          status: values.status,
          phoneNumber: values.tel,
          qq: values.qq,
          province: values.province,
          gender: values.gender,
          email: values.email,
          shareStatus: values.shareStatus,
        });
        if (this.props.userRole === '2') { //管理员
          seriesData.employeeId = values.employeeId;
        };
        // 提交新数据, 管理员还是直接values.employeeId, 普通员工只能this.props.userId
        if (this.props.userRole === '1') { //普通用户
          seriesData.employeeId = this.props.userId;
        };
        this.props.addNewClient(seriesData,
          1,
          this.props.pageSize,
          this.props.shareStatus,
          '',
          'all', // 新建了一个客户，应该清除所有查询，但是如何消除filtered?
          (currentPage, pageSize, shareStatus, searchText, searchType) => {
            this.handleCancel();
            this.props.getClients({
              searchText: searchText,
              searchType: searchType,
              shareStatus: shareStatus,
              page: currentPage,
              pageSize: pageSize,
            });
          });
      }
    });
  };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleCancel = e => {
    this.props.form.resetFields(); //重置表单并关闭模态框
    this.setState({
      visible: false,
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { userRole, employeeList } = this.props;
    return (
      <div>
        <Modal
          title="新建个人客户"
          width={820}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              关闭
            </Button>,
            <Button key="submit" htmlType="submit" type="primary" htmlFor="formBox" onClick={(e) => this.handleSubmit(e)} >
              提交
            </Button>,
          ]}
        >
          <div className="container">
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              <Form id="formBox" style={{ textAlign: 'left' }}>
                <Row>
                  <Col span={12}>
                    <Form.Item label="获得客户时间：">
                      {getFieldDecorator('createDate', {
                        initialValue: moment(),
                        rules: [{ required: true, message: '请输入获得客户时间。' }],
                      })(<DatePicker format={yearFormat} />)}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    {
                      userRole === '2' ?
                        //管理员
                        <Form.Item label="负责人：">
                          {getFieldDecorator('employeeId', {
                            initialValue: this.props.userId, // 管理员修改显示原本的employeeId,新建默认填自己的userId
                            rules: [{ required: true, message: '请输入负责人。' }],
                          })(
                            <Select style={{ width: 120 }}>
                              {employeeList.map((item) =>
                                <Option key={item.employeeId}>
                                  {item.employeeName}
                                </Option>
                              )}
                            </Select>)}
                        </Form.Item>
                        :
                        // 普通员工
                        <Form.Item label="负责人：">
                          {getFieldDecorator('employeeId', {
                            initialValue: this.props.userName, // 普通员工，不为空时为修改，为空时为新建
                            rules: [{ required: true, message: '请输入负责人。' }],
                          })(<Input disabled style={{ maxWidth: 200 }} />)}
                        </Form.Item>
                    }
                  </Col>
                </Row>
                <hr style={{ marginTop: 20 }} />
                <Row style={{ marginTop: 20 }}>
                  <Col span={12}>
                    <Form.Item label="客户名：">
                      {getFieldDecorator('clientName', {
                        initialValue: null,
                        rules: [{ required: true, message: '请输入客户名。' }],
                      })(<Input style={{ maxWidth: 200 }} />)}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="手机号：">
                      {getFieldDecorator('tel', {
                        initialValue: null,
                        rules: [{ required: true, message: '请输入手机号。' }],
                      })(<Input style={{ maxWidth: 200 }} />)}
                    </Form.Item>
                  </Col>
                </Row>
                <Row style={{ marginTop: 20 }}>
                  <Col span={12}>
                    <Form.Item label="证书及专业：">
                      {getFieldDecorator('certificate', {
                        initialValue: null,
                      })(<Input style={{ maxWidth: 200 }} />)}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="到期时间：">
                      {getFieldDecorator('expireDate', {
                        initialValue: moment(),
                        rules: [{ required: true, message: '客户到期时间。' }],
                      })(<DatePicker format={yearFormat} />)}
                    </Form.Item>
                  </Col>
                </Row>
                <Row style={{ marginTop: 20 }}>
                  <Col span={12}>
                    <Form.Item label="注册省份：">
                      {getFieldDecorator('province', {
                        initialValue: null,
                      })(<Input style={{ maxWidth: 200 }} />)}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="QQ：">
                      {getFieldDecorator('qq', {
                        initialValue: null,
                      })(<Input style={{ maxWidth: 200 }} />)}
                    </Form.Item>
                  </Col>
                </Row>
                <Row style={{ marginTop: 20 }}>
                  <Col span={12}>
                    <Form.Item label="性别：">
                      {getFieldDecorator('gender', {
                        initialValue: 1
                      })(
                        <Radio.Group >
                          <Radio value={1}>女</Radio>
                          <Radio value={2}>男</Radio>
                        </Radio.Group>
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="邮箱：">
                      {getFieldDecorator('email', {
                        initialValue: null,
                        rules: [
                          { type: 'email', message: '请输入正确邮箱！' }
                        ],
                      })(<Input style={{ maxWidth: 200 }} />)}
                    </Form.Item>
                  </Col>
                </Row>
                <Row style={{ marginTop: 20 }}>
                  <Form.Item label="备注：">
                    {getFieldDecorator('remark', {
                      initialValue: null,
                    })(<TextArea rows={4} />)}
                  </Form.Item>
                </Row>
                <Row style={{ marginTop: 20 }}>
                  <Col span={12}>
                    <Form.Item label="客户状态：">
                      {getFieldDecorator('status', {
                        initialValue: 1
                      })(
                        <Select style={{ width: 120 }}>
                          <Option value={1}>潜在客户</Option>
                          <Option value={2}>意向客户</Option>
                          <Option value={3}>成交客户</Option>
                          <Option value={4}>失败客户</Option>
                          <Option value={5}>已流失客户</Option>
                        </Select>
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="资源状态：">
                      {getFieldDecorator('shareStatus', {
                        initialValue: 2,
                      })(
                        <Select style={{ width: 120 }}>
                          <Option value={1}>公有资源</Option>
                          <Option value={2}>私有资源</Option>
                        </Select>)}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="所在城市：">
                      {getFieldDecorator('city', {
                        initialValue: null,
                      })(<Input style={{ maxWidth: 200 }} />)}
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}
const wrapAddNewClientModal = Form.create()(AddNewClientModal);

export default wrapAddNewClientModal;