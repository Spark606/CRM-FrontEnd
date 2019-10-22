import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import './style.scss';

const mapStateToProps = state => ({
  documentTitle: state.layout.documentTitle,
});
const mapDispatchToProps = dispatch => bindActionCreators(
  {},
  dispatch
);
@connect(mapStateToProps, mapDispatchToProps)
export default class HomePage extends Component {
  state = {
  }
  componentWillMount() {
  }

  render() {
    return (
      <div className="container">
        <div className="wrap">
          <header>

          </header>
          <div className="content">
            <aside></aside>
            <article></article>
          </div>
          <footer>

          </footer>
        </div>
      </div>
    );
  }
}
