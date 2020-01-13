import React, { Component } from 'react';
import { Modal, Form, Button, Timeline, TimePicker, DatePicker, Select, Row, Col, Input } from 'antd';
const { TextArea } = Input;
import moment from 'moment';
import {hourFormat, yearFormat} from '../../constants';
import {addNewFirmRecord, getFirms} from '../../actions/firm';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
const mapStateToProps = state => ({
  oneFirmRecord: state.firm.oneFirmRecord,
  pageSize: state.firm.pageSize,
  currentPage: state.firm.currentPage,
});
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    addNewFirmRecord,
    getFirms
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
    this.props.getFirms({
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
          createDate: `${ moment(values.recordTimeDay).format(yearFormat)} ${ moment(values.recordTimeHour).format(hourFormat)}`,
          companyId: this.props.dataSource.firmId,
          companyName: this.props.dataSource.firmName,
          status: 1,
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
    const { editBox } = this.state;
    const { oneFirmRecord, dataSource } = this.props;
    const { getFieldDecorator } = this.props.form;
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
                        initialValue: "", // 获取当前客户的状态
                    })(<TextArea rows={4}/>)}
                  </Form.Item>
                </Row>
              </Form>
            </div>
            : null}
          <hr />
          <Timeline style={{ maxHeight: '500px', overflowY: 'scroll' , padding: '10px 0' }}>
            {oneFirmRecord ? oneFirmRecord.map(item =>
               <Timeline.Item key={`hd-${item.key ? item.key : Math.random()}`}>
               {item.createDate} {item.content} {item.employeeName}
              </Timeline.Item>
              ) :
              "NO DATA"}
          </Timeline>
        </div>
      </Modal>
    );
  }
}

const wraFirmpAddRecordModal = Form.create()(AddFirmRecordModal);

export default wraFirmpAddRecordModal;