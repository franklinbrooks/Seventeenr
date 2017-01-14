import React, { Component } from 'react';


class Create extends Component {
  render() {
    return (
      <div className='container'>
      <div className="create">
        className=create Add an event
        <div className="addevent">
          <input type='textarea' className="textbox" placeholder='Add an event' />
        </div>
      </div>
      </div>
    );
  }
}

export default Create;
