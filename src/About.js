import React from 'react';

const About = () => (
  <p className="about">
    This is an about page rendered with ReactRouter.
    <br />
    <br />
    Facebook is great about reminding you of birthdays - on the same day.  <br />
    What if you forgot to pick up a gift?  And what about all of your friends and family who don't use FB?
    <br />
    Wouldn't it be great to see all your events on the horizon?
<br />
    And what if you are not able to complete your plans for that day?
<br />
    If you track your events on Google Calendar, they do not persist beyond their scheduled date.
<br />
<br />
Seventeenr is a single-page desktop app to help you keep track of holidays and other events in 2017. It uses Axios API calls to a Firebase server which allow the user full CRUD functionality over a collection of events which will persist until the user deletes them.
<br />
<br />
  </p>
);

export default About;

// This is an example of a React Stateless Functional Component
// and a SinglePageApplication rendered with ReactRouter
