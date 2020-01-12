import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PackageJSON from '../../../package.json';
import { Breadcrumb, Table, Input, Button, Pagination, Select, Row, Col, message } from 'antd';
const { Option } = Select;
const { Search } = Input;
const InputGroup = Input.Group;
const ButtonGroup = Button.Group;
import _ from 'lodash';
import moment from 'moment';
import { hourFormat, yearFormat } from '../../constants';
import WrapEditClientModal from '../../component/editClientModal';
import WrapAddNewClientModal from '../../component/addNewClientModal';
import AddClientRecordModal from '../../component/addClientRecordModal';
import AddClientOrderModal from '../../component/addClientOrderModal';
import UpLoadModal from '../../component/uploadModal';
import { getClients, getClientRecordsList, addNewClient, deleteClient, addNewClientOrder, updateClientShareStatus, getClientOrder, getClientOrderBack, downloadResourceExcel } from '../../actions/client';
import { getAllFirms } from '../../actions/firm';
import { getEmployeeList } from '../../actions/api';
import { changeSelectedKeys } from '../../actions/base';
import './style.scss';
const mapStateToProps = state => ({
  documentTitle: state.layout.documentTitle,
  clientsList: state.client.clientsList,
  oneClientRecord: state.client.oneClientRecord,
  currentPage: state.client.currentPage,
  pageTotal: state.client.pageTotal,
  pageSize: state.client.pageSize,
  userId: state.sessions.user_Id,
  userRole: state.sessions.user_role,
  userName: state.sessions.user_name,
  employeeList: state.sessions.employeeList,
  selectedRowKeys: state.client.selectedRowKeys,
  isFetching: state.client.isFetching,
});
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    getClients,
    getClientRecordsList,
    addNewClient,
    deleteClient,
    getAllFirms,
    addNewClientOrder,
    getEmployeeList,
    updateClientShareStatus,
    getClientOrder,
    getClientOrderBack,
    changeSelectedKeys,
    downloadResourceExcel
  },
  dispatch
);
@connect(mapStateToProps, mapDispatchToProps)

export default class ClientsTable extends Component {
  state = {
    searchText: '',
    searchType: 'all',
    visible: false,
    tempData: null,
    shareStatus: 2,
    user_role: JSON.parse(localStorage.getItem("user")).user_role,
    pageSize: this.props.pageSize
  };
  componentWillMount() {
    this.onInit();
  }
  onInit = () => {
    this.props.getAllFirms();
    this.props.getClients({
      searchType: this.state.searchType,
      searchText: this.state.searchText,
      shareStatus: this.state.shareStatus,
      page: 1,
      pageSize: this.props.pageSize,
    });
    if (this.state.user_role === "2") {
      this.props.getEmployeeList();
    }
  }

  // 新建客户
  openAddModal = (e) => {
    console.log('open');
    this.setState({
      tempData: null
    });
    this.formAddNewClientModal.showModal();
  };
  // 新建客户end
  // 修改客户
  handleEditClient = (record) => {
    this.setState({
      tempData: record
    });
    this.props.getClientOrder({
      resourceId: record.clientId,
      page: 1,
      pageSize: 1000
    });
    this.props.getClientOrderBack({
      resourceId: record.clientId,
      page: 1,
      pageSize: 1000
    });
    this.formEditClientModal.showModal();
  }
  // 修改客户end
  // 删除客户
  handledeleteClient = (record) => {
    this.props.deleteClient({ resourceId: this.props.selectedRowKeys }, this.props.currentPage, this.props.pageSize, this.state.shareStatus, this.state.searchText, this.state.searchType);
  }
  // 删除客户end

  // 跟进记录
  handleAddRecord = (record) => {
    this.setState({
      tempData: record
    });
    this.addClientRecordModal.showModal();
    this.props.getClientRecordsList({
      resourceId: record.clientId,
      page: 1,
      pageSize: 1000
    });
    // 打开跟进记录，并编辑
  }
  handleAddOrder = (record) => {
    this.setState({
      tempData: record
    });
    this.addClientOrderModal.showModal();
    // 打开跟进记录，并编辑
  }
  pageChange = (page, pageSize = this.props.pageSize) => {
    this.props.getClients({
      searchText: this.state.searchText,
      searchType: this.state.searchType,
      shareStatus: this.state.shareStatus,
      page: page,
      pageSize: pageSize,
    });
  }
  handleCheckStatus = (e) => {
    this.setState({
      shareStatus: e,
    });
    this.props.changeSelectedKeys([]);
    this.props.getClients({
      searchText: this.state.searchText,
      searchType: this.state.searchType,
      shareStatus: e,
      page: 1,
      pageSize: this.props.pageSize
    });
  }
  handleCheckOneStatus = (e) => {
    this.props.updateClientShareStatus({
      resourceId: this.props.selectedRowKeys,
      shareStatus: this.state.shareStatus === 2 ? 1 : 2
    }, this.state.shareStatus, this.props.pageSize, this.state.searchText, this.state.searchType);
  }

