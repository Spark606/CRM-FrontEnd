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
    const { badFormat = [1], noRepeat = [1], success = [] } = info.file.response;
    this.setState({ uploading: false });
    if ((badFormat.length === 0 || noRepeat.length === 0) && success.length > 0) {
      this.setState({
        hasUploadMsg: true,
      });
      Modal.success({
        content: (<span>
          <h4>导入成功！</h4>
          <div>本次成功导入资源总数: {success.length}条。</div>
        </span>),
        onOk() {
          this.props.getNewPage({
            searchText: this.props.searchArr,
            shareStatus: this.props.shareStatus,
            page: 1,
            pageSize: this.props.pageSize
          });
        }
      });
    }
    // 有成功有失败
    if ((badFormat.length > 0 || noRepeat.length > 0) && success.length > 0) {
      this.setState({
        hasUploadMsg: true,
      });
      Modal.warning({
        content: (<span>
          <h4>导入成功！</h4>
          {noRepeat.length > 0 ? <div>重复资源{noRepeat.length}条，位于 ({_.toString(_.orderBy(_.map(noRepeat, ds => ds.row)))})</div> : null}
          {badFormat.length > 0 ? <div>格式错误{badFormat.length}条，位于 ({_.toString(_.orderBy(_.map(badFormat, ds => ds.row)))})</div> : null}
          <div>本次成功导入资源总数: {success.length}条。</div>
        </span>),
        onOk() {
          this.props.getNewPage({
            searchText: this.props.searchArr,
            shareStatus: this.props.shareStatus,
            page: 1,
            pageSize: this.props.pageSize
          });
        }
      });
    }
    // 全部失败
    if ((badFormat.length > 0 || noRepeat.length > 0) && success.length === 0) {
      this.setState({
        hasUploadMsg: true,
      });
      Modal.error({
        content: (<span>
          <h4>导入失败！ </h4>
          {noRepeat.length > 0 ? <div>重复资源{noRepeat.length}条，位于 ({_.toString(_.orderBy(_.map(noRepeat, ds => ds.row)))})</div> : null}
          {badFormat.length > 0 ? <div>格式错误{badFormat.length}条，位于 ({_.toString(_.orderBy(_.map(badFormat, ds => ds.row)))})</div> : null}
        </span>)
      });
    }
    // this.onInitVendors();
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
      action: `${PackageJSON.proxy}/crm/employee/test`,
      headers: {
        Authorization: `Bearer ${token}`.trim(),
      },
      showUploadList: false,
      onChange(info) {
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