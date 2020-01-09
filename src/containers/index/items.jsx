import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import _ from 'lodash';
import {Row, Col, Table, Button, Icon} from 'antd';
import {connect} from 'react-redux';
import { getIndexItems } from '../../actions/api';

const mapStateToProps = state => ({
  sessions: state.sessions,
  indexItems: state.pcdm.indexItems
});
const mapDispatchToProps = dispatch => bindActionCreators({
   getIndexItems
}, dispatch);

@connect(mapStateToProps, mapDispatchToProps)
export default class IndexItemList extends Component {
  componentWillMount() {
    // clearInterval();
    this.props.getIndexItems({page: 1, size: 30});
  }
  handleOnRowClick = (record) => {
    const {onRow} = this.props;
    if(onRow) {
      onRow(record);
    }
  }
  handleAutomaticGenerated = () => {
    const {onGenerated} = this.props;
    if(onGenerated) {
      onGenerated();
    }
  }
  render() {
    const {indexItems} = this.props;
    const items1 = _.slice(indexItems, 0, 10);
    const items2 = _.slice(indexItems, 10, 20);
    const items3 = _.slice(indexItems, 20, 30);
    const columns = [{
      title: 'Description',
      dataIndex: 'description',
      render: (text) => (
        <div className="d-rec-text" title={text}>{text}</div>
      )
    }, {
      title: 'Pack Size',
      dataIndex: 'pack_size',
      render: (text) => (
        <div className="p-rec-text" title={text}>{text}</div>
      )
    }, {
      title: '',
      render: (record) => (
        <div>
          {
            record.is_checked ? <Icon type="check" className="i-check" /> : <Icon type="check" className="i-un-check" />
          }
        </div>
      )
    }];
    return (
      <div className="ny-index-table">
        <div style={{marginTop: 16, marginBottom: 12}}>
          <Row>
            <Col span={12}>
              <h3>Select Items (from featured vendors)</h3>
            </Col>
            <Col span={12} style={{textAlign: 'right'}}>
              <Button className="pi-btn" onClick={this.handleAutomaticGenerated}>Create Inquiry</Button>
            </Col>
          </Row>
        </div>
        <Row gutter={16} className="ny-index-row">
          <Col sm={24} lg={8}>
            <Table style={{marginTop: '10px'}}
              rowKey="id"
              columns={columns}
              className="ny-item-tbl-1"
              bordered={false}
              rowClassName={(record) => record.is_checked && 'ny-tbl-tr-select' || 'ny-tbl-tr'}
              onRow={(record) => {
                const item = record;
                return {
                  onClick: () => this.handleOnRowClick(item),
                };
              }}
              dataSource={items1}
              pagination={false}
            />
          </Col>
          <Col sm={24} lg={8}>
            <Table style={{marginTop: '10px'}}
              columns={columns}
              rowKey="id"
              className="ny-item-tbl-2"
              dataSource={items2}
              bordered={false}
              pagination={false}
              rowClassName={(record) => record.is_checked && 'ny-tbl-tr-select' || 'ny-tbl-tr'}
              onRow={(record) => {
                const item = record;
                return {
                  onClick: () => this.handleOnRowClick(item),
                };
              }}
            />
          </Col>
          <Col sm={24} lg={8}>
            <Table style={{marginTop: '10px'}}
              columns={columns}
              rowKey="id"
              dataSource={items3}
              className="ny-item-tbl-3"
              pagination={false}
              bordered={false}
              rowClassName={(record) => record.is_checked && 'ny-tbl-tr-select' || 'ny-tbl-tr'}
              onRow={(record) => {
                const item = record;
                return {
                  onClick: () => this.handleOnRowClick(item),
                };
              }}
            />
          </Col>
        </Row>
      </div>
    );
  }
}
