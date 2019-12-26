import React, { Component } from 'react';
import { Modal, Form, Button, Progress, InputNumber, DatePicker, Select, Row, Col, Input, Divider, Tabs, Table } from 'antd';
const { TextArea } = Input;
import moment from 'moment';
import { hourFormat, yearFormat, yearAndHourFormat } from '../../constants';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getOrderBackList, getOrderBackDetail, addNewOrderBack } from '../../actions/order';
import './style.scss';
const { TabPane } = Tabs;
const mapStateToProps = state => ({
  oneOrderBackList: state.order.oneOrderBackList,
  orderBackDetail: state.order.orderBackDetail,
  user_Id: state.sessions.user_Id,
  user_name: state.sessions.user_name
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

class AddOrderBackModal extends Component {
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
        createDate: moment(values.recordTimeDay).format(yearAndHourFormat),
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
        title="订单回款"
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
          <Tabs defaultActiveKey={this.state.activeTab} onChange={this.handleChangeTab}>
            <TabPane tab="回款详情" key="1">
              <div className="orderDetilBox">
                <Row>
                  <Col span={12}>编号：{orderBackDetail.businessId ? orderBackDetail.businessId : '--'}</Col>
                  <Col span={12}>成交总额：{orderBackDetail.orderPaySum ? orderBackDetail.orderPaySum : '--'}</Col>
                </Row>
                <Row>
                  <Col span={12}>欠款金额：{orderBackDetail.owePay ? orderBackDetail.owePay : '--'}</Col>
                  <Col span={12}>回款金额：{orderBackDetail.backPay ? orderBackDetail.backPay : '--'}</Col>
                </Row>
                <Row>
                  <Col span={12}>最后回款金额：{orderBackDetail.backPay ? orderBackDetail.laterBackPay : '--'}</Col>
                  <Col span={12}>最后回款时间：{orderBackDetail.createDate ? orderBackDetail.laterBackDate : '--'}</Col>
                </Row>
                <Row>
                  <Col span={12}>回款次数：{orderBackDetail.backTimes ? orderBackDetail.backTimes : '--'}</Col>
                  <Col span={12}>录入时间：{orderBackDetail.recordDate ? orderBackDetail.recordDate : '--'}</Col>
                </Row>
                <Row>
                  <Col span={12}>修改时间：{orderBackDetail.recordDate ? orderBackDetail.recordDate : '--'}</Col>
                  <Col span={12}>最后成交时间：{orderBackDetail.createDate ? orderBackDetail.createDate : '--'}</Col>
                </Row>
                <Row>
                  <Col span={24} >回款进度：
                  <Progress
                      strokeColor={{
                        '0%': '#108ee9',
                        '100%': '#87d068',
                      }}
                      percent={orderBackDetail.progressRatio * 100}
                      style={{margiTop: 20}}
                    />
                  </Col>
                </Row>
              </div>
            </TabPane>
            <TabPane tab="回款记录" key="2">
              <Table rowKey={record => record.id ? record.id : Math.random()}
                columns={columns}
                dataSource={oneOrderBackList}
                scroll={{ y: 300 }}
                pagination={false}
              />
            </TabPane>
            <TabPane tab="新建回款" key="3">
              <Form id="formBox" style={{ textAlign: 'left' }}>
                <Row>
                  <Col span={12}>
                    <Form.Item label="录入人：">
                      {getFieldDecorator('employeeName', {
                        initialValue: this.props.user_name,
                      })(<Input disabled style={{ maxWidth: 200 }} />)}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="回款时间：">
                      {getFieldDecorator('recordTimeDay', {
                        initialValue: moment(),
                        rules: [{ required: true, message: '请输入回款时间。' }],
                      })(<DatePicker format={yearFormat} />)}
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={12}>
                    <Form.Item label="回款金额：">
                      {getFieldDecorator('laterBackPay', {
                        rules: [{ required: true, message: '请输入回款金额!' }],
                        initialValue: 100,
                      })(<InputNumber min={1} style={{ maxWidth: 200 }} />)}  元
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Form.Item label="备注：">
                    {getFieldDecorator('remark', {
                      initialValue: "",
                    })(<TextArea rows={4} />)}
                  </Form.Item>
                </Row>
                <Button type="primary" htmlType="submit" form="formBox" onClick={this.handleEditBox}>提交</Button>
              </Form>
            </TabPane>
          </Tabs>
        </div>
      </Modal>
    );
  }
}

const wrapAddOrderBackModal = Form.create()(AddOrderBackModal);

export default wrapAddOrderBackModal;