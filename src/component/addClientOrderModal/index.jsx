import React, { Component } from 'react';
import moment from 'moment';
import { hourFormat, yearFormat, yearAndHourFormat } from '../../constants';
import { Modal, Form, Input, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, DatePicker, InputNumber } from 'antd';
const { TextArea } = Input;
const { Option } = Select;
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  user_Id: state.sessions.user_Id,
  allFirmsList: state.firm.allFirmsList,
  user_name: state.sessions.user_name
});
const mapDispatchToProps = dispatch => bindActionCreators(
  {},
  dispatch
);
@connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })
class AddClientOrderModal extends Component {
  state = {
    visible: false,
    confirmDirty: false,
    autoCompleteResult: [],
    genders: 1,
  };
  handleSubmit = e => {
    e.preventDefault();
    const { dataSource } = this.props;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const seriesData = Object.assign({}, {
          resourceId: dataSource.clientId,
          info: values.remark,
          createDate: moment(values.dealDate).format(yearAndHourFormat),
          employeeId: this.props.user_Id,
          companyId: values.dealFirmName,
          orderPaySum: values.orderPaySum
        });
        this.props.addNewClientOrder(seriesData);
        this.props.form.resetFields();
        // 提交成功，关闭模态框
        this.setState({
          visible: false,
        });
      }
    });
  };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleCancel = e => {
    this.props.form.resetFields(); //重置表单并关闭模态框
    this.setState({
      visible: false,
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { dataSource, allFirmsList } = this.props;
    return (
      <div>
        <Modal
          title="新建订单"
          width={820}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              关闭
            </Button>,
            <Button key="submit" htmlType="submit" type="primary" htmlFor="formBox" onClick={(e) => this.handleSubmit(e)} >
              提交
            </Button>,
          ]}
        >
          <div className="container">
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              <Form id="formBox" style={{ textAlign: 'left' }}>
                <Row>
                  <Col span={12}>
                    <Form.Item label="负责人：">
                      {getFieldDecorator('employeeName', {
                        initialValue: this.props.user_name,
                      })(<Input disabled style={{ maxWidth: 200 }} />)}
                    </Form.Item>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col span={12}>
                    <Form.Item label="成交个人客户：">
                      {getFieldDecorator('clientName', {
                        initialValue: dataSource ? dataSource.clientName : null,
                      })(<Input disabled style={{ maxWidth: 200 }} />)}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="成交时间：">
                      {getFieldDecorator('dealDate', {
                        initialValue: dataSource ? moment(dataSource.dealDate) : moment(),
                        rules: [{ required: true, message: '请输入成交时间。' }],
                      })(<DatePicker format={yearFormat} />)}
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={12}>
                    <Form.Item label="成交总额：">
                      {getFieldDecorator('orderPaySum', {
                        initialValue: dataSource ? dataSource.orderPaySum : null,
                        rules: [{ required: true, message: '请输入成交总额。' }],
                      })(<InputNumber min={1} style={{ maxWidth: 200 }} />)}  元
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="成交企业：">
                      {getFieldDecorator('dealFirmName', {
                        rules: [{ required: true, message: '请选择成交公司。' }],
                      })(
                        <Select style={{ width: 200 }} placeholder="请选择成交公司">
                          {allFirmsList ? allFirmsList.map((item) =>
                            <Option key={item.companyId}>{item.companyName}</Option>
                          )
                            : null
                          }
                        </Select>
                      )}
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Form.Item label="备注：">
                    {getFieldDecorator('remark', {
                      initialValue: "",
                    })(<TextArea rows={4} />)}
                  </Form.Item>
                </Row>
              </Form>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}
const wrapAddClientOrderModal = Form.create()(AddClientOrderModal);

export default wrapAddClientOrderModal;