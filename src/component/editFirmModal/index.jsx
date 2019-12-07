import React, { Component } from 'react';
import moment from 'moment';
import { hourFormat, yearFormat } from '../../constants';
import { Modal, Form, Input, Select, Row, Col, Checkbox, Button, AutoComplete, DatePicker, Radio } from 'antd';
const { TextArea } = Input;
import { updateOneFirm, addNewFirm, getFirms} from '../../actions/firm';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
const mapStateToProps = state => ({
});
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    updateOneFirm,
    addNewFirm,
    getFirms
  },
  dispatch
);
@connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })
class EditFirmModal extends Component {
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
      const seriesData =  Object.assign({}, {
        companyName: values.firmName,
        companyCategory: values.category,
        startDate: moment(values.createDate).format(yearFormat),
        expireDate: moment(values.expireDate).format(yearFormat),
        contactorName: values.contact,
        status: values.status,
        info: values.remark,
        phoneNumber: values.tel,
        qq: values.qq,
        occupation: values.position,
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
        seriesData.companyId = dataSource.firmId,
          this.props.updateOneFirm(seriesData, this.handleCancel); // 提交更新数据
      } else {
        // 提交新数据, 管理员还是直接values.employeeId, 普通员工只能this.props.userId
        if (this.props.userRole === '1') { //普通用户
          seriesData.employeeId = this.props.userId;
        };
        this.props.addNewFirm(seriesData, () => {
          this.props.form.resetFields(); //重置表单并关闭模态框
          this.setState({
            visible: false,
          });
          this.props.getFirms({
            page: 1,
            pageSize: 2,
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
    const { dataSource, userRole, employeeList } = this.props;
    return (
      <div>
        <Modal
          title={!dataSource ? "添加企业客户" : "修改企业客户"}
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

                <hr />
                <Row>
                  <Col span={12}>
                    <Form.Item label="企业名称：">
                      {getFieldDecorator('firmName', {
                        initialValue: dataSource ? dataSource.firmName : null,
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
                <Row>
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
                    <Form.Item label="所在城市：">
                      {getFieldDecorator('province', {
                        initialValue: dataSource ? dataSource.province : null,
                      })(<Input style={{ maxWidth: 200 }} />)}
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={12}>
                    <Form.Item label="公司类别：">
                      {getFieldDecorator('category', {
                        initialValue: dataSource ? dataSource.category : 1
                      })(
                        <Select style={{ width: 120 }}>
                          <Select.Option value={1}>建筑业</Select.Option>
                          <Select.Option value={2}>农林牧渔</Select.Option>
                          <Select.Option value={3}>住宿餐饮</Select.Option>
                          <Select.Option value={4}>IT</Select.Option>
                          <Select.Option value={5}>金融业</Select.Option>
                          <Select.Option value={6}>房地产</Select.Option>
                          <Select.Option value={7}>政府机关</Select.Option>
                          <Select.Option value={8}>文体传媒</Select.Option>
                          <Select.Option value={9}>运输物流</Select.Option>
                          <Select.Option value={10}>商业服务</Select.Option>
                          <Select.Option value={11}>卫生医疗</Select.Option>
                          <Select.Option value={12}>教育培训</Select.Option>
                          <Select.Option value={13}>其他</Select.Option>
                        </Select>
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={12} className="marker">
                    <Form.Item label="备注：">
                      {getFieldDecorator('remark', {
                        initialValue: dataSource ? dataSource.remark : null,
                      })(<TextArea placeholder="textarea with clear icon" rows={4}/>)}
                    </Form.Item>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col span={12}>
                    <Form.Item label="联系人：">
                      {getFieldDecorator('contact', {
                        initialValue: dataSource ? dataSource.contact : null,
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
                <Row>
                  <Col span={12}>
                    <Form.Item label="职务：">
                      {getFieldDecorator('position', {
                        initialValue: dataSource ? dataSource.position : null,
                        rules: [{ required: true, message: '请输入联系人职位。' }],
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
                <Row>
                  <Col span={12}>
                    <Form.Item label="性别：">
                      {getFieldDecorator('gender', {
                        initialValue: dataSource ? dataSource.gender : 1
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
                        initialValue: dataSource ? dataSource.email : null,
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
const wrapEditFirmModal = Form.create()(EditFirmModal);

export default wrapEditFirmModal;