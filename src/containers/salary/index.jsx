import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Breadcrumb, Table, Select, Button, Icon, Divider, Popover, List, Typography, DatePicker } from 'antd';
const { Option } = Select;
const { MonthPicker, RangePicker } = DatePicker;
import _ from 'lodash';
import moment from 'moment';
import { hourFormat, yearFormat } from '../../constants';
import WrapEditSalaryModal from '../../component/editSalaryModal';
import { getEmployeesSalaryList } from '../../actions/salary';
const mapStateToProps = state => ({
  employeesSalaryList: state.salary.employeesSalaryList,
  currentPage: state.salary.currentPage,
  pageTotal: state.salary.pageTotal,
  pageSize: state.salary.pageSize,
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    getEmployeesSalaryList
  },
  dispatch
);

@connect(mapStateToProps, mapDispatchToProps)
export default class SalaryTable extends Component {
  state = {
    orderType: 1,
    tempData: null,
  }
  componentWillMount() {
    this.onInit();
  }
  onInit = () => {
    this.props.getEmployeesSalaryList({
      page: 1,
      pageSize: this.props.pageSize
    });
  }
  handleEidtSalary = (record) => {
    this.setState({
      tempData: record
    });
    // this.props.getOrderBackDetail({
    //   orderType: this.state.orderType,
    //   businessId: record.orderId
    // });
    this.editSalaryModal.showModal();
  }

  render() {
    const { employeesSalaryList, pageSize, currentPage, pageTotal } = this.props;
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
            <Popover content={(<span>修改</span>)} trigger="hover">
              <Icon type="edit" />
            </Popover>
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
          <RangePicker
            defaultValue={[moment('2015/01/01', yearFormat), moment('2015/01/01', yearFormat)]}
            format={yearFormat}
          />
          <Table rowKey={record => record.orderId ? record.orderId : Math.random()}
            columns={columns}
            dataSource={employeesSalaryList}
            pagination={pagination}
            expandedRowRender={
              record => {
                return (
                  <List
                    bordered
                    dataSource={record.data}
                    renderItem={(item, index) => (
                      <List.Item>
                        <Typography.Text >{index + 1}</Typography.Text>
                        <span style={{ padding: '0 10px' }}>成交客户：{item.clientName}</span>
                        <span style={{ padding: '0 10px' }}>订单编号：{item.businessId}</span>
                        <span style={{ padding: '0 10px' }}>成交时间: {item.createDate}</span>
                        <span style={{ padding: '0 10px' }}>成交总额: {item.orderPaySum}</span>
                      </List.Item>
                    )}
                  />
                )
              }
            }
          />
          <WrapEditSalaryModal
            wrappedComponentRef={(form) => this.editSalaryModal = form}
            dataSource={this.state.tempData}
          />
        </div>
      </div>
    );
  }
}
