import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Breadcrumb, Table, Select, Button, Icon, Divider, Popover } from 'antd';
const { Option } = Select;
import Highlighter from 'react-highlight-words';
import _ from 'lodash';
import moment from 'moment';
import { hourFormat, yearFormat } from '../../constants';
import WrapAddAccountModal from '../../component/addAccountModal';
import { getClients, getClientRecordsList, updateOneClient, addNewClient, deleteClient } from '../../actions/client';
import {getOrderList} from '../../actions/order';
const mapStateToProps = state => ({
  documentTitle: state.layout.documentTitle,
  clientsList: state.client.clientsList,
  oneClientRecord: state.client.oneClientRecord,
  currentPage: state.client.currentPage,
  pageTotal: state.client.pageTotal,
  pageSize: state.client.pageSize,
});
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    getClients,
    getClientRecordsList,
    updateOneClient,
    addNewClient,
    deleteClient
  },
  dispatch
);
@connect(mapStateToProps, mapDispatchToProps)
export default class AccountTable extends Component {
  state = {
    orderType: 0,
  }
  componentWillMount() {
    this.onInit();
  }
  onInit = () => {
    this.props.getClients({
      page: this.props.currentPage,
      pageSize: this.props.pageSize,
    });
  }
  handleCheckStatus = (e) => {
    this.setState({
      orderType: e
    });
    this.props.getOrderList({
      orderType: e,
      page: 1,
      pageSize: 2
    });
  }
  openAddModal = (e) => {
    this.setState({
      tempData: null
    });
    this.formAddAccountModal.showModal();
  };
  pageChange = (page, pageSize) => {
    this.props.getClients({
      page: page,
      pageSize: pageSize,
    });
  }
  render() {
    const { clientsList, pageSize, currentPage, pageTotal } = this.props;
    const pagination = {
      pageSize: pageSize,
      current: currentPage,
      total: pageTotal,
      onChange: (a, b) => { this.pageChange(a, b); }
    };
    const columns = [
      {
        width: 120,
        title: '客户名称',
        dataIndex: 'clientName',
        key: 'clientName',
        fixed: 'left',
        render: text => <span>{text ? text : '--'}</span>,
        // ...this.getColumnSearchProps('clientName'),
      },
      {
        width: 200,
        title: '证书及专业',
        dataIndex: 'certificate',
        key: 'certificate',
        render: text => <span>{text ? text : '--'}</span>,
        // ...this.getColumnSearchProps('certificate'),
      },
      {
        // width: 200,
        title: '备注',
        dataIndex: 'remark',
        key: 'remark',
        render: text => <span>{text ? text : '--'}</span>,
        // ...this.getColumnSearchProps('remark'),
      },
      {
        width: 100,
        title: '省份',
        dataIndex: 'province',
        key: 'province',
        render: text => <span>{text ? text : '--'}</span>,
        // ...this.getColumnSearchProps('province'),
      },
      {
        width: 100,
        title: '性别',
        dataIndex: 'gender',
        filters: [{ text: 1, value: '女' }, { text: 2, value: '男' }],
        render: text => <span>{text === 1 ? '女' : '男'}</span>
      },
      {
        width: 100,
        title: '状态',
        dataIndex: 'status',
        filters: [{
          value: 1, text: '潜在'
        }, {
          value: 2, text: '意向'
        }, {
          value: 3, text: '成交'
        }, {
          value: 4, text: '失败'
        }, {
          value: 5, text: '已流失'
        }],
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
        filterMultiple: false,
        sorter: (a, b) => a.createDate - b.createDate,
        sortDirections: ['descend', 'ascend'],
        render: text => <span>{text ? moment(text).format(yearFormat) : '--'}</span>,
      },
      {
        width: 150,
        title: '到期时间',
        dataIndex: 'expireDate',
        filterMultiple: false,
        render: text => <span>{text ? moment(text).format(yearFormat) : '--'}</span>,
        sorter: (a, b) => a.expireDate - b.expireDate,
        sortDirections: ['descend', 'ascend'],
      },
      {
        width: 100,
        title: '经办人',
        dataIndex: 'employeeName',
        render: text => <span>{text ? text : '--'}</span>,
      },
      {
        width: 150,
        title: '操作',
        key: 'operation',
        fixed: 'right',
        render: (record) => <span>
          <a onClick={() => this.handleEditClient(record)}>
            <Popover content={(<span>添加回款记录</span>)} trigger="hover">
              <Icon type="plus-square" />
            </Popover>
          </a>
          <Divider type="vertical" />
          <a onClick={() => this.handledeleteClient(record)}>
            <Popover content={(<span>删除</span>)} trigger="hover">
              <Icon type="delete" />
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
          <Select defaultValue={0} style={{ width: 130 }} onChange={this.handleCheckStatus}>
            <Option value={0}>个人客户订单</Option>
            <Option value={1}>企业客户订单</Option>
          </Select>
          <Table rowKey={record => record.clientId}
            columns={columns}
            dataSource={clientsList}
            scroll={{ x: 1800 }}
            onChange={this.handleTableChange}
            pagination={pagination}
          />
        </div>
      </div>
    );
  }
}
