import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import { Breadcrumb, Tabs, Table, Icon, Divider } from 'antd';
import { hourFormat, yearFormat } from '../../constants';
import { getTodoList } from '../../actions/todo';
import UpdateFirm from '../../component/todoTab/updateFirm';
import UpdateClient from '../../component/todoTab/updateClient';
import DeleteFirm from '../../component/todoTab/deleteFirm';
import DeleteClient from '../../component/todoTab/deleteClient';
import Payment from '../../component/todoTab/payment';

const { TabPane } = Tabs;
const mapStateToProps = state => ({
  documentTitle: state.layout.documentTitle,
});
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    getTodoList
  },
  dispatch
);
@connect(mapStateToProps, mapDispatchToProps)
export default class TodoPage extends Component {
  render() {
    const {clientsList, firmsList} = this.props;
    return (
      <div className="container">
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>待办事项</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
          <Tabs defaultActiveKey="updateClient" tabPosition="left">
            <TabPane tab="修改个人客户" key="updateClient">
              <UpdateClient />
            </TabPane>
            <TabPane tab="修改企业客户" key="updateFirm">
              <UpdateFirm />
            </TabPane>
            <TabPane tab="删除个人客户" key="deleteClient">
              <DeleteClient />
            </TabPane>
            <TabPane tab="删除企业客户" key="deleteFirm">
              <DeleteFirm  />
            </TabPane>
            <TabPane tab="回款订单审批" key="payment">
              <Payment />
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
}
