import React, { Component } from 'react';
import { Breadcrumb, Tree, Form, Icon, Input, Button, Row, Col, Select, Radio, Card, Popconfirm } from 'antd';
import { bindActionCreators } from 'redux';
import { getEmployeeTree, getEmployeeDetail, getManagerEmployeeList, addNewEmployee, updateEmployee, deleteEmployee, restPassWord } from '../../actions/employee';
import { connect } from 'react-redux';
import './style.scss';
const { TreeNode } = Tree;
const mapStateToProps = state => ({
  isFetching: state.sessions.isFetching,
  userRole: state.sessions.user_role,
  userId: state.sessions.user_Id,
  employeeTree: state.employee.employeeTree,
  selectedEmployee: state.employee.selectedEmployee,
  managerEmployeeList: state.employee.managerEmployeeList
});
const mapDispatchToProps = dispatch => bindActionCreators({
  getEmployeeTree,
  getEmployeeDetail,
  getManagerEmployeeList,
  addNewEmployee,
  updateEmployee,
  restPassWord,
  deleteEmployee
}, dispatch);
@connect(mapStateToProps, mapDispatchToProps)

class EmployeePage extends Component {
  state = {
    selectedKeys: [],   //选择的树菜单
    employeeRole: '1', //默认为普通员工
    isEdit: true,
    selectedEmployee: null
  };

  componentWillMount() {
    this.onInit();
  }

  onInit = () => {
    this.props.getEmployeeTree();
    this.props.getManagerEmployeeList();
  }

  constructureTree(treeRoot) {
    return treeRoot.map(treeNode => {
      if (treeNode.team && treeNode.team.length > 0) {
        return <TreeNode icon={<Icon type='user' />} title={treeNode.employeeName} key={treeNode.employeeId}>
          {this.constructureTree(treeNode.team)}
        </TreeNode>
      } else {
        return <TreeNode icon={<Icon type='user' />} title={treeNode.employeeName} key={treeNode.employeeId} />
      }
    })
  }

