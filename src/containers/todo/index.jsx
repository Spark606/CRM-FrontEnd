import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Breadcrumb, Tabs } from 'antd';
const { TabPane } = Tabs;
const mapStateToProps = state => ({
  documentTitle: state.layout.documentTitle,
});
const mapDispatchToProps = dispatch => bindActionCreators(
  {},
  dispatch
);
@connect(mapStateToProps, mapDispatchToProps)
export default class TodoPage extends Component {
  state = {
  }
  componentWillMount() {
  }

  render() {
    return (
      <div className="container">
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>待办事项</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
          <Tabs defaultActiveKey="updateClient" tabPosition="left">
            <TabPane tab="修改个人客户" key="updateClient">
              Content of tab updateClient
            </TabPane>
            <TabPane tab="修改企业客户" key="updateFirm">
              Content of tab updateFirm
            </TabPane>
            <TabPane tab="删除个人客户" key="deleteClient">
              Content of tab deleteClient
            </TabPane>
            <TabPane tab="删除企业客户" key="deleteFirm">
              Content of tab deleteFirm
            </TabPane>
            <TabPane tab="回款订单审批" key="payment">
              Content of tab payment
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
}