  onSelectChange = selectedRowKeys => {
    this.props.changeSelectedKeys(selectedRowKeys);
  };
  handleCheckSearchType = (e) => {
    this.setState({ searchType: e });
    if (e === 'all') {
      this.setState({ searchText: '' });
      this.refs.searchBar.input.state.value = '';
      this.props.getClients({
        searchText: '',
        searchType: 'all',
        shareStatus: this.state.shareStatus,
        page: 1,
        pageSize: this.props.pageSize
      });
    }
  }

  handleMoreSearch = (value) => {
    this.setState({ searchText: value });
    this.props.getClients({
      searchText: value,
      searchType: this.state.searchType,
      shareStatus: this.state.shareStatus,
      page: 1,
      pageSize: this.props.pageSize
    });
  }
  handleDownload = () => {
    // this.props.downloadResourceExcel();
    const token = localStorage.getItem('sessions');
    fetch(`${PackageJSON.proxy}/crm/upload/downloadResourceFile`, {
      method: 'GET',
      responseType: 'blob',//悟空 返回数据的格式，可选值为arraybuffer,blob,document,json,text,stream，默认值为json
      headers: {
        // 'Content-Type': "application/json;charset=UTF-8", // 悟空
        // 'Content-Type': 'application/octet-stream',
        Authorization: `Bearer ${token}`.trim(),//string.trim()去除首尾空格
      },

    })
      .then(res => {
        // const blob = new Blob([res], { type: 'application/octet-stream' });
        // const blob = new Blob([res]);
        const blob = new Blob([res], { type: "application/vnd.ms-excel;charset=utf-8" }); // 悟空
        // const blob = new Blob([res], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8' });
        const fileName = "个人客户.xls";
        if ('download' in document.createElement('a')) { // 非IE下载
          const elink = document.createElement('a');
          elink.download = fileName;
          elink.style.display = 'none';
          elink.href = window.URL.createObjectURL(blob);
          document.body.appendChild(elink);
          elink.click();
          window.URL.revokeObjectURL(elink.href); // 释放URL 对象
          document.body.removeChild(elink);
        } else { // IE10+下载;
          navigator.msSaveBlob(blob, fileName);
        }
      }).catch(err => {
        message.error('导出失败!');
      });
  }
  render() {
    const { clientsList } = this.props;
    const rowSelection = {
      selectedRowKeys: this.props.selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = this.props.selectedRowKeys ? this.props.selectedRowKeys.length > 0 : true;
    const columns = [
      {
        width: 120,
        title: '客户名称',
        dataIndex: 'clientName',
        key: 'clientName',
        fixed: 'left',
        render: (text, record) => (<span>{record ?
          <a onClick={() => this.handleEditClient(record)}>
            {text}
          </a>
          : '--'}</span>),
      },
      {
        width: 200,
        title: '证书及专业',
        dataIndex: 'certificate',
        key: 'certificate',
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
        title: 'QQ',
        dataIndex: 'qq',
        key: 'qq',
        render: text => <span>{text ? text : '--'}</span>,
      },
      {
        width: 100,
        title: '性别',
        dataIndex: 'gender',
        render: text => <span>{text ? text === 1 ? '女' : '男' : '--'}</span>
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
        title: '备注',
        dataIndex: 'remark',
        key: 'remark',
        render: text => <span>{text ? text : '--'}</span>,
      },
      {
        width: 100,
        title: '经办人',
        dataIndex: 'employeeName',
        render: text => <span>{text ? text : '--'}</span>,
      },
      {
        width: 200,
        title: '操作',
        key: 'operation',
        fixed: 'right',
        render: (record) => <ButtonGroup>
          <Button onClick={() => this.handleAddRecord(record)}>跟进</Button>
          <Button onClick={() => this.handleAddOrder(record)}>新建订单</Button>
        </ButtonGroup>,
      },
    ];

    const pagination = {
      pageSize: this.props.pageSize,
      current: this.props.currentPage,
      total: this.props.pageTotal,
      onChange: (a, b) => { this.pageChange(a, b); }
    };
    // console.log('pageSize', this.props.pageSize);
    // console.log('pageTotal', this.props.pageTotal);
    // console.log('currentPage', this.props.currentPage);
    console.log('pagination', pagination);
    return (
      <div className="container">
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>个人客户表</Breadcrumb.Item>
        </Breadcrumb>
        <div className="addBtn">
          <UpLoadModal
            searchText={this.state.searchText}
            searchType={this.state.searchType}
            shareStatus={this.state.shareStatus}
            pageSize={this.props.pageSize}
            getNewPage={this.props.getClients}
            getAPI={'uploadResourceFile'}
          />
          <Button type="primary" onClick={this.handleDownload} style={{ marginLeft: 20 }}> 导出 </Button>
          <Button type="primary" onClick={this.openAddModal} style={{ marginLeft: 20 }}> 新建 </Button>
        </div>
        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
          <Row>
            <Col span={4}>
              <Select defaultValue={this.state.shareStatus} style={{ width: 120 }} onChange={this.handleCheckStatus}>
                <Option value={1}>公有资源</Option>
                <Option value={2}>私有资源</Option>
              </Select>
            </Col>
            <Col span={12}>
              <InputGroup compact>
                <span style={{ verticalAlign: 'middle' }}> 更多搜索：</span>
                <Select defaultValue={this.state.searchType} style={{ width: 100 }} onChange={this.handleCheckSearchType}>
                  <Option value="all">不限</Option>
                  <Option value="phoneNumber">手机号</Option>
                  <Option value="resourceName">客户名称</Option>
                  <Option value="qq">QQ</Option>
                  <Option value="email">邮箱</Option>
                  <Option value="info"> 备注</Option>
                  <Option value="certificate"> 证书及专业</Option>
                  <Option value="province"> 注册省份</Option>
                </Select>
                <Search style={{ maxWidth: 200 }} defaultValue={this.state.searchText} ref="searchBar" onSearch={e => this.handleMoreSearch(e)} enterButton />
              </InputGroup>
            </Col>
            <Col span={8}>
              <span style={{ verticalAlign: 'middle' }}> 操作：</span>
              <ButtonGroup>
                {this.state.shareStatus === 2 ?
                  <Button type="primary" disabled={!hasSelected} onClick={() => this.handleCheckOneStatus()}>转为公有资源</Button> :
                  <Button type="primary" disabled={!hasSelected} onClick={() => this.handleCheckOneStatus()}>转为私有资源</Button>}
                <Button type="primary" disabled={!hasSelected} onClick={() => this.handledeleteClient()}>删除</Button>
              </ButtonGroup>
            </Col>
          </Row>
          < Table style={{ marginTop: '10px' }} size="small" rowKey={record => record.clientId ? record.clientId : Math.random()}
            rowSelection={rowSelection}
            columns={columns}
            dataSource={clientsList}
            scroll={{ x: 1900 }}
            pagination={pagination}
            loading={this.props.isFetching}
          />
        </div>
        {/* 客户信息模态框 */}
        <WrapEditClientModal
          wrappedComponentRef={(form) => this.formEditClientModal = form}
          dataSource={this.state.tempData}
          userRole={this.props.userRole}
          userId={this.props.userId}
          userName={this.props.userName}
          employeeList={this.props.employeeList}
          shareStatus={this.state.shareStatus}
          searchText={this.state.searchText}
          searchType={this.state.searchType}
        />
        <WrapAddNewClientModal
          wrappedComponentRef={(form) => this.formAddNewClientModal = form}
          userRole={this.props.userRole}
          userId={this.props.userId}
          userName={this.props.userName}
          employeeList={this.props.employeeList}
          shareStatus={this.state.shareStatus}
        />
        {/* 新建跟进记录模态框 */}
        <AddClientRecordModal
          // ref={(e) => this.addClientRecordModal = e}
          wrappedComponentRef={(form) => this.addClientRecordModal = form}
          // ref="addClientRecordModal"
          dataSource={this.state.tempData}
          shareStatus={this.state.shareStatus}
          searchText={this.state.searchText}
          searchType={this.state.searchType}
        />
        {/* 新建订单模态框 */}
        <AddClientOrderModal
          // ref={(e) => this.addClientRecordModal = e}
          wrappedComponentRef={(form) => this.addClientOrderModal = form}
          // ref="addClientRecordModal"
          dataSource={this.state.tempData}
          addNewClientOrder={this.props.addNewClientOrder}
        />
      </div>
    );
  }
}
