import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Breadcrumb, Card, Select, Timeline, Icon, Row, Col, DatePicker, Table, Modal } from 'antd';
const { MonthPicker, RangePicker } = DatePicker;
const { Option } = Select;
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
import _ from 'lodash';
import moment from 'moment';
import { hourFormat, yearFormat, yearAndHourFormat } from '../../constants';
import { getDateRange } from '../../actions/base';
import './style.scss';
import { getGrossStatus } from '../../actions/workspace';
import { getEmployeeList } from '../../actions/api';

const mapStateToProps = state => ({
  user_role: state.sessions.user_role,
  user_Id: state.sessions.user_Id,
  employeeList: state.sessions.employeeList,
  newResourceNum: state.workspace.newResourceNum,
  newResourceList: state.workspace.newResourceList,

  recordList: state.workspace.recordList,
  recordNum: state.workspace.recordNum,

  orderSum: state.workspace.orderSum,
  orderClientsSum: state.workspace.orderClientsSum,
  orderFirmsSum: state.workspace.orderFirmsSum,
  orderClientsList: state.workspace.orderClientsList,
  orderFirmsList: state.workspace.orderFirmsList,

  orderPaySum: state.workspace.orderPaySum,
  orderPayClientsSum: state.workspace.orderPayClientsSum,
  orderPayFirmsSum: state.workspace.orderPayFirmsSum,
  orderPayClientsList: state.workspace.orderPayClientsList,
  orderPayFirmsList: state.workspace.orderPayFirmsList,

  payBackSum: state.workspace.payBackSum,

  ownPaySum: state.workspace.ownPaySum,
  ownPayList: state.workspace.ownPayList,
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    getGrossStatus,
    getEmployeeList,
  },
  dispatch
);

@connect(mapStateToProps, mapDispatchToProps)
export default class SalaryTable extends Component {
  state = {
    tempData: null,
    searchStartDate: moment().startOf('month'),
    searchEndDate: moment().endOf('month'),
    searchDate: 5,
    searchEmployeeId: 'all',
    user_role: JSON.parse(localStorage.getItem("user")).user_role,
    user_Id: JSON.parse(localStorage.getItem("user")).user_Id,
    visible: false,
  }
  componentWillMount() {
    this.onInit();
  }
  onInit = () => {
    console.log(this.state.user_role);
    if (this.state.user_role === "2") {
      this.props.getEmployeeList();
    }
    this.setState({
      searchEmployeeId: this.state.user_role === "2" ? 'all' : this.state.user_Id,
    })
    this.props.getGrossStatus({
      searchStartDate: this.state.searchStartDate.format(yearAndHourFormat),
      searchEndDate: this.state.searchEndDate.format(yearAndHourFormat),
      employeeId: this.state.user_role === "2" ? 'all' : this.state.user_Id,
    });
  }

