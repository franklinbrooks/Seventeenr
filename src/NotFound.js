import React from 'react';
import { Link } from 'react-router';

const NotFound = () => (
  <div className="not-found">
    <p>Error</p>
    <p>
      The page you requested was not found.
    </p>
      <div>
        <Link
          to="/"
          activeOnlyWhenExact
          activeClassName="active"
        >
          Home
        </Link>
      </div>
  </div>
);

export default NotFound;
