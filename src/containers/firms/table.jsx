import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Breadcrumb, Table, Input, Button, Icon, Divider, Popover } from 'antd';
import Highlighter from 'react-highlight-words';
import _ from 'lodash';
import moment from 'moment';
import { hourFormat, yearFormat } from '../../constants';
import WrapEditFirmModal from '../../component/editFirmModal';
import AddFirmRecordModal from '../../component/addFirmRecordModal';
import AddFirmOrderModal from '../../component/addFirmOrderModal';
import { getFirms, getFirmRecordsList, updateOneFirm, addNewFirm, deleteFirm } from '../../actions/firm';

const mapStateToProps = state => ({
  documentTitle: state.layout.documentTitle,
  firmsList: state.firm.firmsList,
  oneFirmRecord: state.firm.oneFirmRecord,
  currentPage: state.firm.currentPage,
  pageTotal: state.firm.pageTotal,
  pageSize: state.firm.pageSize,
  user_role: state.sessions.user_role
});
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    getFirms,
    getFirmRecordsList,
    updateOneFirm,
    addNewFirm,
    deleteFirm
  },
  dispatch
);
@connect(mapStateToProps, mapDispatchToProps)

export default class FirmsTable extends Component {
  state = {
    searchText: '',
    visible: false,
    tempData: null,
  };
  componentWillMount() {
    this.onInit();
  }
  onInit = () => {
    this.props.getFirms({
      page: 1,
      pageSize: 2,
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
  openAddModal = (e) => {
    this.setState({
      tempData: null
    });
    this.formEditFirmModal.showModal();
  };
  addNewFormData = (values) => {
    // values.resourceId = this.state.data.length + 1;
    // console.log(values, 'xxxxxxxxxxxxxx');
    // let arr = this.state.data;
    // arr.unshift(values)
    this.props.addNewFirm(values);
    // 提交新的数据，并获得新row，加到data数组前部
    // this.setState({
    //   data: arr
    // });
  }
  // 新建客户end
  // 修改客户
  handleEditFirm = (record) => {
    this.setState({
      tempData: record
    });
    this.formEditFirmModal.showModal();
  }
  updateFormData = (values) => {
    // 更新数据后，也将原始state里的数据更新
    // const newData = _.map(this.state.data, e => {
    //   if (e.resourceId === values.resourceId) {
    //     return values;
    //   } else {
    //     return e;
    //   }
    // });
    this.props.updateOneFirm(values);
    // console.log(newData, 'cccccccccccccccccccc');
    this.setState({
      data: newData
    })
  }
  // 修改客户end
  // 删除客户
  handledeleteFirm = (record) => {
    this.props.deleteFirm({companyId: record.firmId}, this.props.currentPage,  this.props.pageSize, this.props.user_role);
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
    console.log("record", record);
    this.setState({
      tempData: record
    });
    this.addFirmOrderModal.showModal();
    // 打开跟进记录，并编辑
  }
  pageChange = (page, pageSize) => {
    console.log(page, pageSize);
    this.props.getFirms({
      page: page,
      pageSize: pageSize,
    });
  }
  render() {
    const { firmsList, pageSize, currentPage, pageTotal } = this.props;
    const pagination = {
      pageSize: pageSize,
      current: currentPage,
      total: pageTotal,
      onChange: (a, b) => { this.pageChange(a, b); }
    };
    console.log('firmsList', firmsList);
    const columns = [
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
        title: '类别',
        dataIndex: 'category',
        filters: [{
          value: 1, text: '科技'
        }, {
          value: 2, text: '其他'
        }],
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
        render: (record) => <span>
          <a onClick={() => this.handleEditFirm(record)}>
            <Popover content={(<span>修改</span>)} trigger="hover">
              <Icon type="edit" />
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
          <a onClick={() => this.handledeleteFirm(record)}>
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
          <Breadcrumb.Item>企业客户表</Breadcrumb.Item>
        </Breadcrumb>
        <Button type="primary" onClick={this.openAddModal} className="addBtn">
          新建
        </Button>
        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
          <Table rowKey={record => record.firmId ? record.firmId : Math.random()}
          columns={columns}
          dataSource={firmsList}
          scroll={{ x: 1800 }}
          onChange={this.handleTableChange}
          pagination={pagination}
          />
        </div>
        {/* 新建客户模态框 */}
        <WrapEditFirmModal
          wrappedComponentRef={(form) => this.formEditFirmModal = form}
          dataSource={this.state.tempData}
          addNewFormData={this.addNewFormData}
          updateFormData={this.updateFormData}
        />
        {/* 新建跟进记录模态框 */}
        <AddFirmRecordModal
          // ref={(e) => this.addFirmRecordModal = e}
          wrappedComponentRef={(form) => this.addFirmRecordModal = form}
          dataSource={this.state.tempData}
        // ref="addFirmRecordModal"
        />
        {/* 新建订单模态框 */}
        <AddFirmOrderModal
          // ref={(e) => this.addFirmRecordModal = e}
          wrappedComponentRef={(form) => this.addFirmOrderModal = form}
          // ref="addFirmRecordModal"
          dataSource={this.state.tempData}
        />
      </div>
    );
  }
}