  handleCheckSearch = (value) => {
    let startDate, endDate;
    if (value === 1) {//今天
      startDate = moment().startOf('day');
      endDate = moment().endOf('day');
    } else if (value === 2) {//昨天
      startDate = moment().subtract(1, 'days').startOf('day');
      endDate = moment().subtract(1, 'days').endOf('day');
    } else if (value === 3) { //本周
      startDate = moment().startOf('week');
      endDate = moment().endOf('week');
    } else if (value === 4) { //上周
      startDate = moment().week(moment().week() - 1).startOf('week');
      endDate = moment().week(moment().week() - 1).endOf('week');
    } else if (value === 5) { //本月
      startDate = moment().startOf('month');
      endDate = moment().endOf('month');
    } else if (value === 6) { //上月
      startDate = moment().month(moment().month() - 1).startOf('month');
      endDate = moment().month(moment().month() - 1).endOf('month');
    } else if (value === 7) { //本季度
      startDate = moment().startOf('quarter');
      endDate = moment().endOf('quarter');
    } else if (value === 8) { //上季度
      startDate = moment().quarter(moment().quarter() - 1).startOf('quarter');
      endDate = moment().quarter(moment().quarter() - 1).endOf('quarter');
    } else if (value === 9) { //本年度
      startDate = moment().startOf('year');
      endDate = moment().endOf('year');
    } else if (value === 10) { //上年度
      startDate = moment().year(moment().year() - 1).startOf('year');
      endDate = moment().year(moment().year() - 1).endOf('year');
    } else if (value === 11) { //全部
      startDate = moment().year(moment().year() - 20).startOf('year');
      endDate = moment().endOf('day');
    }
    this.setState({
      searchStartDate: startDate,
      searchEndDate: endDate,
    });
    this.props.getGrossStatus({
      searchStartDate: startDate.format(yearAndHourFormat),
      searchEndDate: endDate.format(yearAndHourFormat),
      employeeId: this.state.searchEmployeeId
    });
  }
  handleCheckEmployee = (value) => {
    this.setState({ searchEmployee: value });
    this.props.getGrossStatus({
      searchStartDate: this.state.searchStartDate.format(yearAndHourFormat),
      searchEndDate: this.state.searchEndDate.format(yearAndHourFormat),
      employeeId: value
    });
  }
  handleGetNewClients = () => {
    const columns = [
      {
        width: 120,
        title: '客户名称',
        dataIndex: 'clientName',
        key: 'clientName',
        fixed: 'left',
        render: text => <span>{text ? text : '--'}</span>,
      },
      {
        width: 200,
        title: '证书及专业',
        dataIndex: 'certificate',
        key: 'certificate',
        render: text => <span>{text ? text : '--'}</span>,
      },
      {
        title: '备注',
        dataIndex: 'remark',
        key: 'remark',
        render: text => <span>{text ? text : '--'}</span>,
      },
      {
        width: 100,
        title: '省份',
        dataIndex: 'province',
        key: 'province',
        render: text => <span>{text ? text : '--'}</span>,
      },
      {
        width: 100,
        title: '性别',
        dataIndex: 'gender',
        render: text => <span>{text === 1 ? '女' : '男'}</span>
      },
      {
        width: 100,
        title: '状态',
        dataIndex: 'status',
        render: text => {
          if (text === 1) {
            return (<span>潜在</span>)
          } else if (text === 2) {
            return (<span>意向</span>)
          } else if (text === 3) {
            return (<span>成交</span>)
          } else if (text === 4) {
            return (<span>失败</span>)
          } else if (text === 5) {
            return (<span>已流失</span>)
          }
        }
      },
      {
        width: 200,
        title: '邮箱',
        dataIndex: 'email',
        render: text => <span>{text ? text : '--'}</span>,
      },
      {
        width: 150,
        title: '电话',
        dataIndex: 'tel',
        render: text => <span>{text ? text : '--'}</span>,
      },
      {
        width: 150,
        title: '获得客户时间',
        dataIndex: 'createDate',
        render: text => <span>{text ? moment(text).format(yearFormat) : '--'}</span>,
      },
      {
        width: 150,
        title: '到期时间',
        dataIndex: 'expireDate',
        render: text => <span>{text ? moment(text).format(yearFormat) : '--'}</span>,
      },
      {
        width: 100,
        title: '经办人',
        dataIndex: 'employeeName',
        render: text => <span>{text ? text : '--'}</span>,
      }
    ];
    Modal.success({
      title: '新增客户',
      icon: <Icon type="smile" theme="twoTone" />,
      width: "80%",
      content: <Table rowKey={record => record.clientId}
        className="ModalBox"
        columns={columns}
        dataSource={this.props.newResourceList}
        scroll={{ x: 1500 }}
        pagination={false}
      />,
    });
  }

  handleFollowRecords = () => {
    Modal.success({
      title: '联系跟进次数',
      icon: <Icon type="smile" theme="twoTone" />,
      width: "80%",
      content:
        <Timeline style={{ maxHeight: '500px', overflowY: 'scroll' , padding: '10px 0' }}>
          {this.props.recordList ? this.props.recordList.map(item =>
            <Timeline.Item key={`hd-${item.key ? item.key : Math.random()}`}>
             {item.createDate} {item.resourceName? `${item.resourceName} ---` : null} {item.content? `${item.content} ---` : null}  --- {item.employeeName}
            </Timeline.Item>) :
            "NO DATA"}
        </Timeline>,
    });
  }

