import React, { Component } from 'react';
import { Modal, Form, Button, Timeline, TimePicker, DatePicker, Select, Row, Col, Input, Divider } from 'antd';
const { TextArea } = Input;
import moment from 'moment';
import {hourFormat, yearFormat} from '../../constants';
import {addNewFirmRecord} from '../../actions/firm';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
const mapStateToProps = state => ({
  oneClientRecord: state.client.oneClientRecord,
  oneClientStatus: state.client.oneClientStatus
});
const mapDispatchToProps = dispatch => bindActionCreators(
  {
  },
  dispatch
);
@connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })

class AddFirmRecordModal extends Component {
  state = {
    visible: false,
    editBox: false,
    recorderDate: "",
    recorderHour: ""
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
  handleEditBox = (e) => {
    e.preventDefault();
    if (!this.state.editBox) {
      this.setState({
        editBox: true,
      });
    } else {
      this.props.form.validateFieldsAndScroll((err, values) => {
        const data = Object.assign({}, {
          createDate: `${ moment(values.recordTimeDay).format(yearFormat)} ${ moment(values.recordTimeHour).format(hourFormat)}`,
          resourceId: this.props.dataSource.clientId,
          status: values.status,
          content: values.recordContent
        });
        this.props.addNewFirmRecord(data);
      });
      this.setState({
        editBox: false,
      });
    }
  }
  render() {
    const { recorderDate, recorderHour, editBox } = this.state;
    const { oneClientRecord, oneClientStatus } = this.props;
    const { getFieldDecorator } = this.props.form;
    // console.log(oneClientRecord, 'AddFirmRecordModal');
    return (
      <Modal
        title="企业跟进记录"
        width={820}
        visible={this.state.visible}
        onCancel={this.handleCancel}
        footer={[
          <Button key="back" onClick={this.handleCancel}>
            关闭
          </Button>
        ]}
      >
        <div className="container">
          <Button type="primary" htmlType="submit" form="formBox" onClick={this.handleEditBox}>{editBox ? '提交' : '写跟进'}</Button>
          {editBox ?
            <div>
              <Form id="formBox" onSubmit={this.handleSubmit} style={{ textAlign: 'left' }}>
                <Row>
                  <Col span={12}>
                    <Form.Item label="跟进时间：">
                      {getFieldDecorator('recordTimeDay', {
                        initialValue: moment(),
                        rules: [{ required: true, message: '请输入跟进时间。' }],
                      })(<DatePicker format={yearFormat} />)}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item>
                      {getFieldDecorator('recordTimeHour', {
                        initialValue: moment(),
                        rules: [{ required: true, message: '请输入跟进时间。' }],
                      })(<TimePicker />)}
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Form.Item label="跟进结果：">
                    {getFieldDecorator('recordContent', {
                    })(<TextArea placeholder="textarea with clear icon" rows={4} style={{ maxWidth: 400 }} />)}
                  </Form.Item>
                </Row>
                <Row>
                  <Form.Item label="客户状态：">
                    {getFieldDecorator('status', {
                      initialValue: 1 // 获取当前客户的状态
                    })(
                      <Select style={{ width: 120 }}>
                        <Select.Option value={1}>潜在客户</Select.Option>
                        <Select.Option value={2}>意向客户</Select.Option>
                        <Select.Option value={3}>成交客户</Select.Option>
                        <Select.Option value={4}>失败客户</Select.Option>
                        <Select.Option value={5}>已流失客户</Select.Option>
                      </Select>
                    )}
                  </Form.Item>
                </Row>
              </Form>
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

const wraFirmpAddRecordModal = Form.create()(AddFirmRecordModal);

export default wraFirmpAddRecordModal;