  onSelect = (selectedKeys, info) => {
    this.closeEditBox();
    this.setState({ selectedKeys: selectedKeys });
    this.props.getEmployeeDetail({ employeeId: selectedKeys[0] }, () => { this.setState({ employeeRole: this.props.selectedEmployee.employeeRole }); })
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      const seriesData = Object.assign({}, {
        employeeId: values.employeeId,
        employeeName: values.employeeName,
        phoneNumber: values.employeePhone,
        // employeeRole: values.employeeRole,
        employeeRole: 1,
        // employeeManagerId: values.supEmployeeId,
        employeeManagerId: 0,
        email: values.employeeEmail,
      });

      if (!err) {
        if (this.state.selectedEmployee === null) {
          this.props.addNewEmployee(seriesData, () => {
            this.openEditBox();
            this.props.getEmployeeTree();
          });
        }
        else {
          this.props.updateEmployee(seriesData, () => {
            this.openEditBox();
            this.props.getEmployeeTree();
          });
        }
      }
    });
  };

  handleChangeType = e => {
    this.setState({ employeeRole: e.target.value });
  }

  openEditBox = e => {
    this.props.form.resetFields(); //重置表单并关闭模态框
    this.setState({
      isEdit: true,
      selectedEmployee: null,
      selectedKeys: [],
      employeeRole: '1'
    });
  }

  closeEditBox = e => {
    this.setState({
      isEdit: false,
      selectedEmployee: null,
      selectedKeys: []
    })
  }

  openEditBoxToUpdate = e => {
    this.setState({
      isEdit: true,
      selectedEmployee: this.props.selectedEmployee
    })
  }
  handleRestPassWord = e => {
    this.props.restPassWord({employeeId: this.props.selectedEmployee.employeeId});
  }
  deleteEmployee = e => {
    this.props.deleteEmployee({ employeeId: this.props.selectedEmployee.employeeId }, () => {
      this.openEditBox();
      this.props.getEmployeeTree();
    });
  }

  render() {
    const { employeeTree, managerEmployeeList } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { employeeRole, isEdit, selectedEmployee } = this.state;
    return (
      <div className="container">
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>员工管理</Breadcrumb.Item>
        </Breadcrumb>
        <Button type="primary" onClick={this.openEditBox} className="addBtn">
          新建员工
        </Button>
        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
          <Row>
            <Col span={12}>
              <Tree
                showLine
                showIcon
                defaultExpandAll
                selectedKeys={this.state.selectedKeys}
                switcherIcon={<Icon type="down" />}
                onSelect={this.onSelect}
                onRightClick={this.onRightClick}
                draggable
                className="hide-file-icon"
              >
                {employeeTree ? this.constructureTree(employeeTree) : null}
              </Tree>
            </Col>
            <Col span={12}>
              <div style={{ background: '#ECECEC', padding: '30px', height: "100%" }}>
                {/* 密码默认都是123456，或者根据电话号码发送密码短信 */}
                {isEdit ?
                  <Form id="formBox" style={{ textAlign: 'left' }}>
                    {
                      selectedEmployee === null ?
                        '新建员工' : '修改员工'
                    }
                    <hr />
                    <Row>
                      <Col span={12}>
                        <Form.Item label="员工姓名：">
                          {getFieldDecorator('employeeName', {
                            initialValue: selectedEmployee ? selectedEmployee.employeeName : "",
                            rules: [{ required: true, message: '请输入员工姓名。' }],
                          })(<Input style={{ maxWidth: 150 }} />)}
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        {
                          selectedEmployee ?
                            <Form.Item label="工 号：">
                              {getFieldDecorator('employeeId', {
                                initialValue: selectedEmployee ? selectedEmployee.employeeId : "",
                                rules: [{ required: true, message: '请输入工号。' }],
                              })(<Input style={{ maxWidth: 150 }} disabled />)}
                            </Form.Item>
                            :
                            <Form.Item label="工 号：">
                              {getFieldDecorator('employeeId', {
                                initialValue: selectedEmployee ? selectedEmployee.employeeId : "",
                                rules: [{ required: true, message: '请输入工号。' }],
                              })(<Input style={{ maxWidth: 150 }} />)}
                            </Form.Item>
                        }
                      </Col>
                    </Row>
                    <Row style={{ marginTop: 20 }}>
                      <Col span={12}>
                        <Form.Item label="电话：">
                          {getFieldDecorator('employeePhone', {
                            initialValue: selectedEmployee ? selectedEmployee.employeePhone : "",
                            rules: [{ required: true, message: '请输入员工手机号码。' }],
                          })(<Input style={{ maxWidth: 150 }} />)}
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item label="邮箱：">
                          {getFieldDecorator('employeeEmail', {
                            initialValue: selectedEmployee ? selectedEmployee.employeeEmail : "",
                            rules: [
                              {
                                type: 'email',
                                message: '请输入正确的邮箱!',
                              },
                              {
                                required: true,
                                message: '邮箱不能为空!',
                              }
                            ]
                          })(<Input style={{ maxWidth: 150 }} />)}
                        </Form.Item>
                      </Col>
                    </Row>
                    {/* <Row style={{ marginTop: 20 }}> */}
                      {/* <Col span={12}>
                        <Form.Item label="类别">
                          {getFieldDecorator('employeeRole', {
                            initialValue: selectedEmployee ? selectedEmployee.employeeRole : '1',
                            rules: [{ required: true, message: '请输入员工类别。' }],
                          })(
                            <Radio.Group onChange={this.handleChangeType}>
                              <Radio value={'1'}>普通员工</Radio>
                              <Radio value={'2'}>经理</Radio>
                            </Radio.Group>
                          )}
                        </Form.Item>
                      </Col> */}
                      {/* // 如果是普通员工，需要指导所属经理 */}
                      {/* <Col span={12} style={{ display: employeeRole === '1' ? 'block' : 'none' }}>
                        <Form.Item label="所属经理：">
                          {getFieldDecorator('supEmployeeId', {
                            // 管理员修改显示原本的employeeId,新建默认填自己的userId
                            initialValue: selectedEmployee ? selectedEmployee.supEmployeeId : this.props.userId,
                            rules: [{ required: true, message: '请输入所属经理。' }],
                          })(
                            <Select style={{ width: 120 }}>
                              {managerEmployeeList.map((item) =>
                                <Select.Option key={`${item.employeeId}`}>
                                  {item.employeeName}
                                </Select.Option>
                              )}
                            </Select>)}
                        </Form.Item>
                      </Col>
                    </Row> */}
                    <Button type="primary" htmlType="submit" onClick={this.handleSubmit}> 提交 </Button>
                  </Form>
                  :
                  <Card title={<span> {this.props.selectedEmployee.employeeRole === '1' ? '员工' : '经理'}  ： {this.props.selectedEmployee.employeeName}</span>} bordered={false} style={{}}>
                    <p>工 号：{this.props.selectedEmployee.employeeId}</p>
                    <p>职 务：{this.props.selectedEmployee.employeeRole === '1' ? '普通员工' : '经理'}</p>
                    {this.props.selectedEmployee.employeeRole === '1' ?
                      <p>所属经理：{this.props.selectedEmployee.supEmployeeName}</p>
                      : null}
                    <p>电 话：{this.props.selectedEmployee.employeePhone}</p>
                    <p>邮 箱：{this.props.selectedEmployee.employeeEmail}</p>

                    <Row type="flex" justify="center"  style={{ marginTop: '20px' }}>
                      <Col span={8}>
                        <Button type="primary" onClick={this.handleRestPassWord}>
                          重置密码
                        </Button>
                      </Col>
                      <Col span={8}>
                        <Button type="primary" onClick={this.openEditBoxToUpdate}>
                          修改
                        </Button>
                      </Col>
                      <Col span={8}>
                        <Popconfirm
                          title={<span>确定删除员工<b>{this.props.selectedEmployee.employeeName}</b> ？</span>}
                          onConfirm={this.deleteEmployee}
                          icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
                        >
                          <Button type="primary">
                            删除
                          </Button>
                        </Popconfirm>
                      </Col>
                    </Row>
                  </Card>
                }
              </div>
            </Col>
          </Row></div>
      </div>
    );
  }
}
const wrapEmployeePage = Form.create()(EmployeePage);

export default wrapEmployeePage;