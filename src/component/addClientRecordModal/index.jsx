import React, { Component } from 'react';
import { Modal, Form, Button, Timeline, TimePicker, DatePicker, Select, Row, Col, Input, Divider } from 'antd';
const { TextArea } = Input;
import moment from 'moment';
import { hourFormat, yearFormat } from '../../constants';
import { addNewClientRecord, getClients } from '../../actions/client';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
const mapStateToProps = state => ({
  oneClientRecord: state.client.oneClientRecord,
  pageSize: state.client.pageSize,
  currentPage: state.client.currentPage,
});
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    addNewClientRecord,
    getClients
  },
  dispatch
);
@connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })

class AddClientRecordModal extends Component {
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
    this.props.getClients({
      searchText: this.props.searchText,
      searchType: this.props.searchType,
      shareStatus: this.props.shareStatus,
      page: this.props.currentPage,
      pageSize: this.props.pageSize,
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
          createDate: `${moment(values.recordTimeDay).format(yearFormat)} ${moment(values.recordTimeHour).format(hourFormat)}`,
          resourceId: this.props.dataSource.clientId,
          resourceName: this.props.dataSource.clientName,
          status: 1,
          content: values.recordContent ? values.recordContent : null
        });
        this.props.addNewClientRecord(data);
      });
      this.setState({
        editBox: false,
      });
    }
  }
  render() {
    const { editBox } = this.state;
    const { oneClientRecord, dataSource } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <Modal
        title="个人跟进记录"
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
                    <Form.Item style={{ position: 'absolute', right: '75px', top: '39px' }}>
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
                    })(<TextArea rows={4} />)}
                  </Form.Item>
                </Row>
              </Form>
            </div>
            : null}
          <hr />
          <Timeline style={{ maxHeight: '500px', overflowY: 'scroll', padding: '10px 0' }}>
            {oneClientRecord ? oneClientRecord.map(item =>
              <Timeline.Item  key={`hd-${item.key ? item.key : Math.random()}`}>
                {item.createDate}  {item.content}  {item.employeeName}
              </Timeline.Item>
            )
              :
              "NO DATA"}
          </Timeline>
        </div>
      </Modal>
    );
  }
}

const wrapAddClientRecordModal = Form.create()(AddClientRecordModal);

export default wrapAddClientRecordModal;