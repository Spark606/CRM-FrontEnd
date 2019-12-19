import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Breadcrumb, Card, Select, Button, Icon, Row, Col, DatePicker } from 'antd';
const { MonthPicker, RangePicker } = DatePicker;
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
import _ from 'lodash';
import moment from 'moment';
import { hourFormat, yearFormat } from '../../constants';
import WrapEditSalaryModal from '../../component/editSalaryModal';
import './style.scss';
import { getEmployeesSalaryList, getSalaryRegulationDetail } from '../../actions/salary';
const mapStateToProps = state => ({
  employeesSalaryList: state.salary.employeesSalaryList,
  currentPage: state.salary.currentPage,
  pageTotal: state.salary.pageTotal,
  pageSize: state.salary.pageSize,
  employeeSalaryRegulation: state.salary.employeeSalaryRegulation
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    getEmployeesSalaryList,
    getSalaryRegulationDetail
  },
  dispatch
);

@connect(mapStateToProps, mapDispatchToProps)
export default class SalaryTable extends Component {
  state = {
    tempData: null,
    searchStartData: moment(),
    searchEndData: moment()
  }
  componentWillMount() {
    this.onInit();
  }
  onInit = () => {
    this.props.getEmployeesSalaryList({
      searchStartData: this.state.searchStartData.format("YYYY-MM"),
      searchEndData: this.state.searchEndData.format("YYYY-MM"),
      page: 1,
      pageSize: this.props.pageSize
    });
  }

  handleRangeChange = value => {
    this.setState({ searchStartData: value, searchEndData: value });
    this.props.getEmployeesSalaryList({
      searchStartData: value.format("YYYY-MM"),
      searchEndData: value.format("YYYY-MM"),
      page: 1,
      pageSize: this.props.pageSize
    });
  };

  render() {

    return (
      <div className="container">
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>汇总简报</Breadcrumb.Item>
        </Breadcrumb>

        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
          <MonthPicker defaultValue={this.state.searchStartData}
            format={"YYYY-MM"}
            onChange={this.handleRangeChange} />
          <hr />
          <div className="card-box">
            <Row style={{ paddingTop: 30 }}>
              <Col span={8}>
                <Card style={{ width: 300 }}>
                  <p>{2}</p>
                  <div className="bannar-box">
                    <Icon type="usergroup-add" /><span> 新增客户数</span>
                  </div>
                </Card>
              </Col>
              <Col span={8}>
                <Card style={{ width: 300 }}>
                  <p>{2}</p>
                  <div className="bannar-box">
                    <Icon type="solution" /><span> 联系跟进次数</span>
                  </div>
                </Card>
              </Col>
              <Col span={8}>
                <Card style={{ width: 300 }}>
                  <p>{2}</p>
                  <div className="bannar-box">
                    <Icon type="pay-circle" /><span> 成交总额</span>
                  </div>
                </Card>
              </Col>
            </Row>
            <Row style={{ paddingTop: 30 }}>
              <Col span={8}>
                <Card style={{ width: 300 }}>
                  <p>{2}</p>
                  <div className="bannar-box">
                    <Icon type="file-protect" /><span> 成交单数</span>
                  </div>
                </Card>
              </Col>
              <Col span={8}>
                <Card style={{ width: 300 }}>
                  <p>{2}</p>
                  <div className="bannar-box">
                    <Icon type="wallet" /><span> 回款总额</span>
                  </div>
                </Card>
              </Col>
              <Col span={8}>
                <Card style={{ width: 300 }}>
                  <p>{2}</p>
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
