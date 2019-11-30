import React, { Component } from 'react';
import moment from 'moment';
import { yearFormat } from '../../constants';
import { Table, Icon, Divider, Popover} from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {getUpdateFirmsList} from '../../actions/todo';
const mapStateToProps = state => ({
  updateFirmsList: state.todo.updateFirmsList,
  userRole: state.sessions.user_role
});
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    getUpdateFirmsList
  },
  dispatch
);
@connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })
class UpdateFirm extends Component {
  componentWillMount(){
    console.log('UpdateFirm page init');
    this.onInit();
  }
  onInit = () => {
    this.props.getUpdateFirmsList({
      page: 1,
      pageSize: 2
    });
  }
  render() {
    const { userRole } = this.props;
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
          if (userRole === 1) {
            return (
              <span>
                <a onClick={() => this.handlePass(record)}>
                  <Popover content={(<span>审批</span>)} trigger="hover">
                  <Icon type="check-circle" />
                  </Popover>
                </a>
                <Divider type="vertical" />
                <a onClick={() => this.handleSendBack(record)}>
                  <Popover content={(<span>退回</span>)} trigger="hover">
                  <Icon type="close-circle" />
                  </Popover>
                </a>
              </span>)
          } else {
            return (
              <span>
                <a onClick={() => this.handleWithWdraw(record)}>
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
      <Table rowKey={record => record.firmId ? record.firmId : Math.random()}
        columns={columns}
        dataSource={this.props.updateFirmsList}
        scroll={{ x: 1800 }} />
    )
  }
}
export default UpdateFirm;