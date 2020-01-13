import React, { Component } from 'react';
import { Upload, Icon, message, Button, Modal } from 'antd';
import PackageJSON from '../../../package.json';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './style.scss';
const mapStateToProps = state => ({
  pageSize: state.todo.pageSize
});
const mapDispatchToProps = dispatch => bindActionCreators(
  {
  },
  dispatch
);
@connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })
class UpLoadPage extends Component {
  state = {
    hasUploadMsg: false,
    uploadType: 'success',
    uploadMsg: '',
    uploading: false,
  }
  componentWillMount() {
    this.onInit();
  }
  onInit = () => {
  }
  handleUploadSuccess = (info) => {
    const { exceptionRow , repeatRow , successRow } = info.file.response.data;
    const that = this;
    this.setState({ uploading: false });
    if (exceptionRow.length === 0 && repeatRow.length === 0 && successRow > 0) {
      this.setState({
        hasUploadMsg: true,
      });
      Modal.success({
        content: (<span>
          <h4>导入成功！</h4>
          <div>本次成功导入资源总数: {successRow}条。</div>
        </span>),
        onOk() {
          that.props.getNewPage({
            searchText: that.props.searchText,
            searchType: that.props.searchType,
            shareStatus: that.props.shareStatus,
            page: 1,
            pageSize: that.props.pageSize
          });
        }
      });
    }
    // 有成功有失败
    if ((exceptionRow.length > 0 || repeatRow.length > 0) && successRow > 0) {
      this.setState({
        hasUploadMsg: true,
      });
      Modal.warning({
        content: (<span>
          <h4>导入成功！</h4>
          {repeatRow.length > 0 ? <div>重复资源{repeatRow.length}条，位于 ({_.toString(repeatRow)})</div> : null}
          {exceptionRow.length > 0 ? <div>格式错误{exceptionRow.length}条，位于 ({_.toString(exceptionRow)})</div> : null}
          <div>本次成功导入资源总数: {successRow}条。</div>
        </span>),
        onOk() {
          that.props.getNewPage({
            searchText: that.props.searchText,
            searchType: that.props.searchType,
            shareStatus: that.props.shareStatus,
            page: 1,
            pageSize: that.props.pageSize
          });
        }
      });
    }
    // 全部失败
    if ((exceptionRow.length > 0 || repeatRow.length > 0) && successRow === 0) {
      this.setState({
        hasUploadMsg: true,
      });
      Modal.error({
        content: (<span>
          <h4>导入失败！ </h4>
          {repeatRow.length > 0 ? <div>重复资源{repeatRow.length}条，位于 ({_.toString(repeatRow)})</div> : null}
          {exceptionRow.length > 0 ? <div>格式错误{exceptionRow.length}条，位于 ({_.toString(exceptionRow)})</div> : null}
        </span>)
      });
    }
  }

  handleUploading = () => {
    this.setState({
      uploading: true
    });
  }

  handleUploadError = (info) => {
    message.error('导入失败！');
    this.setState({
      uploading: false,
      hasUploadMsg: true,
    });
  }

  render() {
    const token = localStorage.getItem("sessions")
    const that = this;
    const uploadProps = {
      name: 'file',
      action: `${PackageJSON.proxy}/crm/upload/${this.props.getAPI}`,
      headers: {
        Authorization: `Bearer ${token}`.trim(),
        // 'Content-Type': 'multipart/form-data',
      },
      showUploadList: false,
      onChange(info) {
        console.log(info)
        if (info.file.status === 'uploading') {
          that.handleUploading();
        }
        if (info.file.status === 'done') {
          that.handleUploadSuccess(info);
        }
        if (info.file.status === 'error') {
          that.handleUploadError(info);
        }
      },
    };
    return (
      <div style={{ display: 'inline-block' }}>
        <Upload {...uploadProps}>
          <Button type="primary" onClick={this.upLoad}> {
            !this.state.uploading ?
              <span><Icon type="upload" /> 导入</span>
              :
              <span>正在导入<Icon type="loading" /></span>
          }</Button>
        </Upload>
      </div>
    )
  }
}
export default UpLoadPage;