import React, { Component } from 'react';
// import '../Ap.css';
// import '../Hidden.css';
// import Dictionary from './Dictionary';


class ShowTask extends Component {
  render () {
    return (
        <div>
          {this.props.task}
      </div>
    )
  }
}

export default ShowTask;
