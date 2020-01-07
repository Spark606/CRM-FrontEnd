import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Breadcrumb, Table, Input, Button, Icon, Select, Row, Col } from 'antd';
const { Option } = Select;
const { Search } = Input;
const InputGroup = Input.Group;
const ButtonGroup = Button.Group;
import Highlighter from 'react-highlight-words';
import _ from 'lodash';
import moment from 'moment';
import { hourFormat, yearFormat } from '../../constants';
import WrapEditClientModal from '../../component/editClientModal';
import AddClientRecordModal from '../../component/addClientRecordModal';
import AddClientOrderModal from '../../component/addClientOrderModal';
import UpLoadModal from '../../component/uploadModal';
import { getClients, getClientRecordsList, addNewClient, deleteClient, addNewClientOrder, updateClientShareStatus } from '../../actions/client';
import { getAllFirms } from '../../actions/firm';
import { getEmployeeList } from '../../actions/api';
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
  employeeList: state.sessions.employeeList
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
    updateClientShareStatus
  },
  dispatch
);
@connect(mapStateToProps, mapDispatchToProps)

export default class ClientsTable extends Component {
  state = {
    searchText: '',
    searchType: '1',
    selectedRowKeys: [],
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
    this.setState({
      tempData: null
    });
    this.formEditClientModal.showModal();
  };
  // 新建客户end
  // 修改客户
  handleEditClient = (record) => {
    this.setState({
      tempData: record
    });
    this.formEditClientModal.showModal();
  }
  // 修改客户end
  // 删除客户
  handledeleteClient = (record) => {
    this.props.deleteClient({ resourceId: record.clientId }, this.props.currentPage, this.props.pageSize, this.state.shareStatus, this.state.searchText, this.state.searchType);
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
      selectedRowKeys: []
    });
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
      resourceId: this.state.selectedRowKeys,
      shareStatus: this.state.shareStatus === 2 ? 1 : 2
    }, this.state.shareStatus, this.props.pageSize, this.state.searchText, this.state.searchType);
  }

  onSelectChange = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  };
  handleCheckSearchType = (e) => {
    this.setState({ searchType: e });
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
  render() {
    const { clientsList, pageSize, currentPage, pageTotal } = this.props;
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
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
          />
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
                  <Option value="1">不限</Option>
                  <Option value="2">手机号</Option>
                  <Option value="3">客户名称</Option>
                  <Option value="4">QQ</Option>
                  <Option value="5">邮箱</Option>
                  <Option value="6"> 备注</Option>
                  <Option value="7"> 证书及专业</Option>
                  <Option value="8"> 注册省份</Option>
                </Select>
                <Search style={{ maxWidth: 200 }} defaultValue={this.state.searchText} onSearch={e => this.handleMoreSearch(e)} enterButton />
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
          <Table rowKey={record => record.clientId}
            rowSelection={rowSelection}
            columns={columns}
            dataSource={clientsList}
            scroll={{ x: 1800 }}
            pagination={pagination}
          />
        </div>
        {/* 新建客户模态框 */}
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
