import React, { Component } from 'react';
import moment from 'moment';
import { hourFormat, yearFormat, yearAndHourFormat } from '../../constants';
import { Modal, Form, Input, Row, Col, Checkbox, Button, Tabs, DatePicker, Radio, Select, Table } from 'antd';
const { Option } = Select;
const { TextArea } = Input;
const { TabPane } = Tabs;
import { updateOneFirm, getFirms } from '../../actions/firm';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
const mapStateToProps = state => ({
  pageSize: state.firm.pageSize,
  currentPage: state.firm.currentPage,
  firmOrdersList: state.firm.firmOrdersList,
  oneOrderBackList: state.firm.oneOrderBackList,
});
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    updateOneFirm,
    getFirms
  },
  dispatch
);
@connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })
class EditFirmModal extends Component {
  state = {
    visible: false,
    confirmDirty: false,
    autoCompleteResult: [],
    genders: 1,
    activeTab: '1'
  };
  handleSubmit = e => {
    e.preventDefault();
    const { dataSource } = this.props;
    this.props.form.validateFieldsAndScroll((err, values) => {
      const seriesData = Object.assign({}, {
        companyName: values.firmName,
        companyCategory: values.category,
        createDate: moment(values.createDate).format(yearAndHourFormat),
        expireDate: moment(values.expireDate).format(yearAndHourFormat),
        contactorName: values.contact,
        status: values.status,
        info: values.remark,
        phoneNumber: values.tel,
        qq: values.qq,
        occupation: values.position,
        province: values.province,
        gender: values.gender,
        email: values.email,
        shareStatus: values.shareStatus,
      });
      if (!err) {
        if (this.props.userRole === '2') { //管理员
          seriesData.employeeId = values.employeeId;
        };
        if (dataSource) {
          // 修改数据，管理员直接values.employeeId，普通员工只能dataSource.employeeId,而且还得传resourceId
          if (this.props.userRole === '1') { //普通用户
            seriesData.employeeId = dataSource.employeeId;
          };
          seriesData.companyId = dataSource.firmId;
          this.props.updateOneFirm(seriesData,
            this.props.currentPage,
            this.props.pageSize,
            this.props.shareStatus,
            this.props.searchText,
            this.props.searchType,
            (currentPage, pageSize, shareStatus, searchText, searchType) => {
              this.handleCancel();
              this.props.getFirms({
                searchText: searchText,
                searchType: searchType,
                shareStatus: shareStatus,
                page: currentPage,
                pageSize: pageSize,
              });
            }); // 提交更新数据
        }
      }
    });

  };

  handleChangeTab = (e) => {
    this.setState({
      activeTab: e
    });
  }
  showModal = () => {
    this.setState({
      visible: true,
      activeTab: '1'
    });
  };

