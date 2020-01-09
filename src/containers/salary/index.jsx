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
        width: 100,
        title: '员工姓名',
        dataIndex: 'employeeName',
        key: 'name',
        fixed: 'left',
        render: text => <span>{text ? text : '--'}</span>,
      }, {
        width: 100,
        title: '底薪 (￥)',
        dataIndex: 'baseSalary',
        key: 'baseSalary',
        render: text => <span>{text === null ? '--' : text}</span>,
      }, {
        width: 150,
        title: '人才回款总额 (￥)',
        dataIndex: 'clientSumPay',
        key: 'clientSumPay',
        render: text => <span>{text === null ? '--' : text}</span>,
      }, {
        width: 150,
        title: '企业回款总额 (￥)',
        dataIndex: 'firmSumPay',
        key: 'firmSumPay',
        render: text => <span>{text === null ? '--' : text}</span>,
      }, {
        width: 150,
        title: '岗位工资 (￥)',
        dataIndex: 'positionSalary',
        key: 'positionSalary',
        render: text => <span>{text === null ? '--' : text}</span>,
      }, {
        width: 100,
        title: '请假 (￥)',
        dataIndex: 'employeeLeave',
        key: 'employeeLeave',
        render: text => <span>{text === null ? '--' : text}</span>,
      }, {
        width: 100,
        title: '迟到 (￥)',
        dataIndex: 'performance',
        key: 'performance',
        render: text => <span>{text === null ? '--' : text}</span>,
      }, {
        width: 100,
        title: '奖金 (￥)',
        dataIndex: 'bonus',
        key: 'bonus',
        render: text => <span>{text === null ? '--' : text}</span>,
      }, {
        width: 100,
        title: '罚款 (￥)',
        dataIndex: 'penalty',
        key: 'penalty',
        render: text => <span>{text === null ? '--' : text}</span>,
      }, {
        width: 150,
        title: '社保个人费用 (￥)',
        dataIndex: 'insurance',
        key: 'insurance',
        render: text => <span>{text === null ? '--' : text}</span>,
      }, {
        width: 100,
        title: '其他 (￥)',
        dataIndex: 'other',
        key: 'other',
        render: text => <span>{text === null ? '--' : text}</span>,
      }, {
        title: '备注（其他）',
        dataIndex: 'info',
        key: 'info',
        render: text => <span>{text ? text : '--'}</span>,
      }, {
        width: 100,
        title: '实际收入 (￥)',
        dataIndex: 'salary',
        key: 'salary',
        render: text => <span>{text === null ? '--' : text}</span>,
      }
    ];
    if(this.props.userRole === '2'){
      columns.push({
        width: 100,
        title: '操作',
        key: 'operation',
        fixed: 'right',
        render: (record) => <span>
          <a onClick={() => this.handleEidtSalary(record)}>
            <Button>修改</Button>
          </a>
        </span>,
      })
    }
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
          <Table size="small" rowKey={record => record.orderId ? record.orderId : Math.random()}
            columns={columns}
            dataSource={employeesSalaryList}
            pagination={pagination}
            scroll={{ x: 1800 }}
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
                          <span style={{ padding: '0 10px' }}>欠款金额: {item.owePay}</span>
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
