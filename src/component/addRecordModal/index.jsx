import React, { Component } from 'react';
import { Modal, Button, Timeline, TimePicker, DatePicker, Select, Row, Col, Input,  } from 'antd';
const { TextArea } = Input;
import moment from 'moment';
const format = 'HH:mm';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
const mapStateToProps = state => ({
  oneClientRecord: state.client.oneClientRecord
});
const mapDispatchToProps = dispatch => bindActionCreators(
  {
  },
  dispatch
);
@connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })

class AddRecordModal extends Component {
  state = {
    visible: false,
    editBox: false,
  };
  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  handleCancel = e => {
    this.setState({
      visible: false,
      editBox: false,
    });
  };
  handleOk = () => {
    this.setState({
      visible: false,
    });
  }
  openEditBox = () => {
    this.setState({
      editBox: true,
    });
  }
  render() {
    const { oneClientRecord } = this.props;
    console.log(oneClientRecord, 'AddRecordModal');
    return (
      <Modal
        title="跟进记录"
        width={820}
        visible={this.state.visible}
        onCancel={this.handleCancel}
        footer={[
          <Button key="back" onClick={this.handleCancel}>
            关闭
            </Button>,
          <Button key="submit" htmlType="submit" type="primary" form="formBox" onClick={this.handleOk}>
            提交
            </Button>,
        ]}
      >
        <div className="container">
          <Button type="primary" onClick={this.openEditBox}>{this.state.editBox ? '提交' : '写跟进'}</Button>
          {this.state.editBox ?
            <div>
              <Row>
                <Col>跟进时间：</Col>
                <Col><DatePicker /><TimePicker defaultValue={moment('12:08', format)} format={format} /></Col>
              </Row>
              <Row>
                <Col>跟进结果：</Col>
                <Col> <TextArea rows={4} /></Col>
              </Row>
              <Row>
                <Col>客户状态：</Col>
                <Col>
                  <Select style={{ width: 120 }} defaultValue={1}>
                    <Select.Option value={1}>潜在客户</Select.Option>
                    <Select.Option value={2}>意向客户</Select.Option>
                    <Select.Option value={3}>成交客户</Select.Option>
                    <Select.Option value={4}>失败客户</Select.Option>
                    <Select.Option value={5}>已流失客户</Select.Option>
                  </Select>
                </Col>
              </Row>
            </div>
            : null}
            <hr />
          <Timeline>
            {oneClientRecord.map(item => <Timeline.Item key={`hd-${item.key ? item.key : Math.random()}`}>{item.content} {item.recorderTime} {item.recorderName}</Timeline.Item>)}
          </Timeline>
        </div>
      </Modal>
    );
  }
}

export default AddRecordModal;