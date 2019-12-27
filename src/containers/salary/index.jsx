import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Breadcrumb, Table, Button, List, Typography, DatePicker } from 'antd';
const { MonthPicker } = DatePicker;
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
import _ from 'lodash';
import moment from 'moment';
import WrapEditSalaryModal from '../../component/editSalaryModal';
import { getEmployeesSalaryList, getSalaryRegulationDetail } from '../../actions/salary';
const mapStateToProps = state => ({
  employeesSalaryList: state.salary.employeesSalaryList,
  currentPage: state.salary.currentPage,
  pageTotal: state.salary.pageTotal,
  pageSize: state.salary.pageSize,
  employeeSalaryRegulation: state.salary.employeeSalaryRegulation,
  userRole: state.sessions.user_role,
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
    searchMonth: moment()
  }
  componentWillMount() {
    this.onInit();
  }
  onInit = () => {
    this.props.getEmployeesSalaryList({
      searchMonth: this.state.searchMonth.format("YYYY-MM"),
      page: 1,
      pageSize: this.props.pageSize
    });
  }
  handleEidtSalary = (record) => {
    console.log(record);
    this.setState({
      tempData: record
    });
    this.props.getSalaryRegulationDetail({
      searchMonth: this.state.searchMonth.format("YYYY-MM"),
      employeeId: record.employeeId
    });
    this.editSalaryModal.showModal();
  }
  handleRangeChange = value => {
    this.setState({ searchMonth: value });
    this.props.getEmployeesSalaryList({
      searchMonth: value.format("YYYY-MM"),
      page: 1,
      pageSize: this.props.pageSize
    });
  };

  render() {
    const { employeesSalaryList, pageSize, currentPage, pageTotal, employeeSalaryRegulation } = this.props;
    const pagination = {
      pageSize: pageSize,
      current: currentPage,
      total: pageTotal,
      onChange: (a, b) => { this.pageChange(a, b); }
    };
    const columns = [
      {
        title: '员工姓名',
        dataIndex: 'employeeName',
        key: 'name',
        render: text => <span>{text ? text : '--'}</span>,
      }, {
        title: '底薪 (￥)',
        dataIndex: 'baseSalary',
        key: 'baseSalary',
        render: text => <span>{text ? text : '--'}</span>,
      }, {
        title: '业绩 (￥)',
        dataIndex: 'performance',
        key: 'performance',
        render: text => <span>{text ? text : '--'}</span>,
      }, {
        title: '罚款 (￥)',
        dataIndex: 'penalty',
        key: 'penalty',
        render: text => <span>{text ? text : '--'}</span>,
      }, {
        title: '实际收入 (￥)',
        dataIndex: 'salary',
        key: 'salary',
        render: text => <span>{text ? text : '--'}</span>,
      }, {
        title: '备注',
        dataIndex: 'info',
        key: 'info',
        render: text => <span>{text ? text : '--'}</span>,
      }, {
        title: '操作',
        key: 'operation',
        render: (record) => <span>
          <a onClick={() => this.handleEidtSalary(record)}>
            {this.props.userRole === "2" ?
            <Button>修改</Button>
            :
            <Button>查看</Button>
            }
          </a>
        </span>,
      },
    ];
    return (
      <div className="container">
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>绩效汇总表</Breadcrumb.Item>
        </Breadcrumb>

        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
          {/* <RangePicker
            defaultValue={[this.state.startData, this.state.endDate]}
            format={yearFormat}
            onChange={this.handleRangeChange}
          /> */}
          <MonthPicker defaultValue={this.state.searchMonth} 
            format={"YYYY-MM"}
            onChange={this.handleRangeChange}/>
          <Table rowKey={record => record.orderId ? record.orderId : Math.random()}
            columns={columns}
            dataSource={employeesSalaryList}
            pagination={pagination}
            expandedRowRender={
              record => {
                return (
                  <div>
                    <p style={{padding:'10px'}}>人才回款表：</p>
                    <List
                      bordered
                      dataSource={record.clientOrderData}
                      renderItem={(item, index) => (
                        <List.Item>
                          <Typography.Text >{index + 1}</Typography.Text>
                          <span style={{ padding: '0 10px' }}>成交客户：{item.clientName}</span>
                          <span style={{ padding: '0 10px' }}>订单编号：{item.businessId}</span>
                          <span style={{ padding: '0 10px' }}>成交时间: {item.createDate}</span>
                          <span style={{ padding: '0 10px' }}>成交总额: {item.orderPaySum}</span>
                          <span style={{ padding: '0 10px' }}>当月回款总额: {item.curretMonthPayBackSum}</span>
                          <span style={{ padding: '0 10px' }}>欠款金额: {item.owePay}</span>
                        </List.Item>
                      )}
                    />
                    <p style={{padding:'10px'}}>企业回款表：</p>
                    <List
                      bordered
                      dataSource={record.firmOrderData}
                      renderItem={(item, index) => (
                        <List.Item>
                          <Typography.Text >{index + 1}</Typography.Text>
                          <span style={{ padding: '0 10px' }}>成交客户：{item.firmName}</span>
                          <span style={{ padding: '0 10px' }}>订单编号：{item.businessId}</span>
                          <span style={{ padding: '0 10px' }}>成交时间: {item.createDate}</span>
                          <span style={{ padding: '0 10px' }}>成交总额: {item.orderPaySum}</span>
                          <span style={{ padding: '0 10px' }}>当月回款总额: {item.curretMonthPayBackSum}</span>
                          <span style={{ padding: '0 10px' }}>欠款金额: {item.oweSum}</span>
                        </List.Item>
                      )}
                    />
                  </div>

                )
              }
            }
          />
          <WrapEditSalaryModal
            wrappedComponentRef={(form) => this.editSalaryModal = form}
            employeeSalaryRegulation={employeeSalaryRegulation}
            dataSource={this.state.tempData}
            searchMonth= {this.state.searchMonth}
          />
        </div>
      </div>
    );
  }
}
