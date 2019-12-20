import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Breadcrumb, Card, Select, Button, Icon, Row, Col, DatePicker, Menu, Dropdown } from 'antd';
const { MonthPicker, RangePicker } = DatePicker;
const { Option } = Select;
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
import _ from 'lodash';
import moment from 'moment';
import { hourFormat, yearFormat, yearAndHourFormat } from '../../constants';
import './style.scss';
import { getGrossStatus } from '../../actions/workspace';
import { getEmployeeList } from '../../actions/api';
const mapStateToProps = state => ({
  user_role: state.sessions.user_role,
  user_Id: state.sessions.user_Id,
  newResourceNum: state.workspace.newResourceNum,
  recordNum: state.workspace.recordNum,
  orderSum: state.workspace.orderSum,
  orderPaySum: state.workspace.orderPaySum,
  payBackSum: state.workspace.payBackSum,
  ownPaySum: state.workspace.ownPaySum,
  employeeList: state.sessions.employeeList
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
    searchStartData: moment().month(moment().month() - 1).startOf('month'),
    searchEndData: moment().month(moment().month() - 1).endOf('month'),
    searchDate: 5,
    searchEmployeeId: 'all',
    user_role: JSON.parse(localStorage.getItem("user")).user_role,
    user_Id: JSON.parse(localStorage.getItem("user")).user_Id
  }
  componentWillMount() {
    this.onInit();
  }
  onInit = () => {
    console.log(this.state.user_role );
    if(this.state.user_role === "2"){
      this.props.getEmployeeList();
    }
    this.setState({
      searchEmployeeId: this.state.user_role === "2" ? 'all' :  this.state.user_Id,
    })
    this.props.getGrossStatus({
      searchStartData: this.state.searchStartData.format(yearAndHourFormat),
      searchEndData: this.state.searchEndData.format(yearAndHourFormat),
      employeeId: this.state.user_role === "2" ? 'all' :  this.state.user_Id,
    });
  }

  handleCheckSearch = (value) => {
    let startDate , endDate ;
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
      searchStartData: startDate,
      searchEndData: endDate,
    });
    this.props.getGrossStatus({
      searchStartData: startDate.format(yearAndHourFormat),
      searchEndData: endDate.format(yearAndHourFormat),
      employeeId: this.state.searchEmployeeId
    });
  }
  handleCheckEmployee = (value) => {
    this.setState({ searchEmployee: value });
    this.props.getGrossStatus({
      searchStartData: this.state.searchStartData.format(yearAndHourFormat),
      searchEndData: this.state.searchEndData.format(yearAndHourFormat),
      employeeId: value
    });
  }
  render() {
    const { newResourceNum, recordNum, orderSum, orderPaySum, payBackSum, ownPaySum } = this.props;
    const  employeeList = [{
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
          <Select defaultValue={this.state.searchDate} style={{ width: 120, margin: '0 10px 0 0'}} onChange={this.handleCheckSearch}>
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
                  <p>{newResourceNum}</p>
                  <div className="bannar-box">
                    <Icon type="usergroup-add" /><span> 新增客户数</span>
                  </div>
                </Card>
              </Col>
              <Col span={8}>
                <Card style={{ width: 300 }}>
                  <p>{recordNum}</p>
                  <div className="bannar-box">
                    <Icon type="solution" /><span> 联系跟进次数</span>
                  </div>
                </Card>
              </Col>
              <Col span={8}>
                <Card style={{ width: 300 }}>
                  <p>{orderPaySum}</p>
                  <div className="bannar-box">
                    <Icon type="pay-circle" /><span> 成交总额</span>
                  </div>
                </Card>
              </Col>
            </Row>
            <Row style={{ paddingTop: 30 }}>
              <Col span={8}>
                <Card style={{ width: 300 }}>
                  <p>{orderSum}</p>
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
                  <p>{ownPaySum}</p>
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
