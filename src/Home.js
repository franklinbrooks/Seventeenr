import React from 'react';
import Create from './Create';
import Read from './Read';

const Home = () => (
  <div className="home">
    <Create />
    <div className='divider'> </div>
    <Read />
  </div>
);

export default Home;
