import React, {Component} from 'react';
// import './style.scss';

export default class NotFindPage extends Component {
  componentWillMount() {
    clearInterval();
  }
  handleToHome = () => {
    // history.go('/');
    window.location.href = '/';
  }
  render() {
    return (
      <div className="no-page">
        页面走丢了~
      </div>
    );
  }
}