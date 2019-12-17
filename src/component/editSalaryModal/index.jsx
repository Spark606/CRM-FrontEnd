import React, { Component } from 'react';
import { Modal, Form, Button, Progress, InputNumber, DatePicker, Select, Row, Col, Input, Divider, Tabs, Table } from 'antd';
const { TextArea } = Input;
import moment from 'moment';
import { hourFormat, yearFormat } from '../../constants';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getOrderBackList, getOrderBackDetail, addNewOrderBack } from '../../actions/order';
import './style.scss';
const { TabPane } = Tabs;
const mapStateToProps = state => ({
  oneOrderBackList: state.order.oneOrderBackList,
  orderBackDetail: state.order.orderBackDetail,
  user_Id: state.sessions.user_Id
});
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    addNewOrderBack,
    getOrderBackList,
    getOrderBackDetail
  },
  dispatch
);
@connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })

class EiditSalaryModal extends Component {
  state = {
    visible: false,
    activeTab: '1',
    recorderDate: "",
    recorderHour: ""
  };
  handleChangeTab = (e) => {
    console.log(e);
    if (e === '1') {
      this.props.getOrderBackDetail({
        businessId: this.props.dataSource.orderId,
        orderType: this.props.orderType
      });
    } else if (e === '2') {
      this.props.getOrderBackList({
        businessId: this.props.dataSource.orderId
      });
    }
  }
  showModal = () => {
    this.setState({
      visible: true,
      activeTab: '1'
    });
  };
  handleCancel = e => {
    this.setState({
      visible: false,
      activeTab: '1'
    });
  };
  handleOk = () => {
    this.setState({
      visible: false,
      activeTab: '1'
    });
  }
  handleEditBox = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      const data = Object.assign({}, {
        createDate: moment(values.recordTimeDay).format(yearFormat),
        recordDate: moment().format(yearFormat),
        businessId: this.props.dataSource.orderId,
        employeeId: this.props.user_Id,
        laterBackPay: values.laterBackPay,
        info: values.remark,
        businessType: this.props.orderType
      });
      this.props.addNewOrderBack(data, this.props.form.resetFields);
    });
  }
  render() {
    const { oneOrderBackList, orderBackDetail } = this.props;
    const { getFieldDecorator } = this.props.form;
    const columns = [{
      width: 150,
      title: '回款时间',
      dataIndex: 'laterBackDate',
      key: 'laterBackDate',
      fixed: 'left',
      render: text => <span>{text ? text : '--'}</span>,
    }, {
      width: 140,
      title: '回款金额（元）',
      dataIndex: 'laterBackPay',
      key: 'laterBackPay',
      fixed: 'left',
      render: text => <span>{text ? text : '--'}</span>,
    }, {
      width: 180,
      title: '备注',
      dataIndex: 'info',
      key: 'info',
      fixed: 'left',
      render: text => <span>{text ? text : '--'}</span>,
    }, {
      width: 120,
      title: '录入人',
      dataIndex: 'employeeName',
      key: 'employeeName',
      fixed: 'left',
      render: text => <span>{text ? text : '--'}</span>,
    }, {
      width: 150,
      title: '录入时间',
      dataIndex: 'recordDate',
      key: 'recordDate',
      fixed: 'left',
      render: text => <span>{text ? text : '--'}</span>,
    }
    ];
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
          <Form id="formBox" style={{ textAlign: 'left' }}>
            <Row>
              <Col span={12}>
                <Form.Item label="员工姓名：">
                  {getFieldDecorator('employeeName', {
                    initialValue: 'Liz',
                  })(<Input disabled style={{ maxWidth: 200 }} />)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="底薪：">
                  {getFieldDecorator('recordTimeDay', {
                    initialValue: moment(),
                    rules: [{ required: true, message: '请输入底薪。' }],
                  })(<InputNumber min={1} style={{ maxWidth: 200 }} />)}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item label="个人客户总额：">
                  {getFieldDecorator('laterBackPay', {
                    rules: [{ required: true, message: '请输入个人客户总额!' }],
                    initialValue: 100,
                  })(<InputNumber min={1} style={{ maxWidth: 200 }} />)}  元
                    </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="个人客户提成比例：">
                  {getFieldDecorator('laterBackPay', {
                    rules: [{ required: true, message: '请输入个人客户提成比例!' }],
                    initialValue: 100,
                  })(<InputNumber min={1} style={{ maxWidth: 200 }} />)}  %
                    </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item label="企业客户总额：">
                  {getFieldDecorator('laterBackPay', {
                    rules: [{ required: true, message: '请输入企业客户总额!' }],
                    initialValue: 100,
                  })(<InputNumber min={1} style={{ maxWidth: 200 }} />)}  元
                    </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="企业客户提成比例：">
                  {getFieldDecorator('laterBackPay', {
                    rules: [{ required: true, message: '企业客户提成比例!' }],
                    initialValue: 100,
                  })(<InputNumber min={1} style={{ maxWidth: 200 }} />)}  %
                    </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item label="岗位工资：">
                  {getFieldDecorator('laterBackPay', {
                    initialValue: 0,
                  })(<InputNumber min={0} style={{ maxWidth: 200 }} />)}  元
                    </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="工龄：">
                  {getFieldDecorator('laterBackPay', {
                    initialValue: 0,
                  })(<InputNumber min={0} style={{ maxWidth: 200 }} />)}
                    </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item label="请假：">
                  {getFieldDecorator('laterBackPay', {
                    initialValue: 0,
                  })(<InputNumber min={0} style={{ maxWidth: 200 }} />)}  次
                    </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="迟到：">
                  {getFieldDecorator('laterBackPay', {
                    initialValue: 0,
                  })(<InputNumber min={0} style={{ maxWidth: 200 }} />)}  次
                    </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item label="罚款：">
                  {getFieldDecorator('laterBackPay', {
                    initialValue: 0,
                  })(<InputNumber min={0} style={{ maxWidth: 200 }} />)}  元
                    </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="奖金：">
                  {getFieldDecorator('laterBackPay', {
                    initialValue: 0,
                  })(<InputNumber min={0} style={{ maxWidth: 200 }} />)}  元
                    </Form.Item>
              </Col>
            </Row>
            <Button type="primary" htmlType="submit" form="formBox" onClick={this.handleEditBox}>提交</Button>
          </Form>
        </div>
      </Modal>
    );
  }
}

const wrapEiditSalaryModal = Form.create()(EiditSalaryModal);

export default wrapEiditSalaryModal;