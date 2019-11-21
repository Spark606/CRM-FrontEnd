import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { Breadcrumb, Table, Input, Button, Icon, Divider} from 'antd';
import Highlighter from 'react-highlight-words';
import EditClentModal from '../../component/editClientModal';
const data = [
  {
    key: '1',
    name: 'John Brown',
    certificate: '一级房建转加造价初',
    remarks: 'New York No. 1 Lake Park',
    expireDate: '2010-12-24',
    tel: '17844537359',
    qq: '1105394023',
    agent: 'Liz',
    province: '四川',
    gender: '女',
    email: 'lizbaby606@163.com',
  },
  {
    key: '2',
    name: 'Joe Black',
    certificate: '一级房建转加造价初',
    remarks: 'London No. 1 Lake Park',
    expireDate: '2020-12-24',
    tel: '17844537359',
    qq: '1105394023',
    agent: 'Liz',
    province: '四川',
    gender: '女',
    email: 'lizbaby606@163.com',
  },
  {
    key: '3',
    name: 'Jim Green',
    certificate: '一级房建转加造价初',
    remarks: 'Sidney No. 1 Lake Park',
    expireDate: '2020-12-24',
    tel: '17844537359',
    qq: '1105394023',
    agent: 'Liz',
    province: '四川',
    gender: '女',
    email: 'lizbaby606@163.com',
  },
  {
    key: '4',
    name: 'Jim Red',
    certificate: '一级房建转加造价初',
    remarks: 'London No. 2 Lake Park',
    expireDate: '2020-12-24',
    tel: '17844537359',
    qq: '1105394023',
    agent: 'Liz',
    province: '四川',
    gender: '女',
    email: 'lizbaby606@163.com',
  },
];
const mapStateToProps = state => ({
  documentTitle: state.layout.documentTitle,
});
const mapDispatchToProps = dispatch => bindActionCreators(
  {},
  dispatch
);
@connect(mapStateToProps, mapDispatchToProps)

export default class ClientsTable extends Component {
  componentWillMount() {
  }
  state = {
    searchText: '',
    visible: false,
    optionsTemp: null
  };

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
  showModal = (e) => {
    this.refs['EditClentModal'].showModal(e);
  };
  onSaving = (values) => {
    this.props.addCategory(values).then(() => this.onInitCategory());
  }
  onModalClose = () => {
    this.props.setUIElement('pcdm', 'isCategoryModalOpen', false);
  }
  editClient = (record) => {
    this.setState({
      optionsTemp: record
    });
    this.refs['EditClentModal'].showModal(record);
  }
  deleteClient = (record) => {
    console.log(record);
  }
  render() {
    const columns = [
      {
        width: '100',
        title: '客户名称',
        dataIndex: 'name',
        key: 'name',
        fixed: 'left',
        ...this.getColumnSearchProps('name'),
      },
      {
        width: '300',
        title: '证书及专业',
        dataIndex: 'certificate',
        key: 'certificate',
        ...this.getColumnSearchProps('certificate'),
      },
      {
        width: '400',
        title: '备注',
        dataIndex: 'remarks',
        key: 'remarks',
        ...this.getColumnSearchProps('remarks'),
      },
      {
        width: '50',
        title: '省份',
        dataIndex: 'province',
        key: 'province',
        ...this.getColumnSearchProps('province'),
      },
      {
        width: '10',
        title: '性别',
        dataIndex: 'gender',
        filters: [{ text: '男', value: '男' }, { text: '女', value: '女' }],
      },
      {
        width: '250',
        title: '邮箱',
        dataIndex: 'email',
      },
      {
        width: '150',
        title: '电话',
        dataIndex: 'tel',
      },
      {
        width: '150',
        title: '到期时间',
        dataIndex: 'expireDate',
        filterMultiple: false,
        sorter: (a, b) => a.expireDate - b.expireDate,
        sortDirections: ['descend', 'ascend'],
      },
      {
        width: '40',
        title: '经办人',
        dataIndex: 'agent',
      },
      {
        width: '50',
        title: '操作',
        key: 'operation',
        fixed: 'right',
        render: (record) => <span>
          <a onClick={() => this.editClient(record)}><Icon type="edit" /></a>
          <Divider type="vertical" />
          <a onClick={() => this.deleteClient(record)}><Icon type="delete" /></a>
          </span>,
      },
    ];
    return (
      <div className="container">
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>个人客户</Breadcrumb.Item>
          <Breadcrumb.Item>个人客户表</Breadcrumb.Item>
        </Breadcrumb>
        <Button type="primary" onClick={this.showModal} className="addBtn">
          新建
        </Button>
        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
          <Table columns={columns} dataSource={data} scroll={{ x: 1500}} />
        </div>
        <EditClentModal
          ref="EditClentModal"
          options={this.state.optionsTemp}
          onCancel={this.onModalClose}
          onSaving={this.onSaving}
          />
      </div>
    );
  }
}