  handleBusinessOrderPaySum = () => {
    const clientOrderColumns = [
      {
        width: 120,
        title: '客户名称',
        dataIndex: 'clientName',
        key: 'clientName',
        render: text => <span>{text ? text : '--'}</span>,
      },
      {
        width: 200,
        title: '企业名称',
        dataIndex: 'firmName',
        key: 'firmName',
        render: text => <span>{text ? text : '--'}</span>,
      },
      {
        width: 100,
        title: '成交总额',
        dataIndex: 'orderPaySum',
        key: 'orderPaySum',
        render: text => <span>{text ? text : '--'}</span>,
      },
      {
        // width: 200,
        title: '备注',
        dataIndex: 'remark',
        key: 'remark',
        render: text => <span>{text ? text : '--'}</span>,
      },
      {
        width: 150,
        title: '成交时间',
        dataIndex: 'createDate',
        filterMultiple: false,
        sorter: (a, b) => a.createDate - b.createDate,
        sortDirections: ['descend', 'ascend'],
        render: text => <span>{text ? moment(text).format(yearFormat) : '--'}</span>,
      },
      {
        width: 100,
        title: '经办人',
        dataIndex: 'employeeName',
        render: text => <span>{text ? text : '--'}</span>,
      }
    ];

    const firmOrderColumns = [
      {
        width: 200,
        title: '企业名称',
        dataIndex: 'firmName',
        key: 'firmName',
        render: text => <span>{text ? text : '--'}</span>,
      },
      {
        width: 120,
        title: '客户名称',
        dataIndex: 'clientLists',
        key: 'clientLists',
        render: text => <span>{text ? text : '--'}</span>,
      },
      {
        width: 100,
        title: '成交总额',
        dataIndex: 'orderPaySum',
        key: 'orderPaySum',
        render: text => <span>{text ? text : '--'}</span>,
      },
      {
        // width: 200,
        title: '备注',
        dataIndex: 'remark',
        key: 'remark',
        render: text => <span>{text ? text : '--'}</span>,
      },
      {
        width: 150,
        title: '成交时间',
        dataIndex: 'createDate',
        render: text => <span>{text ? moment(text).format(yearFormat) : '--'}</span>,
      },
      {
        width: 100,
        title: '经办人',
        dataIndex: 'employeeName',
        render: text => <span>{text ? text : '--'}</span>,
      },
    ];
    Modal.success({
      title: '成交总额',
      icon: <Icon type="smile" theme="twoTone" />,
      width: "80%",
      content: (<div>
        <hr/>
        <b style={{ padding: '10px' }}>企业订单：</b>
        <Table rowKey={record => record.orderId ? record.orderId : Math.random()}
          columns={clientOrderColumns}
          dataSource={this.props.orderPayClientsList}
          pagination={false}
        />
        <hr/>
        <b style={{ padding: '10px' }}>人才订单：</b>
        <Table rowKey={record => record.orderId ? record.orderId : Math.random()}
          columns={firmOrderColumns}
          dataSource={this.props.orderPayFirmsList}
          pagination={false}
        />
      </div>)
    });
  }

  handleBusinessAmounts = () => {
    const clientOrderColumns = [
      {
        width: 120,
        title: '客户名称',
        dataIndex: 'clientName',
        key: 'clientName',
        render: text => <span>{text ? text : '--'}</span>,
      },
      {
        width: 200,
        title: '企业名称',
        dataIndex: 'firmName',
        key: 'firmName',
        render: text => <span>{text ? text : '--'}</span>,
      },
      {
        width: 100,
        title: '成交总额',
        dataIndex: 'orderPaySum',
        key: 'orderPaySum',
        render: text => <span>{text ? text : '--'}</span>,
      },
      {
        // width: 200,
        title: '备注',
        dataIndex: 'remark',
        key: 'remark',
        render: text => <span>{text ? text : '--'}</span>,
      },
      {
        width: 150,
        title: '成交时间',
        dataIndex: 'createDate',
        filterMultiple: false,
        sorter: (a, b) => a.createDate - b.createDate,
        sortDirections: ['descend', 'ascend'],
        render: text => <span>{text ? moment(text).format(yearFormat) : '--'}</span>,
      },
      {
        width: 100,
        title: '经办人',
        dataIndex: 'employeeName',
        render: text => <span>{text ? text : '--'}</span>,
      }
    ];

    const firmOrderColumns = [
      {
        width: 200,
        title: '企业名称',
        dataIndex: 'firmName',
        key: 'firmName',
        render: text => <span>{text ? text : '--'}</span>,
      },
      {
        width: 120,
        title: '客户名称',
        dataIndex: 'clientLists',
        key: 'clientLists',
        render: text => <span>{text ? text : '--'}</span>,
      },
      {
        width: 100,
        title: '成交总额',
        dataIndex: 'orderPaySum',
        key: 'orderPaySum',
        render: text => <span>{text ? text : '--'}</span>,
      },
      {
        // width: 200,
        title: '备注',
        dataIndex: 'remark',
        key: 'remark',
        render: text => <span>{text ? text : '--'}</span>,
      },
      {
        width: 150,
        title: '成交时间',
        dataIndex: 'createDate',
        render: text => <span>{text ? moment(text).format(yearFormat) : '--'}</span>,
      },
      {
        width: 100,
        title: '经办人',
        dataIndex: 'employeeName',
        render: text => <span>{text ? text : '--'}</span>,
      },
    ];
    Modal.success({
      title: '成交单数',
      icon: <Icon type="smile" theme="twoTone" />,
      width: "80%",
      content: (<div>
        <hr/>
        <b style={{ padding: '10px' }}>企业订单：</b>
        <Table rowKey={record => record.orderId ? record.orderId : Math.random()}
          columns={clientOrderColumns}
          dataSource={this.props.orderClientsList}
          pagination={false}
        />
        <hr/>
        <b style={{ padding: '10px' }}>人才订单：</b>
        <Table rowKey={record => record.orderId ? record.orderId : Math.random()}
          columns={firmOrderColumns}
          dataSource={this.props.orderFirmsList}
          pagination={false}
        />
      </div>)
    });
  }

