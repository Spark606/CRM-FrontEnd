import React, { Component } from 'react';
import moment from 'moment';
import { hourFormat, yearFormat, yearAndHourFormat } from '../../constants';
import { Modal, Form, Input, Row, Col, Checkbox, Button, AutoComplete, DatePicker, Radio, Select } from 'antd';
const { Option } = Select;
const { TextArea } = Input;
import { addNewFirm, getFirms } from '../../actions/firm';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
const mapStateToProps = state => ({
  pageSize: state.firm.pageSize,
  currentPage: state.firm.currentPage,
});
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    addNewFirm,
    getFirms
  },
  dispatch
);
@connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })
class AddNewFirmModal extends Component {
  state = {
    visible: false,
    confirmDirty: false,
    autoCompleteResult: [],
    genders: 1,
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      const seriesData = Object.assign({}, {
        companyName: values.firmName,
        companyCategory: values.category,
        createDate: moment(values.createDate).format(yearAndHourFormat),
        expireDate: moment(values.expireDate).format(yearAndHourFormat),
        contactorName: values.contact,
        status: values.status,
        info: values.remark,
        phoneNumber: values.tel,
        qq: values.qq,
        occupation: values.position,
        province: values.province,
        gender: values.gender,
        email: values.email,
        shareStatus: values.shareStatus,
      });
      if (!err) {
        if (this.props.userRole === '2') { //管理员
          seriesData.employeeId = values.employeeId;
        };
        // 提交新数据, 管理员还是直接values.employeeId, 普通员工只能this.props.userId
        if (this.props.userRole === '1') { //普通用户
          seriesData.employeeId = this.props.userId;
        };
        this.props.addNewFirm(seriesData,
          1,
          this.props.pageSize,
          this.props.shareStatus,
          '',
          'all',
          (currentPage, pageSize, shareStatus, searchText, searchType) => {
            this.handleCancel();
            this.props.getFirms({
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
          title="新建企业客户"
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

                <hr />
                <Row>
                  <Col span={12}>
                    <Form.Item label="企业名称：">
                      {getFieldDecorator('firmName', {
                        initialValue: null,
                        rules: [{ required: true, message: '请填写企业名称。' }],
                      })(<Input style={{ maxWidth: 200 }} />)}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="到期时间：">
                      {getFieldDecorator('expireDate', {
                        initialValue: moment(),
                        rules: [{ required: true, message: '请填写客户到期时间。' }],
                      })(<DatePicker format={yearFormat} />)}
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={12}>
                    <Form.Item label="所在城市：">
                      {getFieldDecorator('province', {
                        initialValue: null,
                      })(<Input style={{ maxWidth: 200 }} />)}
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
                </Row>
                <Row>
                  <Form.Item label="备注：">
                    {getFieldDecorator('remark', {
                      initialValue: null,
                    })(<TextArea rows={4} />)}
                  </Form.Item>
                </Row>
                <hr />
                <Row>
                  <Col span={12}>
                    <Form.Item label="联系人：">
                      {getFieldDecorator('contact', {
                        initialValue: null,
                        rules: [{ required: true, message: '请输入联系人。' }],
                      })(<Input style={{ maxWidth: 200 }} />)}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="手机号：">
                      {getFieldDecorator('tel', {
                        initialValue: null,
                        rules: [{ required: true, message: '请填写联系人手机号。' }],
                      })(<Input style={{ maxWidth: 200 }} />)}
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={12}>
                    <Form.Item label="职务：">
                      {getFieldDecorator('position', {
                        initialValue: null,
                        rules: [{ required: true, message: '请输入联系人职位。' }],
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
                <Row>
                  <Col span={12}>
                    <Form.Item label="性别：">
                      {getFieldDecorator('gender', {
                        initialValue: 1
                      })(
                        <Radio.Group onChange={this.onChangeGenders} >
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
              </Form>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}
const wrapAddNewFirmModal = Form.create()(AddNewFirmModal);

export default wrapAddNewFirmModal;