  handleCancel = e => {
    this.props.form.resetFields(); //重置表单并关闭模态框
    this.setState({
      visible: false,
      activeTab: '1'
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { dataSource, userRole, employeeList, firmOrdersList, oneOrderBackList } = this.props;

    const firmOrderColumns = [{
      width: 150,
      title: '订单编号',
      dataIndex: 'orderId',
      key: 'orderId',
      fixed: 'left',
      render: text => <span>{text ? text : '--'}</span>
    },
    {
      width: 120,
      title: '客户名称',
      dataIndex: 'clientLists',
      key: 'clientLists',
      render: text => {
        if (text) {
          const temp = text.map(e => {
            return <Button>{e.resourceName}</Button>
          });
          return temp;
        } else {
          return '--'
        }
      },
    },
    {
      width: 100,
      title: '成交总额',
      dataIndex: 'orderPaySum',
      key: 'orderPaySum',
      render: text => <span>{text ? text : '--'}</span>,
    },
    {
      width: 150,
      title: '成交时间',
      dataIndex: 'createDate',
      render: text => <span>{text ? moment(text).format(yearFormat) : '--'}</span>,
    },
    {
      // width: 200,
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
      render: text => <span>{text ? text : '--'}</span>,
    },
    {
      width: 100,
      title: '经办人',
      dataIndex: 'employeeName',
      render: text => <span>{text ? text : '--'}</span>,
    }
    ];
    const orderBackcolumns = [{
      width: 150,
      title: '订单编号',
      dataIndex: 'businessId',
      key: 'businessId',
      fixed: 'left',
      render: text => <span>{text ? text : '--'}</span>,
    }, {
      width: 150,
      title: '回款时间',
      dataIndex: 'laterBackDate',
      key: 'laterBackDate',
      render: text => <span>{text ? text : '--'}</span>,
    }, {
      width: 140,
      title: '回款金额（元）',
      dataIndex: 'laterBackPay',
      key: 'laterBackPay',
      fixed: 'left',
      render: text => <span>{text ? text : '--'}</span>,
    }, {
      width: 180,
      title: '备注',
      dataIndex: 'info',
      key: 'info',
      fixed: 'left',
      render: text => <span>{text ? text : '--'}</span>,
    }, {
      width: 120,
      title: '录入人',
      dataIndex: 'employeeName',
      key: 'employeeName',
      fixed: 'left',
      render: text => <span>{text ? text : '--'}</span>,
    }, {
      width: 150,
      title: '录入时间',
      dataIndex: 'recordDate',
      key: 'recordDate',
      fixed: 'left',
      render: text => <span>{text ? text : '--'}</span>,
    }
    ];
    return (
      <div>
        <Modal
          title={!dataSource ? "添加企业客户" : "修改企业客户"}
          width={820}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={false}
        >
          <div className="container">
            <Tabs defaultActiveKey={this.state.activeTab} onChange={this.handleChangeTab}>
              <TabPane tab="修改客户" key="1">
                <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                  <Form id="formBox" onSubmit={this.handleSubmit} style={{ textAlign: 'left' }}>
                    <Row>
                      <Col span={12}>
                        <Form.Item label="获得客户时间：">
                          {getFieldDecorator('createDate', {
                            initialValue: dataSource ? moment(dataSource.createDate) : moment(),
                            rules: [{ required: true, message: '请输入获得客户时间。' }],
                          })(<DatePicker format={yearFormat} />)}
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        {
                          userRole === '2' ?
                            //管理员
                            <Form.Item label="负责人：">
                              {getFieldDecorator('employeeId', {
                                initialValue: dataSource ? dataSource.employeeId : this.props.userId, // 管理员修改显示原本的employeeId,新建默认填自己的userId
                                rules: [{ required: true, message: '请输入负责人。' }],
                              })(
                                <Select style={{ width: 120 }}>
                                  {employeeList.map((item) =>
                                    <Option key={item.employeeId}>
                                      {item.employeeName}
                                    </Option>
                                  )}
                                </Select>)}
                            </Form.Item>
                            :
                            // 普通员工
                            <Form.Item label="负责人：">
                              {getFieldDecorator('employeeId', {
                                initialValue: dataSource ? dataSource.employeeName : this.props.userName, // 普通员工，不为空时为修改，为空时为新建
                                rules: [{ required: true, message: '请输入负责人。' }],
                              })(<Input disabled style={{ maxWidth: 200 }} />)}
                            </Form.Item>
                        }
                      </Col>
                    </Row>

                    <hr />
                    <Row>
                      <Col span={12}>
                        <Form.Item label="企业名称：">
                          {getFieldDecorator('firmName', {
                            initialValue: dataSource ? dataSource.firmName : null,
                            rules: [{ required: true, message: '请填写企业名称。' }],
                          })(<Input style={{ maxWidth: 200 }} />)}
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item label="到期时间：">
                          {getFieldDecorator('expireDate', {
                            initialValue: dataSource ? moment(dataSource.expireDate) : moment(),
                            rules: [{ required: true, message: '请填写客户到期时间。' }],
                          })(<DatePicker format={yearFormat} />)}
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row>
                      {/* <Col span={12}>
                        <Form.Item label="客户状态：">
                          {getFieldDecorator('status', {
                            initialValue: dataSource ? dataSource.status : 1
                          })(
                            <Select style={{ width: 120 }}>
                              <Option value={1}>潜在客户</Option>
                              <Option value={2}>意向客户</Option>
                              <Option value={3}>成交客户</Option>
                              <Option value={4}>失败客户</Option>
                              <Option value={5}>已流失客户</Option>
                            </Select>
                          )}
                        </Form.Item>
                      </Col> */}
                      <Col span={12}>
                        <Form.Item label="所在城市：">
                          {getFieldDecorator('province', {
                            initialValue: dataSource ? dataSource.province : null,
                          })(<Input style={{ maxWidth: 200 }} />)}
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item label="资源状态：">
                          {getFieldDecorator('shareStatus', {
                            initialValue: dataSource ? dataSource.shareStatus : 2,
                          })(
                            <Select style={{ width: 120 }}>
                              <Option value={1}>公有资源</Option>
                              <Option value={2}>私有资源</Option>
                            </Select>)}
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row>
                      <Form.Item label="备注：">
                        {getFieldDecorator('remark', {
                          initialValue: dataSource ? dataSource.remark : null,
                        })(<TextArea rows={4} />)}
                      </Form.Item>
                    </Row>
                    <hr />
                    <Row>
                      <Col span={12}>
                        <Form.Item label="联系人：">
                          {getFieldDecorator('contact', {
                            initialValue: dataSource ? dataSource.contact : null,
                            rules: [{ required: true, message: '请输入联系人。' }],
                          })(<Input style={{ maxWidth: 200 }} />)}
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item label="手机号：">
                          {getFieldDecorator('tel', {
                            initialValue: dataSource ? dataSource.tel : null,
                            rules: [{ required: true, message: '请填写联系人手机号。' }],
                          })(<Input style={{ maxWidth: 200 }} />)}
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={12}>
                        <Form.Item label="职务：">
                          {getFieldDecorator('position', {
                            initialValue: dataSource ? dataSource.position : null,
                            rules: [{ required: true, message: '请输入联系人职位。' }],
                          })(<Input style={{ maxWidth: 200 }} />)}
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item label="QQ：">
                          {getFieldDecorator('qq', {
                            initialValue: dataSource ? dataSource.qq : null,
                          })(<Input style={{ maxWidth: 200 }} />)}
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={12}>
                        <Form.Item label="性别：">
                          {getFieldDecorator('gender', {
                            initialValue: dataSource ? dataSource.gender : 1
                          })(
                            <Radio.Group onChange={this.onChangeGenders} >
                              <Radio value={1}>女</Radio>
                              <Radio value={2}>男</Radio>
                            </Radio.Group>
                          )}
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item label="邮箱：">
                          {getFieldDecorator('email', {
                            initialValue: dataSource ? dataSource.email : null,
                            rules: [
                              { type: 'email', message: '请输入正确邮箱！' }
                            ],
                          })(<Input style={{ maxWidth: 200 }} />)}
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row style={{ textAlign: 'right' }}>
                      <Col>
                        <Button key="back" onClick={this.handleCancel}> 关闭</Button>
                        <Button key="submit" htmlType="submit" type="primary" form="formBox" onClick={this.handleSubmit} style={{ marginLeft: '10px' }}>提交</Button>
                      </Col>
                    </Row>
                  </Form>
                </div>
              </TabPane>
              <TabPane tab="历史成交" key="2">
                <Table style={{ marginTop: '10px' }} size="small" rowKey={record => record.orderId ? record.orderId : Math.random()}
                  columns={firmOrderColumns}
                  dataSource={firmOrdersList}
                  scroll={{ y: 300 }}
                  pagination={false}
                />
              </TabPane>
              <TabPane tab="回款记录" key="3">
                <Table style={{ marginTop: '10px' }} size="small" rowKey={record => record.id ? record.id : Math.random()}
                  columns={orderBackcolumns}
                  dataSource={oneOrderBackList}
                  scroll={{ y: 300 }}
                  pagination={false}
                />
              </TabPane>
            </Tabs>
          </div>
        </Modal>
      </div>
    );
  }
}
const wrapEditFirmModal = Form.create()(EditFirmModal);

export default wrapEditFirmModal;