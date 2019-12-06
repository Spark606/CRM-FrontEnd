import React, { Component } from 'react';
import moment from 'moment';
import { hourFormat, yearFormat } from '../../constants';
import { Modal, Form, Input, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, DatePicker, Radio } from 'antd';
const { TextArea } = Input;
import { updateOneClient, addNewClient, getClients} from '../../actions/client';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
const mapStateToProps = state => ({
});
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    updateOneClient,
    addNewClient,
    getClients
  },
  dispatch
);
@connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })
class EditClientModal extends Component {
  state = {
    visible: false,
    confirmDirty: false,
    autoCompleteResult: [],
    genders: 1,
  };
  handleSubmit = e => {
    e.preventDefault();
    const { dataSource } = this.props;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const seriesData = Object.assign({}, {
          shareStatus: values.clientAvailable,
          resourceName: values.clientName,
          certificate: values.certificate,
          info: values.remark,
          shareStatus: values.clientAvailable,
          createDate: moment(values.createDate).format(yearFormat),
          endDate: moment(values.expireDate).format(yearFormat),
          status: values.status,
          phone: values.tel,
          qq: values.qq,
          province: values.province,
          gender: values.gender,
          email: values.email,
        });
        if (this.props.userRole === '2') { //管理员
          seriesData.employeeId = values.employeeId;
        };
        if (dataSource) {
          // 修改数据，管理员直接values.employeeId，普通员工只能dataSource.employeeId,而且还得传resourceId
          if (this.props.userRole === '1') { //普通用户
            seriesData.employeeId = dataSource.employeeId;
          };
          seriesData.resourceId = dataSource.clientId,
            this.props.updateOneClient(seriesData, this.handleCancel); // 提交更新数据
        } else {
          // 提交新数据, 管理员还是直接values.employeeId, 普通员工只能this.props.userId
          if (this.props.userRole === '1') { //普通用户
            seriesData.employeeId = this.props.userId;
          };
          this.props.addNewClient(seriesData, () => {
            this.props.form.resetFields(); //重置表单并关闭模态框
            this.setState({
              visible: false,
            });
            this.props.getClients({
              page: 1,
              pageSize: 2,
            });
          });
        }
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
    const { dataSource, userRole, employeeList } = this.props;
    return (
      <div>
        <Modal
          title={!dataSource ? "添加个人客户" : "修改个人客户"}
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
                        initialValue: dataSource ? moment(dataSource.createDate) : moment(),
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
                            initialValue: dataSource ? dataSource.employeeId : this.props.userId, // 管理员修改显示原本的employeeId,新建默认填自己的userId
                            rules: [{ required: true, message: '请输入负责人。' }],
                          })(
                            <Select style={{ width: 120 }}>
                              {employeeList.map((item) =>
                                <Select.Option key={item.employeeId}>
                                  {item.employeeName}
                                </Select.Option>
                              )}
                            </Select>)}
                        </Form.Item>
                        :
                        // 普通员工
                        <Form.Item label="负责人：">
                          {getFieldDecorator('employeeId', {
                            initialValue: dataSource ? dataSource.employeeName : this.props.userName, // 普通员工，不为空时为修改，为空时为新建
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
                        initialValue: dataSource ? dataSource.clientName : null,
                        rules: [{ required: true, message: '请输入客户名。' }],
                      })(<Input style={{ maxWidth: 200 }} />)}
                    </Form.Item>
                  </Col>
                  <Col span={12}>

                    <Form.Item label="手机号：">
                      {getFieldDecorator('tel', {
                        initialValue: dataSource ? dataSource.tel : null,
                      })(<Input style={{ maxWidth: 200 }} />)}
                    </Form.Item>
                  </Col>
                </Row>
                <Row style={{ marginTop: 20 }}>
                  <Col span={12}>
                    <Form.Item label="证书及专业：">
                      {getFieldDecorator('certificate', {
                        initialValue: dataSource ? dataSource.certificate : null,
                      })(<Input style={{ maxWidth: 200 }} />)}
                    </Form.Item>
                  </Col>
                  <Col span={12}>

                    <Form.Item label="到期时间：">
                      {getFieldDecorator('expireDate', {
                        initialValue: dataSource ? moment(dataSource.expireDate) : moment(),
                        rules: [{ required: true, message: '客户到期时间。' }],
                      })(<DatePicker format={yearFormat} />)}
                    </Form.Item>
                  </Col>
                </Row>
                <Row style={{ marginTop: 20 }}>
                  <Col span={12}>
                    <Form.Item label="注册省份：">
                      {getFieldDecorator('province', {
                        initialValue: dataSource ? dataSource.province : null,
                      })(<Input style={{ maxWidth: 200 }} />)}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="QQ：">
                      {getFieldDecorator('qq', {
                        initialValue: dataSource ? dataSource.qq : null,
                      })(<Input style={{ maxWidth: 200 }} />)}
                    </Form.Item>
                  </Col>
                </Row>
                <Row style={{ marginTop: 20 }}>
                  <Col span={12}>
                    <Form.Item label="性别：">
                      {getFieldDecorator('gender', {
                        initialValue: dataSource ? dataSource.gender : 1
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
                        initialValue: dataSource ? dataSource.email : null,
                      })(<Input style={{ maxWidth: 200 }} />)}
                    </Form.Item>
                  </Col>
                </Row>
                <Row style={{ marginTop: 20 }}>
                  <Form.Item label="备注：">
                    {getFieldDecorator('remark', {
                      initialValue: dataSource ? dataSource.remark : null,
                    })(<TextArea placeholder="textarea with clear icon" rows={4} />)}
                  </Form.Item>
                </Row>
                <Row style={{ marginTop: 20 }}>
                  <Col span={12}>
                    <Form.Item label="客户状态：">
                      {getFieldDecorator('status', {
                        initialValue: dataSource ? dataSource.status : 1
                      })(
                        <Select style={{ width: 120 }}>
                          <Select.Option value={1}>潜在客户</Select.Option>
                          <Select.Option value={2}>意向客户</Select.Option>
                          <Select.Option value={3}>成交客户</Select.Option>
                          <Select.Option value={4}>失败客户</Select.Option>
                          <Select.Option value={5}>已流失客户</Select.Option>
                        </Select>
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="类别">
                      {getFieldDecorator('clientAvailable', {
                        initialValue: dataSource ? dataSource.clientAvailable : 1
                      })(
                        <Radio.Group >
                          <Radio value={1}>公有</Radio>
                          <Radio value={2}>私有</Radio>
                        </Radio.Group>
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="所在城市：">
                      {getFieldDecorator('city', {
                        initialValue: dataSource ? dataSource.province : null,
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
const wrapEditClientModal = Form.create()(EditClientModal);

export default wrapEditClientModal;