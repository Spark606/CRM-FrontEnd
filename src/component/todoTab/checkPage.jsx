import React, { Component } from 'react';
import moment from 'moment';
import { hourFormat, yearFormat } from '../../constants';
import { Table, Icon, Divider, Popover, Select } from 'antd';
const { Option } = Select;
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
const mapStateToProps = state => ({
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
      pageSize: 2
    });
  }
  handleCheckStatus = (e) => {
    this.setState({
      checkedStatus: e
    });
    this.props.getTodoList({
      checkedStatus: e,
      page: 1,
      pageSize: 2
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
    return (
      <div>
        <Select defaultValue={0} style={{ width: 120 }} onChange={this.handleCheckStatus}>
          <Option value={0}>待审核</Option>
          <Option value={1}>已审核</Option>
        </Select>
        <Table rowKey={record => record.id}
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