import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Breadcrumb, Table, Input, Button, Icon, Divider, Select } from 'antd';
const { Option } = Select;
import Highlighter from 'react-highlight-words';
import _ from 'lodash';
import moment from 'moment';
import { hourFormat, yearFormat } from '../../constants';
import WrapEditFirmModal from '../../component/editFirmModal';
import AddFirmRecordModal from '../../component/addFirmRecordModal';
import AddFirmOrderModal from '../../component/addFirmOrderModal';
import UpLoadModal from '../../component/uploadModal';
import { getFirms, getFirmRecordsList, deleteFirm, addNewFirmOrder, updateFirmShareStatus } from '../../actions/firm';
import { getAllClients } from '../../actions/client';
import { getEmployeeList } from '../../actions/api';
import './style.scss';
const mapStateToProps = state => ({
  documentTitle: state.layout.documentTitle,
  firmsList: state.firm.firmsList,
  oneFirmRecord: state.firm.oneFirmRecord,
  currentPage: state.firm.currentPage,
  pageTotal: state.firm.pageTotal,
  pageSize: state.firm.pageSize,
  allClientsList: state.client.allClientsList,
  userId: state.sessions.user_Id,
  userRole: state.sessions.user_role,
  userName: state.sessions.user_name,
  employeeList: state.sessions.employeeList
});
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    getFirms,
    getFirmRecordsList,
    deleteFirm,
    getAllClients,
    addNewFirmOrder,
    getEmployeeList,
    updateFirmShareStatus
  },
  dispatch
);
@connect(mapStateToProps, mapDispatchToProps)

