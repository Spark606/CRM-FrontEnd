import React, { Component } from 'react';
import moment from 'moment';
import { hourFormat, yearFormat } from '../../constants';
import { Table, Icon, Divider } from 'antd';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
const mapStateToProps = state => ({
  firmsList: state.firm.firmsList
});
const mapDispatchToProps = dispatch => bindActionCreators(
  {
  },
  dispatch
);
@connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })
class PayMent extends Component {
componentWillMount(){
  console.log('PayMent page init');
}
  render() {
    return (
      <div></div>
    )
  }
}
export default PayMent;