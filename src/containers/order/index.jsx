import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Breadcrumb, Table, Select, Button, Tabs } from 'antd';
const { TabPane } = Tabs;
const ButtonGroup = Button.Group;
const { Option } = Select;
import moment from 'moment';
import { hourFormat, yearFormat } from '../../constants';
import WrapAddOrderBackModal from '../../component/addOrderBackModal';
import { getOrderList, getOrderBackDetail, deleteOrder } from '../../actions/order';
import './style.scss'
const mapStateToProps = state => ({
  clientOrdersList: state.order.clientOrdersList,
  firmOrdersList: state.order.firmOrdersList,
  currentPage: state.order.currentPage,
  pageTotal: state.order.pageTotal,
  pageSize: state.order.pageSize,
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    deleteOrder,
    getOrderList,
    getOrderBackDetail
  },
  dispatch
);

@connect(mapStateToProps, mapDispatchToProps)
export default class OrderTable extends Component {
  state = {
    orderType: 1, // 1个人订单
    isCompleted: '0', // 0未完成
    tempData: null,
  }
  componentWillMount() {
    this.onInit();
  }
  onInit = () => {
    this.props.getOrderList({
      orderType: this.state.orderType,
      isCompleted: this.state.isCompleted,
      page: 1,
      pageSize: this.props.pageSize
    });
  }
  handleCheckType = (e) => {
    this.setState({
      orderType: e
    });
    this.props.getOrderList({
      orderType: e,
      isCompleted: this.state.isCompleted,
      page: 1,
      pageSize: this.props.pageSize
    });
  }
  handleGetOrderByFulfillStatus = (key) => {
    console.log(key)
    this.setState({
      isCompleted: key
    });
    this.props.getOrderList({
      orderType: this.state.orderType,
      isCompleted: key,
      page: 1,
      pageSize: this.props.pageSize
    });
  }

  //删除订单
  handledeleteOrder = (record) => {
    this.props.deleteOrder({
      businessId: record.orderId,
      orderType: this.state.orderType,
    }, this.state.orderType, this.props.currentPage, this.props.pageSize);
  }

  handleAddOrderBack = (record) => {
    this.setState({
      tempData: record
    });
    this.props.getOrderBackDetail({
      orderType: this.state.orderType,
      businessId: record.orderId
    });
    this.addOrderBackModal.showModal();
  }

  pageChange = (page, pageSize) => {
    this.props.getOrderList({
      orderType: this.state.orderType,
      isCompleted: this.state.isCompleted,
      page: page,
      pageSize: pageSize
    });
  }
  openAddModal = (e) => {
    this.setState({
      tempData: null
    });
    this.formAddAccountModal.showModal();
  };
  render() {
    const { clientOrdersList, firmOrdersList, pageSize, currentPage, pageTotal } = this.props;
    const pagination = {
      pageSize: pageSize,
      current: currentPage,
      total: pageTotal,
      onChange: (a, b) => { this.pageChange(a, b); }
    };
    const clientOrderColumns = [
      {
        width: 250,
        title: '订单编号',
        dataIndex: 'orderId',
        key: 'orderId',
        fixed: 'left',
        render: (text, record) => <span>{text ? <a onClick={() => this.handleAddOrderBack(record)}>{text}</a> : '--'}</span>,
      },
      {
        width: 120,
        title: '客户名称',
        dataIndex: 'clientName',
        key: 'clientName',
        render: text => <span>{text ? text : '--'}</span>,
      },
      {
        width: 200,
        title: '企业名称',
        dataIndex: 'firmName',
        key: 'firmName',
        render: text => <span>{text ? text : '--'}</span>,
      },
      {
        width: 100,
        title: '成交总额',
        dataIndex: 'orderPaySum',
        key: 'orderPaySum',
        render: text => <span>{text ? text : '--'}</span>,
      },
      {
        // width: 200,
        title: '备注',
        dataIndex: 'remark',
        key: 'remark',
        render: text => <span>{text ? text : '--'}</span>,
      },
      {
        width: 150,
        title: '成交时间',
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
        width: 200,
        title: '操作',
        key: 'operation',
        fixed: 'right',
        render: (record) => <ButtonGroup>
          <Button onClick={() => this.handleAddOrderBack(record)}>添加回款</Button>
          <Button onClick={() => this.handledeleteOrder(record)}>删除</Button>
        </ButtonGroup>,
      },
    ];

    const firmOrderColumns = [
      {
        width: 250,
        title: '订单编号',
        dataIndex: 'orderId',
        key: 'orderId',
        fixed: 'left',
        render: (text, record) => <span>{text ? <a onClick={() => this.handleAddOrderBack(record)}>{text}</a> : '--'}</span>,
      },
      {
        width: 200,
        title: '企业名称',
        dataIndex: 'firmName',
        key: 'firmName',
        render: text => <span>{text ? text : '--'}</span>,
      },
      // {
      //   width: 120,
      //   title: '客户名称',
      //   dataIndex: 'clientLists',
      //   key: 'clientLists',
      //   render: text => {
      //     if (text) {
      //       const temp = text.map(e => {
      //         return <Button>{e.resourceName}</Button>
      //       });
      //       return temp;
      //     } else {
      //       return '--'
      //     }
      //   },
      // },
      {
        width: 100,
        title: '成交总额',
        dataIndex: 'orderPaySum',
        key: 'orderPaySum',
        render: text => <span>{text ? text : '--'}</span>,
      },
      {
        // width: 200,
        title: '备注',
        dataIndex: 'remark',
        key: 'remark',
        render: text => <span>{text ? text : '--'}</span>,
      },
      {
        width: 150,
        title: '成交时间',
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
        render: (record) => <ButtonGroup>
          <Button onClick={() => this.handleAddOrderBack(record)}>添加回款</Button>
          <Button onClick={() => this.handledeleteOrder(record)}>删除</Button>
        </ButtonGroup>,
      },
    ];

    return (
      <div className="container">
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>订单汇总表</Breadcrumb.Item>
        </Breadcrumb>

        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
          <Select defaultValue={1} style={{ width: 130, position: 'absolute', zIndex: '99' }} onChange={this.handleCheckType}>
            <Option value={1}>个人客户订单</Option>
            <Option value={2}>企业客户订单</Option>
          </Select>
          <Tabs defaultActiveKey={this.state.isCompleted} onChange={this.handleGetOrderByFulfillStatus} className="status-wrap" type="card">
            <TabPane tab="未完成" key="0">
              <Table style={{ marginTop: '10px' }} size="small" rowKey={record => record.orderId ? record.orderId : Math.random()}
                columns={this.state.orderType === 1 ? clientOrderColumns : firmOrderColumns}
                dataSource={this.state.orderType === 1 ? clientOrdersList : firmOrdersList}
                pagination={pagination}
              />
            </TabPane>
            <TabPane tab="已完成" key="1">
              <Table style={{ marginTop: '10px' }} size="small" rowKey={record => record.orderId ? record.orderId : Math.random()}
                columns={this.state.orderType === 1 ? clientOrderColumns : firmOrderColumns}
                dataSource={this.state.orderType === 1 ? clientOrdersList : firmOrdersList}
                pagination={pagination}
              />
            </TabPane>
          </Tabs>
          <WrapAddOrderBackModal
            wrappedComponentRef={(form) => this.addOrderBackModal = form}
            orderType={this.state.orderType}
            dataSource={this.state.tempData}
          />
        </div>
      </div>
    );
  }
}
