import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Breadcrumb, Card, Select, Timeline, Icon, Row, Col, Button, Table, Modal, Tabs } from 'antd';
const { Option } = Select;
const { TabPane } = Tabs;
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
  newCompanyNum: state.workspace.newCompanyNum,
  newResourceNum: state.workspace.newResourceNum,
  newResourceList: state.workspace.newResourceList,
  newCompanyList: state.workspace.newCompanyList,

  recordFirmsList: state.workspace.recordFirmsList,
  recordClentsList: state.workspace.recordClentsList,
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
  payBackSumList: state.workspace.payBackSumList,

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
  handleGetNewResource = () => {
    const clientColumns = [
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
        width: 150,
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
      // {
      //   width: 100,
      //   title: '状态',
      //   dataIndex: 'status',
      //   render: text => {
      //     if (text === 1) {
      //       return (<span>潜在</span>)
      //     } else if (text === 2) {
      //       return (<span>意向</span>)
      //     } else if (text === 3) {
      //       return (<span>成交</span>)
      //     } else if (text === 4) {
      //       return (<span>失败</span>)
      //     } else if (text === 5) {
      //       return (<span>已流失</span>)
      //     }
      //   }
      // },
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
        width: 150,
        title: '经办人',
        dataIndex: 'employeeName',
        render: text => <span>{text ? text : '--'}</span>,
      }
    ];

    Modal.success({
      title: '新增个人客户',
      icon: <Icon type="smile" theme="twoTone" />,
      width: "80%",
      content:
        <Table size="small" rowKey={record => record.orderId ? record.orderId : Math.random()}
          columns={clientColumns}
          scroll={{ x: 1800 }}
          dataSource={this.props.newResourceList}
          pagination={false}
        />
    });
  }

  handleGetNewCompany = () => {
    const firmColumns = [
      {
        width: 120,
        title: '公司名称',
        dataIndex: 'firmName',
        key: 'firmName',
        fixed: 'left',
        render: text => <span>{text ? text : '--'}</span>,
      },
      {
        width: 100,
        title: '类别',
        dataIndex: 'category',
        render: text => {
          if (text === 1) {
            return (<span>建筑业</span>)
          } else if (text === 2) {
            return (<span>农林牧渔</span>)
          } else if (text === 3) {
            return (<span>住宿餐饮</span>)
          } else if (text === 4) {
            return (<span>IT</span>)
          } else if (text === 5) {
            return (<span>金融业</span>)
          } else if (text === 6) {
            return (<span>房地产</span>)
          } else if (text === 7) {
            return (<span>政府机关</span>)
          } else if (text === 8) {
            return (<span>文体传媒</span>)
          } else if (text === 9) {
            return (<span>运输物流</span>)
          } else if (text === 10) {
            return (<span>商业服务</span>)
          } else if (text === 11) {
            return (<span>卫生医疗</span>)
          } else if (text === 12) {
            return (<span>教育培训</span>)
          } else if (text === 13) {
            return (<span>其他</span>)
          }
        }
      },
      {
        width: 150,
        title: '省份',
        dataIndex: 'province',
        key: 'province',
        render: text => <span>{text ? text : '--'}</span>,
      },
      {
        // width: 200,
        title: '备注',
        dataIndex: 'remark',
        key: 'remark',
        render: text => <span>{text ? text : '--'}</span>,
      },
      // {
      //   width: 100,
      //   title: '状态',
      //   dataIndex: 'status',
      //   render: text => {
      //     if (text === 1) {
      //       return (<span>潜在</span>)
      //     } else if (text === 2) {
      //       return (<span>意向</span>)
      //     } else if (text === 3) {
      //       return (<span>成交</span>)
      //     } else if (text === 4) {
      //       return (<span>失败</span>)
      //     } else if (text === 5) {
      //       return (<span>已流失</span>)
      //     }
      //   }
      // },
      {
        width: 150,
        title: '到期时间',
        dataIndex: 'expireDate',
        render: text => <span>{text ? moment(text).format(yearFormat) : '--'}</span>,
      },
      {
        width: 100,
        title: '联系人',
        dataIndex: 'contact',
        key: 'contact',
        render: text => <span>{text ? text : '--'}</span>,
      },
      {
        width: 100,
        title: '职务',
        dataIndex: 'position',
        render: text => <span>{text ? text : '--'}</span>,
      },
      {
        width: 100,
        title: '性别',
        dataIndex: 'gender',
        render: text => <span>{text === 1 ? '女' : '男'}</span>
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
        title: '经办人',
        dataIndex: 'employeeName',
        render: text => <span>{text ? text : '--'}</span>,
      }
    ];
    Modal.success({
      title: '新增企业客户',
      icon: <Icon type="smile" theme="twoTone" />,
      width: "80%",
      content:
        <Table size="small" rowKey={record => record.orderId ? record.orderId : Math.random()}
          columns={firmColumns}
          scroll={{ x: 1800 }}
          dataSource={this.props.newCompanyList}
          pagination={false}
        />
    });
  }
  handleFollowRecords = () => {
    Modal.success({
      title: '联系跟进次数',
      icon: <Icon type="smile" theme="twoTone" />,
      width: "80%",
      content: <Tabs defaultActiveKey="1">
        <TabPane tab="人才跟进" key="1">
          <Timeline style={{ maxHeight: '500px', overflowY: 'scroll', padding: '10px 0' }}>
            {this.props.recordClentsList ? this.props.recordClentsList.map(item =>
              <Timeline.Item key={`hd-${item.key ? item.key : Math.random()}`}>
                {item.createDate} {item.resourceName ? `${item.resourceName} ---` : null} {item.content ? `${item.content} ---` : null}  --- {item.employeeName}
              </Timeline.Item>) :
              "NO DATA"}
          </Timeline>
        </TabPane>
        <TabPane tab="企业跟进" key="2">
          <Timeline style={{ maxHeight: '500px', overflowY: 'scroll', padding: '10px 0' }}>
            {this.props.recordFirmsList ? this.props.recordFirmsList.map(item =>
              <Timeline.Item key={`hd-${item.key ? item.key : Math.random()}`}>
                {item.createDate} {item.resourceName ? `${item.resourceName} ---` : null} {item.content ? `${item.content} ---` : null}  --- {item.employeeName}
              </Timeline.Item>) :
              "NO DATA"}
          </Timeline>
        </TabPane>
      </Tabs>
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

    Modal.success({
      title: '成交总额',
      icon: <Icon type="smile" theme="twoTone" />,
      width: "80%",
      content: <Tabs defaultActiveKey="1">
        <TabPane tab="人才订单" key="1">
          <Table size="small" rowKey={record => record.orderId ? record.orderId : Math.random()}
            columns={clientOrderColumns}
            dataSource={this.props.orderPayClientsList}
            pagination={false}
          />
        </TabPane>
        <TabPane tab="企业订单" key="2">
          <Table size="small" rowKey={record => record.orderId ? record.orderId : Math.random()}
            columns={firmOrderColumns}
            dataSource={this.props.orderPayFirmsList}
            pagination={false}
          />
        </TabPane>
      </Tabs>
    });
  }

  handleResourceBusinessAmounts = () => {
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
        render: text => {
          if (text) {
            const temp = text.map(e => {
              return <Button>{e.resourceName}</Button>
            });
            return temp;
          } else {
            return '--'
          }
        },
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
      title: '个人成交单数',
      icon: <Icon type="smile" theme="twoTone" />,
      width: "80%",
      content:
        <Table size="small" rowKey={record => record.orderId ? record.orderId : Math.random()}
          columns={clientOrderColumns}
          dataSource={this.props.orderClientsList}
          pagination={false}
        />
    });
  }

  handleCompanyBusinessAmounts = () => {
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
        render: text => {
          if (text) {
            const temp = text.map(e => {
              return <Button>{e.resourceName}</Button>
            });
            return temp;
          } else {
            return '--'
          }
        },
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
      title: '企业成交单数',
      icon: <Icon type="smile" theme="twoTone" />,
      width: "80%",
      content:
        <Table size="small" rowKey={record => record.orderId ? record.orderId : Math.random()}
          columns={firmOrderColumns}
          dataSource={this.props.orderFirmsList}
          pagination={false}
        />
    });
  }
  handlePaybackAmouts = () => {
    const columns = [{
      width: 280,
      title: '订单编号',
      dataIndex: 'businessId',
      key: 'businessId',
      render: text => <span>{text ? text : '--'}</span>,
    }, {
      width: 140,
      title: '企业名称',
      dataIndex: 'companyName',
      key: 'companyName',
      render: text => <span>{text ? text : '--'}</span>,
    }, {
      width: 180,
      title: '回款金额（元）',
      dataIndex: 'backPay',
      key: 'backPay',
      render: text => <span>{text ? text : '--'}</span>,
    }, {
      width: 120,
      title: '负责人',
      dataIndex: 'employeeName',
      key: 'employeeName',
      render: text => <span>{text ? text : '--'}</span>,
    }
    ];
    Modal.success({
      title: '回款总额',
      icon: <Icon type="smile" theme="twoTone" />,
      width: "80%",
      content: (<div>
        <Table size="small" rowKey={record => record.orderId ? record.orderId : Math.random()}
          columns={columns}
          dataSource={this.props.payBackSumList}
          pagination={false}
        // scroll={{ y: 600, x: false }}
        />
      </div>)
    });
  }

  handleOwePaybackAmouts = () => {
    const columns = [{
      width: 280,
      title: '订单编号',
      dataIndex: 'businessId',
      key: 'businessId',
      render: text => <span>{text ? text : '--'}</span>,
    }, {
      width: 140,
      title: '企业名称',
      dataIndex: 'companyName',
      key: 'companyName',
      render: text => <span>{text ? text : '--'}</span>,
    }, {
      width: 180,
      title: '欠款金额（元）',
      dataIndex: 'owePay',
      key: 'owePay',
      render: text => <span>{text ? text : '--'}</span>,
    }, {
      width: 120,
      title: '负责人',
      dataIndex: 'employeeName',
      key: 'employeeName',
      render: text => <span>{text ? text : '--'}</span>,
    }
    ];
    Modal.success({
      title: '欠款总额',
      icon: <Icon type="smile" theme="twoTone" />,
      width: "80%",
      content: (<div>
        <Table size="small" rowKey={record => record.orderId ? record.orderId : Math.random()}
          columns={columns}
          dataSource={this.props.ownPayList}
          pagination={false}
        // scroll={{ y: 600, x: false }}
        />
      </div>)
    });
  }

  render() {
    const { newResourceNum, newCompanyNum, orderPayClientsSum, orderPayFirmsSum, orderFirmsSum, orderClientsSum, orderPaySum, payBackSum, ownPaySum } = this.props;
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
                  <span>个人：<p onClick={this.handleGetNewResource} style={{ display: 'inline-block' }}>{newResourceNum}</p></span>
                  <span style={{ marginLeft: 20 }}>企业：<p onClick={this.handleGetNewCompany} style={{ display: 'inline-block' }}>{newCompanyNum}</p></span>
                  <div className="bannar-box">
                    <Icon type="usergroup-add" /><span> 新增客户数</span>
                  </div>
                </Card>
              </Col>
              <Col span={8}>
                {/* <Card style={{ width: 300 }}>
                  <p onClick={this.handleFollowRecords}>{recordNum}</p>
                  <div className="bannar-box">
                    <Icon type="solution" /><span> 联系跟进次数</span>
                  </div>
                </Card> */}
                <Card style={{ width: 300 }}>
                  <span>个人：<p onClick={this.handleResourceBusinessAmounts} style={{ display: 'inline-block' }}>{orderClientsSum}</p></span>
                  <span style={{ marginLeft: 20 }}>企业：<p onClick={this.handleCompanyBusinessAmounts} style={{ display: 'inline-block' }}>{orderFirmsSum}</p></span>
                  <div className="bannar-box">
                    <Icon type="file-protect" /><span> 成交单数</span>
                  </div>
                </Card>
              </Col>
              {/* <Col span={8}>
                <Card style={{ width: 300 }}>
                  <p onClick={this.handleBusinessOrderPaySum}>{orderPaySum}</p>
                  <div className="bannar-box">
                    <Icon type="pay-circle" /><span> 成交总额</span>
                  </div>
                </Card>
              </Col> */}
            </Row>
            <Row style={{ paddingTop: 30 }}>
              <Col span={8}>
                <Card style={{ width: 300 }}>
                  <p onClick={this.handleBusinessOrderPaySum}>{orderPaySum}</p>
                  <div className="bannar-box">
                    <Icon type="pay-circle" /><span> 成交总额</span>
                  </div>
                </Card>
              </Col>
              <Col span={8}>
                <Card style={{ width: 300 }}>
                  <p onClick={this.handlePaybackAmouts}>{payBackSum}</p>
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
