import React from 'react';
import { Link } from 'react-router';

const Header = () => (
  <div className="App-header">
    <h2>Seventeenr</h2>
    <p>A simple way to keep track of important upcoming events in your life.</p>
      <div>
        <Link
          to="/"
          activeOnlyWhenExact
          activeClassName="active"
        >
          Home
        </Link>
      </div>
      <div>
        <Link
          to="/About"
          activeOnlyWhenExact
          activeClassName="active"
        >
          About
        </Link>
      </div>
  </div>
);

export default Header;

// This is an example of a React Stateless Functional Component
