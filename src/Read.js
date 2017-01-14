import React, { Component } from 'react';
import Event from './Event';

class Read extends Component {
  render() {
    return (
      <div className='container'>
      <div className="read">
        className=read Events will display here
        <Event />
      </div>
      </div>
    );
  }
}

export default Read;
