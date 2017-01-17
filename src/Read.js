import React, { Component } from 'react';
import Event from './Event';

class Read extends Component {
  render() {
    return (
      <div className='container'>
        <div className="read">
        </div>
      </div>
    );
  }
}

export default Read;

/*  <div className="people-list">
    {people.map((person, index) => (
      <p key={index}>
        <Link to={`/people/${index + 1}`}>{person.name}</Link>
      </p>
    ))}
  </div>  */

  /*    onChange={(event) => changeCurrentEvent(event)}  */

  /* {Object.keys(Events).map((key) => <div key={key} value={key}>{Events[key].name}</div>)}
      */
