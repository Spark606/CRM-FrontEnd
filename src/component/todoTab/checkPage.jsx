import React, { Component } from 'react';
import moment from 'moment';
import { hourFormat, yearFormat } from '../../constants';
import { Table, Icon, Divider, Select } from 'antd';
const { Option } = Select;
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
const mapStateToProps = state => ({
  pageSize: state.todo.pageSize
});
const mapDispatchToProps = dispatch => bindActionCreators(
  {
  },
  dispatch
);
@connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })
class CheckPage extends Component {
  state = {
    checkedStatus: 0,
  }
  componentWillMount() {
    this.onInit();
  }
  onInit = () => {
    this.props.getTodoList({
      checkedStatus: 0,
      page: 1,
      pageSize: this.props.pageSize
    });
  }
  handleCheckStatus = (e) => {
    this.setState({
      checkedStatus: e
    });
    this.props.getTodoList({
      checkedStatus: e,
      page: 1,
      pageSize: this.props.pageSize
    });
  }
  pageChange = (page, pageSize) => {
    this.props.getTodoList({
      checkedStatus: this.state.checkedStatus,
      page: page,
      pageSize: pageSize,
    });
  }
  render() {
    const { pageSize, currentPage, pageTotal } = this.props;
    const pagination = {
      pageSize: pageSize,
      current: currentPage,
      total: pageTotal,
      onChange: (a, b) => { this.pageChange(a, b); }
    };
    if (this.state.checkedStatus===1)
    {
      this.props.columns.pop();
      this.props.columns.push({
        width: 100,
        title: '审核情况',
        key: 'operation',
        fixed: 'right',
        render: (record) => {
          if (parseInt(record.checkedStatus) === 1) {
            return (
              <span>已通过 </span>)
          } else {
            return (
              <span>已拒绝</span>)
          }
        }
      })
    }
    return (
      <div>
        <Select defaultValue={0} style={{ width: 120 }} onChange={this.handleCheckStatus}>
          <Option value={0}>待审核</Option>
          <Option value={1}>已审核</Option>
        </Select>
        <Table size="small" rowKey={record => record.id}
          columns={this.props.columns}
          dataSource={this.props.dataSource}
          scroll={{ x: 1800 }}
          pagination={pagination}
        />
      </div>
    )
  }
}
export default CheckPage;