  handleOwePaybackAmouts = () => {
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
    Modal.success({
      title: '欠款总额',
      icon: <Icon type="smile" theme="twoTone" />,
      width: "80%",
      content: (<div>
        <Table rowKey={record => record.orderId ? record.orderId : Math.random()}
          columns={columns}
          dataSource={this.props.ownPayList}
          pagination={false}
        />
      </div>)
    });
  }

  render() {
    const { newResourceNum, recordNum, orderSum, orderPaySum, payBackSum, ownPaySum } = this.props;
    const employeeList = [{
      employeeId: 'all',
      employeeName: '全部'
    }, ...this.props.employeeList]
    return (
      <div className="container">
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>汇总简报</Breadcrumb.Item>
        </Breadcrumb>

        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
          我的简报：
          <Select defaultValue={this.state.searchDate} style={{ width: 120, margin: '0 10px 0 0' }} onChange={this.handleCheckSearch}>
            <Option value={1}>今天</Option>
            <Option value={2}>昨天</Option>
            <Option value={3}>本周</Option>
            <Option value={4}>上周</Option>
            <Option value={5}>本月</Option>
            <Option value={6}>上月</Option>
            <Option value={7}>本季度</Option>
            <Option value={8}>上季度</Option>
            <Option value={9}>本年度</Option>
            <Option value={10}>上年度</Option>
            <Option value={11}>全部</Option>
          </Select>
          {this.state.user_role === '2' ?
            <span>选择员工：
          <Select style={{ width: 120 }} defaultValue={this.state.searchEmployeeId} onChange={this.handleCheckEmployee}>
                {employeeList.map((item) =>
                  <Option key={item.employeeId}>
                    {item.employeeName}
                  </Option>
                )}
              </Select></span>
            :
            null}
          <hr />
          <div className="card-box">
            <Row style={{ paddingTop: 30 }}>
              <Col span={8}>
                <Card style={{ width: 300 }}>
                  <p onClick={this.handleGetNewClients}>{newResourceNum}</p>
                  <div className="bannar-box">
                    <Icon type="usergroup-add" /><span> 新增客户数</span>
                  </div>
                </Card>
              </Col>
              <Col span={8}>
                <Card style={{ width: 300 }}>
                  <p onClick={this.handleFollowRecords}>{recordNum}</p>
                  <div className="bannar-box">
                    <Icon type="solution" /><span> 联系跟进次数</span>
                  </div>
                </Card>
              </Col>
              <Col span={8}>
                <Card style={{ width: 300 }}>
                  <p onClick={this.handleBusinessOrderPaySum}>{orderPaySum}</p>
                  <div className="bannar-box">
                    <Icon type="pay-circle" /><span> 成交总额</span>
                  </div>
                </Card>
              </Col>
            </Row>
            <Row style={{ paddingTop: 30 }}>
              <Col span={8}>
                <Card style={{ width: 300 }}>
                  <p onClick={this.handleBusinessAmounts}>{orderSum}</p>
                  <div className="bannar-box">
                    <Icon type="file-protect" /><span> 成交单数</span>
                  </div>
                </Card>
              </Col>
              <Col span={8}>
                <Card style={{ width: 300 }}>
                  <p>{payBackSum}</p>
                  <div className="bannar-box">
                    <Icon type="wallet" /><span> 回款总额</span>
                  </div>
                </Card>
              </Col>
              <Col span={8}>
                <Card style={{ width: 300 }}>
                  <p onClick={this.handleOwePaybackAmouts}>{ownPaySum}</p>
                  <div className="bannar-box">
                    <Icon type="exclamation-circle" /><span> 欠款</span>
                  </div>
                </Card>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    );
  }
}
