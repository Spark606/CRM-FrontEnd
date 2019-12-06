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
    editBox: false,
    recorderDate: "",
    recorderHour: ""
  };
  componentWillMount(){
    console.log(this.props.dataSource);
    // this.props.getOrderBackDetail({
      // businessId: this.props.dataSource.orderId
    // });
    this.props.getOrderBackList({
      // orderId: record.orderId,
      page: 1,
      pageSize: 1000
    });
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  handleCancel = e => {
    this.setState({
      visible: false,
      editBox: false,
    });
  };
  handleOk = () => {
    this.setState({
      visible: false,
    });
  }
  handleEditBox = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      const data = Object.assign({}, {
        createDate: moment(values.recordTimeDay).format(yearFormat),
        recordDate: moment().format(yearFormat),
        businessId: this.props.dataSource.orderId,
        employeeId: this.props.dataSource.employeeId,
        backPay: values.backPay,
        info: values.remark,
        businessType: this.props.orderType
      });
      this.props.addNewOrderBack(data);
    });
    this.setState({
      editBox: false,
    });
  }
  render() {
    const { editBox } = this.state;
    const { oneOrderBackList, dataSource } = this.props;
    const { getFieldDecorator } = this.props.form;
    const columns = [{
      width: 150,
      title: '回款时间',
      dataIndex: 'laterBackDate',
      key: 'laterBackDate',
      fixed: 'left',
      render: text => <span>{text ? text : '--'}</span>,
    }, {
      width: 120,
      title: '回款金额（元）',
      dataIndex: 'backPay',
      key: 'backPay',
      fixed: 'left',
      render: text => <span>{text ? text : '--'}</span>,
    }, {
      width: 200,
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
      fixed: 'left',
      render: text => <span>{text ? text : '--'}</span>,
    }, {
      width: 120,
      title: '录入人',
      dataIndex: 'clientName',
      key: 'clientName',
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
    const _dataSource = [{
      laterBackDate: '2018-12-11',
      backPay: '123',
      remark: 'xxx',
      clientName: '李真1',
      recordDate: '2018-12-11',
    }, {
      laterBackDate: '2018-12-11',
      backPay: '123',
      remark: 'xxx',
      clientName: '李真2',
      recordDate: '2018-12-11',
    }, {
      laterBackDate: '2018-12-11',
      backPay: '123',
      remark: 'xxx',
      clientName: '李真3',
      recordDate: '2018-12-11',
    }, {
      laterBackDate: '2018-12-11',
      backPay: '123',
      remark: 'xxx',
      clientName: '李真4',
      recordDate: '2018-12-11',
    }, {
      laterBackDate: '2018-12-11',
      backPay: '123',
      remark: 'xxx',
      clientName: '李真5',
      recordDate: '2018-12-11',
    }, {
      laterBackDate: '2018-12-11',
      backPay: '123',
      remark: 'xxx',
      clientName: '李真6',
      recordDate: '2018-12-11',
    }, {
      laterBackDate: '2018-12-11',
      backPay: '123',
      remark: 'xxx',
      clientName: '李真7',
      recordDate: '2018-12-11',
    }, {
      laterBackDate: '2018-12-11',
      backPay: '123',
      remark: 'xxx',
      clientName: '李真8',
      recordDate: '2018-12-11',
    }];
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
          <Tabs defaultActiveKey="1">
            <TabPane tab="订单详情" key="1">
              <div className="orderDetilBox">
                <Row>
                  <Col span={12}>编号：{}</Col>
                  <Col span={12}>成交总额：{}</Col>
                </Row>
                <Row>
                  <Col span={12}>欠款金额：</Col>
                  <Col span={12}>回款金额：</Col>
                </Row>
                <Row>
                  <Col span={12}>最后回款金额：</Col>
                  <Col span={12}>最后回款时间：</Col>
                </Row>
                <Row>
                  <Col span={12}>回款次数：</Col>
                  <Col span={12}>录入时间：</Col>
                </Row>
                <Row>
                  <Col span={12}>修改时间：</Col>
                  <Col span={12}>最后成交时间：</Col>
                </Row>
                <Row>
                  <Col span={24}>回款进度：
                  <Progress
                      strokeColor={{
                        '0%': '#108ee9',
                        '100%': '#87d068',
                      }}
                      percent={99.9}
                    />
                  </Col>
                </Row>
              </div>
            </TabPane>
            <TabPane tab="回款记录" key="2">
              <Table rowKey={record => record.orderId ? record.orderId : Math.random()}
                columns={columns}
                dataSource={_dataSource}
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
                        initialValue: 'Liz',
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
                      {getFieldDecorator('backPay', {
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
                    })(<TextArea placeholder="textarea with clear icon" rows={4} />)}
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