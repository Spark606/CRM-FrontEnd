import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Breadcrumb, Table, Input, Button, Icon, Divider } from 'antd';
import Highlighter from 'react-highlight-words';
import _ from 'lodash';
import WrapEditClientModal from '../../component/editClientModal';
import AddRecordModal from '../../component/addRecordModal';
import { getClients, getRecordsList } from '../../actions/api';

const mapStateToProps = state => ({
  documentTitle: state.layout.documentTitle,
  clientsList: state.client.clientsList,
  oneClientRecord: state.client.oneClientRecord
});
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    getClients,
    getRecordsList
  },
  dispatch
);
@connect(mapStateToProps, mapDispatchToProps)

export default class ClientsTable extends Component {
  state = {
    searchText: '',
    visible: false,
    tempData: null,
  };
  componentWillMount() {
    this.onInit();
  }
  onInit = () => {
    this.props.getClients({
      page: 1,
      size: 10000,
    });
  }
  // 表头查询
  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          查询
        </Button>
        <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          重置
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text => (
      <Highlighter
        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        searchWords={[this.state.searchText]}
        autoEscape
        textToHighlight={text.toString()}
      />
    ),
  });

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  // 表头查询end

  // 新建客户
  addNewClient = (e) => {
    this.setState({
      tempData: null
    });
    this.formEditClientModal.showModal();
  };
  addNewFormData = (values) => {
    values.key = this.state.data.length + 1;
    console.log(values, 'xxxxxxxxxxxxxx');
    let arr = this.state.data;
    arr.unshift(values)
    // 提交新的数据，并获得新row，加到data数组前部
    this.setState({
      data: arr
    });
  }
  // 新建客户end
  // 修改客户
  editClient = (record) => {
    this.setState({
      tempData: record
    });
    this.formEditClientModal.showModal();
  }
  updateFormData = (values) => {
    // 更新数据后，也将原始state里的数据更新
    const newData = _.map(this.state.data, e => {
      if (e.key === values.key) {
        return values;
      } else {
        return e;
      }
    });
    console.log(newData, 'cccccccccccccccccccc');
    this.setState({
      data: newData
    })
  }
  // 修改客户end
  // 删除客户
  deleteClient = (record) => {
    // 提交删除请求，更新页面
    const newData = _.filter(this.state.data, e => {
      if (e.key !== record.key) {
        return e;
      }
    });
    this.setState({
      data: newData
    })
  }
  // 删除客户end

  // 跟进记录
  addRecord = (record) => {
    this.refs["addRecordModal"].showModal();
    this.props.getRecordsList(record.key);
    // 打开跟进记录，并编辑
  }

  render() {
    const { clientsList, recordsList } = this.props;
    const columns = [
      {
        width: 120,
        title: '客户名称',
        dataIndex: 'clientName',
        key: 'clientName',
        fixed: 'left',
        ...this.getColumnSearchProps('clientName'),
      },
      {
        width: 200,
        title: '证书及专业',
        dataIndex: 'certificate',
        key: 'certificate',
        ...this.getColumnSearchProps('certificate'),
      },
      {
        // width: 200,
        title: '备注',
        dataIndex: 'remarks',
        key: 'remarks',
        ...this.getColumnSearchProps('remarks'),
      },
      {
        width: 100,
        title: '省份',
        dataIndex: 'province',
        key: 'province',
        ...this.getColumnSearchProps('province'),
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
        filters: [{ text: 1, value: '潜在' }, { text: 2, value: '意向' }, { text: 3, value: '成交' }, { text: 4, value: '失败' }, { text: 5, value: '已流失' }],
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
      },
      {
        width: 150,
        title: '电话',
        dataIndex: 'tel',
      },
      {
        width: 150,
        title: '获得客户时间',
        dataIndex: 'getClientTime',
        filterMultiple: false,
        sorter: (a, b) => a.getClientTime - b.getClientTime,
        sortDirections: ['descend', 'ascend'],
      },
      {
        width: 150,
        title: '到期时间',
        dataIndex: 'expireDate',
        filterMultiple: false,
        sorter: (a, b) => a.expireDate - b.expireDate,
        sortDirections: ['descend', 'ascend'],
      },
      {
        width: 100,
        title: '经办人',
        dataIndex: 'agent',
      },
      {
        width: 150,
        title: '操作',
        key: 'operation',
        fixed: 'right',
        render: (record) => <span>
          <a onClick={() => this.editClient(record)}><Icon type="edit" /></a>
          <Divider type="vertical" />
          <a onClick={() => this.deleteClient(record)}><Icon type="delete" /></a>
          <Divider type="vertical" />
          <a onClick={() => this.addRecord(record)}><Icon type="snippets" /></a>
        </span>,
      },
    ];
    return (
      <div className="container">
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>个人客户</Breadcrumb.Item>
          <Breadcrumb.Item>个人客户表</Breadcrumb.Item>
        </Breadcrumb>
        <Button type="primary" onClick={this.addNewClient} className="addBtn">
          新建
        </Button>
        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
          <Table rowKey={record => record.key} columns={columns} dataSource={clientsList} scroll={{ x: 1800 }} />
        </div>
        {/* 新建客户模态框 */}
        <WrapEditClientModal
          wrappedComponentRef={(form) => this.formEditClientModal = form}
          dataSource={this.state.tempData}
          addNewFormData={this.addNewFormData}
          updateFormData={this.updateFormData}
        />
        {/* 新建跟进记录模态框 */}
        <AddRecordModal
          ref="addRecordModal"
        />
      </div>
    );
  }
}