export default class FirmsTable extends Component {
  state = {
    searchText: '',
    searchArr: [],
    visible: false,
    tempData: null,
    shareStatus: 2,
    user_role: JSON.parse(localStorage.getItem("user")).user_role,
  };
  componentWillMount() {
    this.onInit();
  }
  onInit = () => {
    this.props.getAllClients();
    this.props.getFirms({
      searchText: this.state.searchArr,
      shareStatus: this.state.shareStatus,
      page: 1,
      pageSize: this.props.pageSize,
    });
    if(this.state.user_role === "2"){
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
    this.formEditFirmModal.showModal();
  };
  // 新建客户end
  // 修改客户
  handleEditFirm = (record) => {
    this.setState({
      tempData: record
    });
    this.formEditFirmModal.showModal();
  }
  // 修改客户end
  // 删除客户
  handledeleteFirm = (record) => {
    this.props.deleteFirm({ companyId: record.firmId }, this.props.currentPage, this.props.pageSize, this.state.shareStatus, this.state.searchArr);
  }
  // 删除客户end

  // 跟进记录
  handleAddRecord = (record) => {
    this.setState({
      tempData: record
    });
    this.addFirmRecordModal.showModal();
    this.props.getFirmRecordsList({
      companyId: record.firmId,
      page: 1,
      pageSize: 1000
    });
  }
  handleAddOrder = (record) => {
    this.setState({
      tempData: record
    });
    this.addFirmOrderModal.showModal();
    // 打开跟进记录，并编辑
  }
  pageChange = (page, pageSize = this.props.pageSize) => {
    this.props.getFirms({
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
    this.props.getFirms({
      searchText: this.state.searchArr,
      shareStatus: e,
      page: 1,
      pageSize: this.props.pageSize
    });
  }
  handleCheckOneStatus = (e) => {
    this.props.updateFirmShareStatus({
      companyId: e.firmId,
      shareStatus: e.shareStatus === 2 ? 1 : 2
    }, this.state.shareStatus, this.props.pageSize, this.state.searchArr);
  }
  render() {
    const { firmsList, pageSize, currentPage, pageTotal, allClientsList } = this.props;
    const pagination = {
      pageSize: pageSize,
      current: currentPage,
      total: pageTotal,
      onChange: (a, b) => { this.pageChange(a, b); }
    };
    const columns = [
      {
        width: 120,
        title: '公司名称',
        dataIndex: 'firmName',
        key: 'firmName',
        fixed: 'left',
        render: (text, record) => (<span>{record ? 
          <a onClick={() => this.handleEditFirm(record)}>
            {text}
          </a>
        : '--'}</span>),
        // ...this.getColumnSearchProps('firmName', '公司名称', 'companyName'),
      },
      {
        width: 100,
        title: '类别',
        dataIndex: 'category',
        render: text => {
          if (text === 1) {
            return (<span>建筑业</span>)
          } else if (text === 2) {
            return (<span>农林牧渔</span>)
          } else if (text === 3) {
            return (<span>住宿餐饮</span>)
          } else if (text === 4) {
            return (<span>IT</span>)
          } else if (text === 5) {
            return (<span>金融业</span>)
          } else if (text === 6) {
            return (<span>房地产</span>)
          } else if (text === 7) {
            return (<span>政府机关</span>)
          } else if (text === 8) {
            return (<span>文体传媒</span>)
          } else if (text === 9) {
            return (<span>运输物流</span>)
          } else if (text === 10) {
            return (<span>商业服务</span>)
          } else if (text === 11) {
            return (<span>卫生医疗</span>)
          } else if (text === 12) {
            return (<span>教育培训</span>)
          } else if (text === 13) {
            return (<span>其他</span>)
          }
        }
      },
      {
        width: 100,
        title: '省份',
        dataIndex: 'province',
        key: 'province',
        render: text => <span>{text ? text : '--'}</span>,
      },
      {
        // width: 200,
        title: '备注',
        dataIndex: 'remark',
        key: 'remark',
        render: text => <span>{text ? text : '--'}</span>,
        // ...this.getColumnSearchProps('remark', '备注', 'info'),
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
        width: 150,
        title: '到期时间',
        dataIndex: 'expireDate',
        render: text => <span>{text ? moment(text).format(yearFormat) : '--'}</span>,
      },
      {
        width: 100,
        title: '联系人',
        dataIndex: 'contact',
        key: 'contact',
        render: text => <span>{text ? text : '--'}</span>,
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
          <a onClick={() => this.handleCheckOneStatus(record)}>
            {this.state.shareStatus === 2 ? <Button>转为公有资源</Button>: <Button>转为私有资源</Button>}
          </a>
          <a onClick={() => this.handleAddRecord(record)}>
            <Button>跟进</Button>
          </a>
          <a onClick={() => this.handleAddOrder(record)}>
            <Button>新建订单</Button>
          </a>
          <a onClick={() => this.handledeleteFirm(record)}>
            <Button>删除</Button>
          </a>
        </span>,
      },
    ];

    return (
      <div className="container">
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>企业客户表</Breadcrumb.Item>
        </Breadcrumb>
        <div className="addBtn">
          <UpLoadModal
            searchText={this.state.searchText}
            shareStatus={this.state.shareStatus}
            pageSize={this.props.pageSize}
            getNewPage={this.props.getFirms}
          />
          <Button type="primary" onClick={this.openAddModal} style={{ marginLeft: 20 }}> 新建 </Button>
        </div>
        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
          <Select defaultValue={this.state.shareStatus} style={{ width: 120 }} onChange={this.handleCheckStatus}>
            <Option value={1}>公有资源</Option>
            <Option value={2}>私有资源</Option>
          </Select>
          <Table rowKey={record => record.firmId ? record.firmId : Math.random()}
            columns={columns}
            dataSource={firmsList}
            scroll={{ x: 1800 }}
            pagination={pagination}
          />
        </div>
        {/* 新建客户模态框 */}
        <WrapEditFirmModal
          wrappedComponentRef={(form) => this.formEditFirmModal = form}
          dataSource={this.state.tempData}
          userRole={this.props.userRole}
          userId={this.props.userId}
          userName={this.props.userName}
          employeeList={this.props.employeeList}
          shareStatus={this.state.shareStatus}
          searchArr={this.state.searchArr}
        />
        {/* 新建跟进记录模态框 */}
        <AddFirmRecordModal
          // ref={(e) => this.addFirmRecordModal = e}
          wrappedComponentRef={(form) => this.addFirmRecordModal = form}
          dataSource={this.state.tempData}
          shareStatus={this.state.shareStatus}
          searchArr={this.state.searchArr}
        // ref="addFirmRecordModal"
        />
        {/* 新建订单模态框 */}
        <AddFirmOrderModal
          // ref={(e) => this.addFirmRecordModal = e}
          wrappedComponentRef={(form) => this.addFirmOrderModal = form}
          // ref="addFirmRecordModal"
          dataSource={this.state.tempData}
          addNewFirmOrder={this.props.addNewFirmOrder}
          allClientsList={allClientsList}
        />
      </div>
    );
  }
}
