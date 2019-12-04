import React, { Component } from 'react';
import moment from 'moment';
import { hourFormat, yearFormat } from '../../constants';
import {getAllFirms} from '../../actions/firm';
import { Modal, Form, Input, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, DatePicker, InputNumber } from 'antd';
const { TextArea } = Input;
const { Option } = Select;
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
const mapStateToProps = state => ({
  allFirmsList: state.firm.allFirmsList
});
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    getAllFirms
  },
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
  componentWillMount(){
    this.props.getAllFirms();
  }
  handleSubmit = e => {
    e.preventDefault();
    const { dataSource } = this.props;
    this.props.form.validateFieldsAndScroll((err, values) => {
      const seriesData = Object.assign({}, {
        resourceId: values.clientId,
        resourceName: values.clientName,
        info: values.remark,
        createDate: moment(values.dealDate).format(yearFormat),
        employeeName: values.employeeName,
        employeeId: dataSource.employeeId,
      });
      this.props.addNewFormData(seriesData);
    });
    this.props.form.resetFields();
    // 提交成功，关闭模态框
    this.setState({
      visible: false,
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
                        initialValue: 'Liz',
                      })(<Input disabled style={{ maxWidth: 200 }} />)}
                    </Form.Item>
                  </Col>
                </Row>
                <hr style={{ marginTop: 20 }} />
                <Row style={{ marginTop: 20 }}>
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
                <Row style={{ marginTop: 20 }}>
                  <Col span={12}>
                    <Form.Item label="成交总额：">
                      {getFieldDecorator('orderPaySum', {
                        initialValue: dataSource ? dataSource.orderPaySum : null,
                      })(<div><InputNumber min={1} style={{ maxWidth: 200 }} />  元</div>)}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="成交企业：">
                      {getFieldDecorator('dealFirmName', {
                      })(
                        <Select style={{ width: 200 }}>
                          {
                            allFirmsList.map(item => {
                            <Option value={item.id}>{item.compamyName}</Option>
                            })
                          }
                        </Select>
                      )}
                    </Form.Item>
                  </Col>
                </Row>
                <Row style={{ marginTop: 20 }}>
                  <Form.Item label="备注：">
                    {getFieldDecorator('remark', {
                      initialValue: dataSource ? dataSource.remark : null,
                    })(<TextArea placeholder="textarea with clear icon" rows={4} />)}
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