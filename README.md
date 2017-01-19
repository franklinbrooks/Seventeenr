# Seventeenr Scheduling Planner App

[Link to Trello:](https://trello.com/b/madxhpLU/seventeenr)

###My implementation of project
  ![Seventeenr Screenshot]( ) 

[Link to Live Site:]()
[Link to Trello:](https://trello.com/b/madxhpLU/seventeenr)

### Wireframes for project: 
  ![Wireframe 1: READ + CREATE](https://github.com/franklinbrooks/WDI_HAKUNA_MATATA/blob/master/projects/project2/seventeenr/images/20170113_115557.jpg)
  ![Wireframe 2: READ + UPDATE](https://github.com/franklinbrooks/WDI_HAKUNA_MATATA/blob/master/projects/project2/seventeenr/images/20170113_115612.jpg)
  ![Wireframe 3: READ + DELETE](https://github.com/franklinbrooks/WDI_HAKUNA_MATATA/blob/master/projects/project2/seventeenr/images/20170113_115654.jpg)

### Technologies Used
- HTML
- CSS
- JavaScript
- React
- React Router
- Axios 

<!-- ### Code Example quote
```javascript
let checkIt = function() {
  const gameBoard = document.getElementById("game");
  let target = document.getElementById('target1');
  let friendly = document.getElementById('satellite');
  el = target.getBoundingClientRect();
  la = friendly.getBoundingClientRect();
  let left = el.left + window.scrollX;
  let laLeft = la.left + window.scrollX;
  let top = el.top + window.scrollY;
  let laTop = la.top + window.scrollY;
  console.log(`laLeft is ${laLeft} and laTop is ${laTop}`);
  if ((left > 582 && left < 622) && (top > 230 && top < 270)) {
    score++;
    enemies--;
    outputNewMessages();
    gameBoard.removeChild(target);
    explodeIt();
    determineIt();
  } else if ((laLeft > 600 && laLeft < 650) && (laTop > 225 && laTop < 265)) {
    satellites = satellites - 1;
    outputNewMessages();
    gameBoard.removeChild(friendly);
    explodeIt();
    determineIt();
  }
}
```` -->
### Build Strategy
Facebook is great about reminding you of birthdays - the same day.  And what about all of your friends and family who don't use FB?  Wouldn't it be great to see all your events on the horizon? And what if you are not able to complete your plans for that day? If you track of your events on Google Calendar, they do not persist beyond their scheduled date.

Seventeenr is a single-page desktop app to help you keep track of holidays and other events in 2017. It uses Axios API calls to a Firebase server which allow the user full CRUD functionality over a collection of events which will persist until the user deletes them.

### Contributing
This project was developed as part of the Web Development Immersive program at General Assembly in NYC, January 2017. My mentor for this build is [Patrick Andre](patrick.andre@generalassemb.ly). Thanks, Patrick!

### Minimum Viable Product
- Wireframes, timeline, and MVP description to squad leader via GitHub README markdown
- Trello board with user stories
- Live app hosted on web
- Firebase database created
- Use CREATE-REACT-APP to build out file structure (Min TWO components, NOT including App.js)
- Show effort in styling, including FLEXBOX (note: some styling for mobile achieved with Flexbox)
- Use AXIOS only to make all RESTful requests.
- User CREATES a new event by typing in the "Add Event" text box, then picking a date.  New Event appears in Event List.
- User can focus on an Event in the Event List, which becomes editable. User can modify text or date, and click 'UPDATE' to return modified Event to Event List.
- On page load, user will READ a list of their created Events.
- User can focus on an Event in the Event List, which becomes editable. User can click 'DELETE' to remove Event from Event List.

### Improvements on MVP
- Use of React Router for Single-Page-Application build
- CSS styling to improve UX

### Possible Future Improvements 
  1. Addition of User Authentication to allow multiple users to create separate lists on the server.
  1. Events are ordered in chronological order.
  1. Events are color-coded green for events more than 7 days away, yellow for events less than 7 days away, and red for past date events.
  1. User CREATES a new event by selecting a holiday from the Select dropdown menu, which pre-populates the 'Add Event" text box and date picker.  New Event appears in Event List.

### Author
  [Franklin Brooks](http://www.franklinchristopherbrooks.com) 
