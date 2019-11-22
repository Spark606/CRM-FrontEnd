import React, { Component } from 'react';
import { Modal, Button, Timeline} from 'antd';
class AddRecordModal extends Component {
  state = {
    visible: false,
    dataSource: this.props.dataSource
  };
  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };
  handleOk = () => {
    this.setState({
      visible: false,
    });
  }
  render() {
    const { dataSource } = this.props;
    console.log(dataSource, 'AddRecordModal');
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
          <Timeline>
            <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
            <Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item>
            <Timeline.Item>Technical testing 2015-09-01</Timeline.Item>
            <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
          </Timeline>
        </div>
      </Modal>
    );
  }
}

export default AddRecordModal;