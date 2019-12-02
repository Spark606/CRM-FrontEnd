import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Breadcrumb, Tabs, Popover,  Icon, Divider } from 'antd';
import moment from 'moment';
import { hourFormat, yearFormat } from '../../constants';
import CheckPage from '../../component/todoTab/checkPage';
import { getUpdateClientsList, getDeleteClientsList, getUpdateFirmsList, getDeleteFirmsList, checkPassClient, checkPassFirm } from '../../actions/todo';

const { TabPane } = Tabs;
const mapStateToProps = state => ({
  documentTitle: state.layout.documentTitle,
  userRole: state.sessions.user_role,
  pageSize: state.todo.pageSize,

  updateClientsCurrentPage: state.todo.updateClientsCurrentPage,
  updateClientsPageTotal: state.todo.updateClientsPageTotal,
  updateClientsList: state.todo.updateClientsList,

  deleteClientsCurrentPage: state.todo.deleteClientsCurrentPage,
  deleteClientsPageTotal: state.todo.deleteClientsPageTotal,
  deleteClientsList: state.todo.deleteClientsList,

  updateFirmsCurrentPage: state.todo.updateFirmsCurrentPage,
  updateFirmsPageTotal: state.todo.updateFirmsPageTotal,
  updateFirmsList: state.todo.updateFirmsList,

  deleteFirmsCurrentPage: state.todo.deleteFirmsCurrentPage,
  deleteFirmsPageTotal: state.todo.deleteFirmsPageTotal,
  deleteFirmsList: state.todo.deleteFirmsList,
});
const mapDispatchToProps = dispatch => bindActionCreators(
  {getUpdateClientsList, getDeleteClientsList, getUpdateFirmsList, getDeleteFirmsList, checkPassClient, checkPassFirm },
  dispatch
);
@connect(mapStateToProps, mapDispatchToProps)
export default class TodoPage extends Component {
handleUpdateClientPass = (record) => {
  this.props.checkPassClient({
    id: record.clientId,
    checkedStatus: 1,
  });
}
handleUpdateClientSendBack = (record) => {
  this.props.checkPassClient({
    id: record.clientId,
    checkedStatus: 0,
  });
}
handleUpdateClientWithWdraw = (record) => {
  this.props.checkPassClient({

  });
}
handleDeleteClientPass = (record) => {
  this.props.checkPassClient({
    id: record.clientId,
    checkedStatus: 0,
  });
}
handleDeleteClientSendBack = (record) => {
  this.props.checkPassClient({
    id: record.clientId,
    checkedStatus: 0,
  });
}
handleDeleteClientWithWdraw = (record) => {
  this.props.checkPassClient({

  });
}
handleUpdateFirmPass = (record) => {
  this.props.checkPassClient({

  });
}
handleUpdateFirmSendBack = (record) => {
  this.props.checkPassClient({

  });
}
handleUpdateFirmWithWdraw = (record) => {
  this.props.checkPassClient({

  });
}
handleDeleteFirmPass = (record) => {
  this.props.checkPassClient({

  });
}
handleDeleteFirmSendBack = (record) => {
  this.props.checkPassClient({

  });
}
handleDeleteFirmWithWdraw = (record) => {
  this.props.checkPassClient({

  });
}
  render() {
    const updateClientColumns = [
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
        render: (record) => {
          if (parseInt(this.props.userRole) === 2) {
            return (
              <span>
                <a onClick={() => this.handleUpdateClientPass(record)}>
                  <Popover content={(<span>审批</span>)} trigger="hover">
                    <Icon type="check-circle" />
                  </Popover>
                </a>
                <Divider type="vertical" />
                <a onClick={() => this.handleUpdateClientSendBack(record)}>
                  <Popover content={(<span>退回</span>)} trigger="hover">
                    <Icon type="close-circle" />
                  </Popover>
                </a>
              </span>)
          } else {
            return (
              <span>
                <a onClick={() => this.handleUpdateClientWithWdraw(record)}>
                  <Popover content={(<span>撤回</span>)} trigger="hover">
                    <Icon type="rollback" />
                  </Popover>
                </a>
              </span>)
          }
        }
      },
    ];
    const deleteClientColumns = [
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
        render: (record) => {
          if (parseInt(this.props.userRole) === 2) {
            return (
              <span>
                <a onClick={() => this.handleDeleteClientPass(record)}>
                  <Popover content={(<span>审批</span>)} trigger="hover">
                    <Icon type="check-circle" />
                  </Popover>
                </a>
                <Divider type="vertical" />
                <a onClick={() => this.handleDeleteClientSendBack(record)}>
                  <Popover content={(<span>退回</span>)} trigger="hover">
                    <Icon type="close-circle" />
                  </Popover>
                </a>
              </span>)
          } else {
            return (
              <span>
                <a onClick={() => this.handleDeleteClientWithWdraw(record)}>
                  <Popover content={(<span>撤回</span>)} trigger="hover">
                    <Icon type="rollback" />
                  </Popover>
                </a>
              </span>)
          }
        }
      },
    ];
    const updateFirmColumns = [
      {
        width: 120,
        title: '公司名称',
        dataIndex: 'firmName',
        key: 'firmName',
        fixed: 'left',
        render: text => <span>{text ? text : '--'}</span>,
        // ...this.getColumnSearchProps('firmName'),
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
        // width: 200,
        title: '备注',
        dataIndex: 'remark',
        key: 'remark',
        render: text => <span>{text ? text : '--'}</span>,
        // ...this.getColumnSearchProps('remark'),
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
        title: '联系人',
        dataIndex: 'contact',
        key: 'contact',
        render: text => <span>{text ? text : '--'}</span>,
        // ...this.getColumnSearchProps('contact'),
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
        filters: [{ text: 1, value: '女' }, { text: 2, value: '男' }],
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
      },
      {
        width: 150,
        title: '操作',
        key: 'operation',
        fixed: 'right',
        render: (record) => {
          if (parseInt(this.props.userRole) === 2) {
            return (
              <span>
                <a onClick={() => this.handleUpdateFirmPass(record)}>
                  <Popover content={(<span>审批</span>)} trigger="hover">
                    <Icon type="check-circle" />
                  </Popover>
                </a>
                <Divider type="vertical" />
                <a onClick={() => this.handleUpdateFirmSendBack(record)}>
                  <Popover content={(<span>退回</span>)} trigger="hover">
                    <Icon type="close-circle" />
                  </Popover>
                </a>
              </span>)
          } else {
            return (
              <span>
                <a onClick={() => this.handleUpdateFirmWithWdraw(record)}>
                  <Popover content={(<span>撤回</span>)} trigger="hover">
                    <Icon type="rollback" />
                  </Popover>
                </a>
              </span>)
          }
        }
      },
    ];
    const deleteFirmColumns = [
      {
        width: 120,
        title: '公司名称',
        dataIndex: 'firmName',
        key: 'firmName',
        fixed: 'left',
        render: text => <span>{text ? text : '--'}</span>,
        // ...this.getColumnSearchProps('firmName'),
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
        // width: 200,
        title: '备注',
        dataIndex: 'remark',
        key: 'remark',
        render: text => <span>{text ? text : '--'}</span>,
        // ...this.getColumnSearchProps('remark'),
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
        title: '联系人',
        dataIndex: 'contact',
        key: 'contact',
        render: text => <span>{text ? text : '--'}</span>,
        // ...this.getColumnSearchProps('contact'),
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
        filters: [{ text: 1, value: '女' }, { text: 2, value: '男' }],
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
      },
      {
        width: 150,
        title: '操作',
        key: 'operation',
        fixed: 'right',
        render: (record) => {
          if (parseInt(this.props.userRole) === 2) {
            return (
              <span>
                <a onClick={() => this.handleDeleteFirmPass(record)}>
                  <Popover content={(<span>审批</span>)} trigger="hover">
                    <Icon type="check-circle" />
                  </Popover>
                </a>
                <Divider type="vertical" />
                <a onClick={() => this.handleDeleteFirmSendBack(record)}>
                  <Popover content={(<span>退回</span>)} trigger="hover">
                    <Icon type="close-circle" />
                  </Popover>
                </a>
              </span>)
          } else {
            return (
              <span>
                <a onClick={() => this.handleDeleteFirmWithWdraw(record)}>
                  <Popover content={(<span>撤回</span>)} trigger="hover">
                    <Icon type="rollback" />
                  </Popover>
                </a>
              </span>)
          }
        }
      },
    ];
    return (
      <div className="container">
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>待办事项</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
          <Tabs defaultActiveKey="updateClient" tabPosition="left">
            <TabPane tab="修改个人客户" key="updateClient">
              {/* <UpdateClient /> */}
              <CheckPage
                columns={updateClientColumns}
                dataSource = {this.props.updateClientsList}
                currentPage={this.props.updateClientsCurrentPage}
                pageTotal={this.props.updateClientsPageTotal}
                pageSize={this.props.pageSize}
                getTodoList={this.props.getUpdateClientsList}
              />
            </TabPane>
            <TabPane tab="修改企业客户" key="updateFirm">
              {/* <UpdateFirm /> */}
              <CheckPage
                columns={updateFirmColumns}
                dataSource = {this.props.updateFirmsList}
                currentPage={this.props.updateFirmsCurrentPage}
                pageTotal={this.props.updateFirmsPageTotal}
                pageSize={this.props.pageSize}
                getTodoList={this.props.getUpdateFirmsList}
              />
            </TabPane>
            <TabPane tab="删除个人客户" key="deleteClient">
              {/* <DeleteClient /> */}
              <CheckPage
                columns={deleteClientColumns}
                dataSource = {this.props.deleteClientsList}
                currentPage={this.props.deleteClientsCurrentPage}
                pageTotal={this.props.deleteClientsPageTotal}
                pageSize={this.props.pageSize}
                getTodoList={this.props.getDeleteFirmsList}
              />
            </TabPane>
            <TabPane tab="删除企业客户" key="deleteFirm">
              {/* <DeleteFirm  /> */}
              <CheckPage
                columns={deleteFirmColumns}
                dataSource = {this.props.deleteFirmsList}
                currentPage={this.props.deleteFirmsCurrentPage}
                pageTotal={this.props.deleteFirmsPageTotal}
                pageSize={this.props.pageSize}
                getTodoList={this.props.getDeleteClientsList}
              />
            </TabPane>
            <TabPane tab="回款订单审批" key="payment">
              {/* <Payment /> */}
              <CheckPage
                columns={updateClientColumns}
                dataSource = {this.props.updateClientsList}
                currentPage={this.props.updateClientsCurrentPage}
                pageTotal={this.props.updateClientsPageTotal}
                pageSize={this.props.pageSize}
                getTodoList={this.props.getUpdateClientsList}
              />
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
}
