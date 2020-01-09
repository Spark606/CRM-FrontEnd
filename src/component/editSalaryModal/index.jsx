import React, { Component } from 'react';
import { Modal, Form, Button, Progress, InputNumber, DatePicker, Select, Row, Col, Input, Divider, Tabs, Table } from 'antd';
const { TextArea } = Input;
import moment from 'moment';
import { hourFormat, yearFormat } from '../../constants';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateSalaryRegulation, getEmployeesSalaryList } from '../../actions/salary';
import './style.scss';
const { TabPane } = Tabs;
const mapStateToProps = state => ({
  user_Id: state.sessions.user_Id,
  user_role: state.sessions.user_role,
  currentPage: state.salary.currentPage,
  pageSize: state.salary.pageSize,
});
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    updateSalaryRegulation,
    getEmployeesSalaryList
  },
  dispatch
);
@connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })

class EiditSalaryModal extends Component {
  state = {
    visible: false,
    showEidt: true
  };
  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  handleCancel = e => {
    this.setState({
      visible: false,
      // showEidt: false
    });
  };
  handleOk = () => {
    this.setState({
      visible: false,
      // showEidt: false
    });
  }
  handleEditBox = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      const data = Object.assign({}, {
        employeeId: this.props.dataSource.employeeId,
        month: this.props.searchMonth.format("YYYY-MM"),
        employeeName: values.employeeName,
        baseSalary: values.baseSalary,
        resourcePaySum: values.clientSumPay,
        resourceRatio: values.clientSumPayRatio,
        companyPaySum: values.firmSumPay,
        companyRatio: values.firmSumPayRatio,
        positionWage: values.positionSalary,
        positionAge: values.positionAge,
        employeeLeave: values.employeeLeave,
        employeeLate: values.employeeLate,
        penalty: values.penalty,
        insurance: values.insurance,
        bonus: values.bonus,
        info: values.info,
        other: values.other
      });
      this.props.updateSalaryRegulation(data, this.props.searchMonth, this.props.currentPage, this.props.pageSize, (searchMonth, currentPage, pageSize) => {
        this.props.getEmployeesSalaryList({
          searchMonth: searchMonth.format("YYYY-MM"),
          page: currentPage,
          pageSize: pageSize
        });
        this.handleCancel();
        this.props.form.resetFields();
      });
    });
  }
  handleOpenEditBox = () => {
    this.setState({
      showEidt: true,
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { employeeSalaryRegulation } = this.props;
    return (
      <Modal
        title="工资结算"
        width={820}
        visible={this.state.visible}
        onCancel={this.handleCancel}
        footer={[
          <Button key="back" onClick={this.handleCancel}>
            关闭
          </Button>
        ]}
      >
        <div className="container">
          {this.state.showEidt ?
            <Form id="formBox" className="formRow" style={{ textAlign: 'left' }}>
              <Row>
                <Col span={12}>
                  <Form.Item label="员工姓名：">
                    {getFieldDecorator('employeeName', {
                      initialValue: employeeSalaryRegulation.employeeName,
                    })(<Input disabled style={{ maxWidth: 88 }} />)}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="底薪：">
                    {getFieldDecorator('baseSalary', {
                      initialValue: employeeSalaryRegulation.baseSalary || 0,
                      rules: [{ required: true, message: '请输入底薪。' }],
                    })(<InputNumber min={0} style={{ maxWidth: 88 }} />)}
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <Form.Item label="人才回款总额：">
                    {getFieldDecorator('clientSumPay', {
                      initialValue: employeeSalaryRegulation.clientSumPay || 0,
                      rules: [{ required: true, message: '请输入人才回款总额!' }],
                    })(<InputNumber disabled min={0} style={{ maxWidth: 88 }} />)}  元
                    </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="人才提成比例：">
                    {getFieldDecorator('clientSumPayRatio', {
                      initialValue: employeeSalaryRegulation.clientSumPayRatio || 0,
                      rules: [{ required: true, message: '请输入人才客户提成比例!' }],
                    })(<InputNumber min={0} max={100} style={{ maxWidth: 88 }} />)}  %
                    </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <Form.Item label="企业回款总额：">
                    {getFieldDecorator('firmSumPay', {
                      initialValue: employeeSalaryRegulation.firmSumPay || 0,
                      rules: [{ required: true, message: '请输入企业回款!' }],
                    })(<InputNumber disabled min={0} style={{ maxWidth: 88 }} />)}  元
                    </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="企业提成比例：">
                    {getFieldDecorator('firmSumPayRatio', {
                      initialValue: employeeSalaryRegulation.firmSumPayRatio || 0,
                      rules: [{ required: true, message: '企业客户提成比例!' }],
                    })(<InputNumber min={0} max={100} style={{ maxWidth: 88 }} />)}  %
                    </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <Form.Item label="岗位工资：">
                    {getFieldDecorator('positionSalary', {
                      initialValue: employeeSalaryRegulation.positionSalary || 0,
                    })(<InputNumber min={0} style={{ maxWidth: 88 }} />)}  元
                    </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="工龄：">
                    {getFieldDecorator('positionAge', {
                      initialValue: employeeSalaryRegulation.positionAge || 0,
                    })(<InputNumber min={0} style={{ maxWidth: 88 }} />)} 元
                    </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <Form.Item label="请假：">
                    {getFieldDecorator('employeeLeave', {
                      initialValue: employeeSalaryRegulation.employeeLeave || 0,
                    })(<InputNumber min={0} style={{ maxWidth: 88 }} />)}  元
                    </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="迟到：">
                    {getFieldDecorator('employeeLate', {
                      initialValue: employeeSalaryRegulation.employeeLate || 0,
                    })(<InputNumber min={0} style={{ maxWidth: 88 }} />)}  元
                    </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <Form.Item label="罚款：">
                    {getFieldDecorator('penalty', {
                      initialValue: employeeSalaryRegulation.penalty || 0,
                    })(<InputNumber min={0} style={{ maxWidth: 88 }} />)}  元
                    </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="奖金：">
                    {getFieldDecorator('bonus', {
                      initialValue: employeeSalaryRegulation.bonus || 0,
                    })(<InputNumber min={0} style={{ maxWidth: 88 }} />)}  元
                    </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <Form.Item label="社保个人费用：">
                    {getFieldDecorator('insurance', {
                      initialValue: employeeSalaryRegulation.insurance || 0,
                    })(<InputNumber min={0} style={{ maxWidth: 88 }} />)}  元
                    </Form.Item>
                </Col>
                <Col span={12} >
                  <Form.Item label="其他：">
                    {getFieldDecorator('other', {
                      initialValue: employeeSalaryRegulation.other || 0,
                    })(<InputNumber style={{ maxWidth: 88 }} />)}  元
                    </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Form.Item label="备注(说明“其他”)：">
                    {getFieldDecorator('info', {
                      initialValue: employeeSalaryRegulation.info || "",
                    })(<TextArea rows={4} style={{ maxWidth: 600 }} />)}
                  </Form.Item>
                </Col>
              </Row>
              <Button type="primary" htmlType="submit" form="formBox" onClick={this.handleEditBox}>提交</Button>
            </Form>
            :
            <div className="detailRow">
              <Row>
                <Col span={12}>员工姓名：{employeeSalaryRegulation.employeeName}</Col>
                <Col span={12}>底薪：{employeeSalaryRegulation.baseSalary}</Col>
              </Row>
              <Row>
                <Col span={12}>人才回款总额：{employeeSalaryRegulation.clientSumPay}</Col>
                <Col span={12}>人才提成比例：{employeeSalaryRegulation.clientSumPayRatio}</Col>
              </Row>
              <Row>
                <Col span={12}>企业回款总额：{employeeSalaryRegulation.firmSumPay}</Col>
                <Col span={12}>企业提成比例：{employeeSalaryRegulation.firmSumPayRatio}</Col>
              </Row>
              <Row>
                <Col span={12}>岗位工资：{employeeSalaryRegulation.positionSalary}</Col>
                <Col span={12}>工龄：{employeeSalaryRegulation.positionAge}</Col>
              </Row>
              <Row>
                <Col span={12}>请假：{employeeSalaryRegulation.employeeLeave}</Col>
                <Col span={12}>迟到：{employeeSalaryRegulation.employeeLate}</Col>
              </Row>
              <Row>
                <Col span={12}>罚款：{employeeSalaryRegulation.penalty}</Col>
                <Col span={12}>奖金：{employeeSalaryRegulation.bonus}</Col>
              </Row>
              <Row>
                <Col span={12}>社保个人费用：{employeeSalaryRegulation.insurance}</Col>
                <Col span={12}>其他：{employeeSalaryRegulation.other}</Col>
              </Row>
              <Row>
                <Col span={24}>备注(说明“其他”)：{employeeSalaryRegulation.info ? employeeSalaryRegulation.info : '--'}</Col>
              </Row>
              {/* {this.props.user_role === '2' ? <Button type="primary" onClick={this.handleOpenEditBox}>修改</Button> : null} */}
            </div>
          }
        </div>
      </Modal>
    );
  }
}

const wrapEiditSalaryModal = Form.create()(EiditSalaryModal);

export default wrapEiditSalaryModal;