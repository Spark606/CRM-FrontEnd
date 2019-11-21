import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { Breadcrumb} from 'antd';
import './style.scss';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, DatePicker, Radio } from 'antd';
const { TextArea } = Input;
const { Option } = Select;

const AutoCompleteOption = AutoComplete.Option;



const mapStateToProps = state => ({
  documentTitle: state.layout.documentTitle,
});
const mapDispatchToProps = dispatch => bindActionCreators(
  {},
  dispatch
);
@connect(mapStateToProps, mapDispatchToProps)
class ClientsNew extends Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    genders: 1
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  componentWillMount() {
  }
  handleReset = () => {
    this.props.form.resetFields();
  };
  onChangeGenders = e => {
    console.log('radio checked', e.target.value);
    this.setState({
      genders: e.target.value,
    });
  };

  render() {
    const options = [
      {
        value: 'zhejiang',
        label: 'Zhejiang',
        children: [
          {
            value: 'hangzhou',
            label: 'Hangzhou',
            children: [
              {
                value: 'xihu',
                label: 'West Lake',
              },
            ],
          },
        ],
      },
      {
        value: 'jiangsu',
        label: 'Jiangsu',
        children: [
          {
            value: 'nanjing',
            label: 'Nanjing',
            children: [
              {
                value: 'zhonghuamen',
                label: 'Zhong Hua Men',
              },
            ],
          },
        ],
      },
    ];
    
    return (
      <div className="container">
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>个人客户</Breadcrumb.Item>
          <Breadcrumb.Item>添加个人客户</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{ padding: 24, background: '#fff', minHeight: 360}}>
          <Form onSubmit={this.handleSubmit} style={{textAlign: 'left'}}>
            <Row>
              <Col span={12}>
                获得客户时间：<DatePicker/>
              </Col>
              <Col span={12}>
                负责人： Liz           
              </Col>
            </Row>
            <hr style={{marginTop: 20}}/>
            <Row style={{marginTop: 20}}>
              <Col span={12}>
                客户名：<Input style={{maxWidth: 200}} />
              </Col>
              <Col span={12}>
                手机号：<Input style={{maxWidth: 200}} />
              </Col>
            </Row>
            <Row style={{marginTop: 20}}>
              <Col span={12}>
                证书及专业：<Input style={{maxWidth: 200}} />
              </Col>
              <Col span={12}>
                到期时间：<DatePicker/>
              </Col>
            </Row>
            <Row style={{marginTop: 20}}>
              <Col span={12}>注册省份：<Cascader defaultValue={['zhejiang', 'hangzhou', 'xihu']} options={options} style={{maxWidth: 200}}/></Col>
              <Col span={12}>QQ：<Input style={{maxWidth: 200}} /></Col>
            </Row>
            <Row style={{marginTop: 20}}>
              <Col span={12}>性别：
              <Radio.Group onChange={this.onChangeGenders} value={this.state.genders}>
                <Radio value={1}>女</Radio>
                <Radio value={2}>男</Radio>
              </Radio.Group>
              </Col>
              <Col span={12}>邮箱：<Input style={{maxWidth: 200}} /></Col>
            </Row>
            <Row style={{marginTop: 20}}>
                <Col span={24} className="marker">
                  备注：<TextArea placeholder="textarea with clear icon" rows={4} style={{maxWidth: 400}}/>
                </Col>
            </Row>
            <Row style={{marginTop: 20}}>
              <Col span={12}>客户状态：<Input style={{maxWidth: 200}} /></Col>
              <Col span={12}>所在城市：<Cascader defaultValue={['zhejiang', 'hangzhou', 'xihu']} options={options} style={{maxWidth: 200}}/></Col>
            </Row>
            <Row style={{marginTop: 20}}>
              <Col span={24} style={{ textAlign: 'left' }}>
                <Button type="primary" htmlType="submit">
                  提交
                </Button>
                <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
                  重置
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    );
  }
}
export default  Form.create()(ClientsNew);