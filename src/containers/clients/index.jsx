import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Breadcrumb, Table, Input, Button, Icon, Divider, Popover, Select } from 'antd';
const { Option } = Select;
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
    searchArr: [],
    visible: false,
    tempData: null,
    shareStatus: 2,
    pageSize: this.props.pageSize
  };
  componentWillMount() {
    this.onInit();
  }
  onInit = () => {
    this.props.getAllFirms();
    this.props.getClients({
      searchText: this.state.searchArr,
      shareStatus: this.state.shareStatus,
      page: 1,
      pageSize: this.props.pageSize,
    });
    if(this.props.user_role === "2"){
      this.props.getEmployeeList();
    }
  }
  // 表头查询
  getColumnSearchProps = (dataIndex, title, key) => {
    return ({
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            ref={node => {
              this.searchInput = node;
            }}
            placeholder={`搜索${title}`}
            value={selectedKeys[0]}
            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => this.handleSearch(selectedKeys, key, confirm)}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, key, confirm)}
            icon="search"
            size="small"
            style={{ width: 90, marginRight: 8 }}
          >
            查询
        </Button>
          <Button onClick={() => this.handleReset(clearFilters, key)} size="small" style={{ width: 90 }}>
            重置
        </Button>
        </div>
      ),
      filterIcon: filtered => (
        <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
      ),
      // onFilter: (value, record) => record[dataIndex]
      //   .toString()
      //   .toLowerCase()
      //   .includes(value.toLowerCase()),
      onFilterDropdownVisibleChange: visible => {
        if (visible) {
          setTimeout(() => this.searchInput.select());
        }
      },
      render: text => {
        if (text) {
          return (<Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[this.state.searchText]}
            autoEscape
            textToHighlight={text.toString()}
          />)
        } else {
          return null
        }
      },
    })
  };

  handleSearch = (selectedKeys, key, confirm) => {
    const temp = {
      searchText: selectedKeys[0],
      dataIndex: key,
    };
    this.setState({
      searchArr: this.state.searchArr.length > 0 ? [...this.state.searchArr, temp] : [temp]
    }, () => confirm());
  };

  handleReset = (clearFilters, key) => {
    clearFilters();
    const temp = this.state.searchArr.filter(item => item.dataIndex !== key);
    console.log(temp, this.state.searchArr);
    this.setState({
      searchArr: temp
    });
  };

  // 表头查询end

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
    this.props.deleteClient({ resourceId: record.clientId }, this.props.currentPage, this.props.pageSize, this.state.shareStatus, this.state.searchArr);
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
      searchText: this.state.searchArr,
      shareStatus: this.state.shareStatus,
      page: page,
      pageSize: pageSize,
    });
  }
  handleCheckStatus = (e) => {
    this.setState({
      shareStatus: e
    });
    this.props.getClients({
      searchText: this.state.searchArr,
      shareStatus: e,
      page: 1,
      pageSize: this.props.pageSize
    });
  }
  handleCheckOneStatus = (e) => {
    this.props.updateClientShareStatus({
      resourceId: e.clientId,
      shareStatus: e.shareStatus === 2 ? 1 : 2
    }, this.state.shareStatus, this.props.pageSize, this.state.searchArr);
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
        ...this.getColumnSearchProps('clientName', '客户名称', 'resourceName'),
      },
      {
        width: 200,
        title: '证书及专业',
        dataIndex: 'certificate',
        key: 'certificate',
        render: text => <span>{text ? text : '--'}</span>,
        ...this.getColumnSearchProps('certificate', '证书及专业', 'certificate'),
      },
      {
        title: '备注',
        dataIndex: 'remark',
        key: 'remark',
        render: text => <span>{text ? text : '--'}</span>,
        ...this.getColumnSearchProps('remark', '备注', 'info'),
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
        render: (record) => <span>
          <a onClick={() => this.handleEditClient(record)}>
            <Popover content={(<span>修改</span>)} trigger="hover">
              <Icon type="edit" />
            </Popover>
          </a>
          <Divider type="vertical" />
          <a onClick={() => this.handleCheckOneStatus(record)}>
            <Popover content={(this.state.shareStatus === 2 ? <span>转为公有资源</span> : <span>转为私有资源</span>)} trigger="hover">
              <Icon type="import" />
            </Popover>
          </a>
          <Divider type="vertical" />
          <a onClick={() => this.handleAddRecord(record)}>
            <Popover content={(<span>跟进</span>)} trigger="hover">
              <Icon type="snippets" />
            </Popover>
          </a>
          <Divider type="vertical" />
          <a onClick={() => this.handleAddOrder(record)}>
            <Popover content={(<span>新建订单
            </span>)} trigger="hover">
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
          <Breadcrumb.Item>个人客户表</Breadcrumb.Item>
        </Breadcrumb>
        <div className="addBtn">
          <UpLoadModal
            searchText={this.state.searchText}
            shareStatus={this.state.shareStatus}
            pageSize={this.props.pageSize}
            getNewPage={this.props.getClients}
          />
          <Button type="primary" onClick={this.openAddModal} style={{ marginLeft: 20 }}> 新建 </Button>
        </div>
        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
          <Select defaultValue={this.state.shareStatus} style={{ width: 120 }} onChange={this.handleCheckStatus}>
            <Option value={1}>公有资源</Option>
            <Option value={2}>私有资源</Option>
          </Select>
          <Table rowKey={record => record.clientId}
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
          searchArr={this.state.searchArr}
        />
        {/* 新建跟进记录模态框 */}
        <AddClientRecordModal
          // ref={(e) => this.addClientRecordModal = e}
          wrappedComponentRef={(form) => this.addClientRecordModal = form}
          // ref="addClientRecordModal"
          dataSource={this.state.tempData}
          shareStatus={this.state.shareStatus}
          searchArr={this.state.searchArr}
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
