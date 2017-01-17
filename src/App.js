import React, { Component } from 'react';
import { BrowserRouter, Match, Miss } from 'react-router';
import './App.css';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
import About from './About';
import Home from './Home';
import NotFound from './NotFound';

class App extends Component {
  constructor() {
    super();
    this.state = {
      Events: [],
      input: '',
      date: '',
      update: false,
      allEvents: [],
      testEvent: [],
      currentDay: ''
    };
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.createEvent = this.createEvent.bind(this);
    this.renderEvents = this.renderEvents.bind(this);
    this.changeCurrentEvent = this.changeCurrentEvent.bind(this);
    this.enableEditMode = this.enableEditMode.bind(this);
  }

  componentDidMount() {
    this.getEvents();
  }

  getEvents() {
    axios.get('https://seventeenr-38a86.firebaseio.com/.json')
    .then((response) => {
      this.setState(
        { Events: response.data }
      );
      this.renderEvents();
    })
    .catch((error) => { console.error(error); });
  }

  handleChangeName(event) {  // Set state of input to whatever is in the input
    this.setState({
      input: event.target.value
    })
  }

  handleChangeDate(event) {  // Set state of date to whatever is in the input
    this.setState({
      date: event.target.value
    })
  }

  createEvent(input, date) {  // Axios POST of new user input (name + date)
    console.log("createEvent with name: " + this.state.input + " + date: " + this.state.date);
    let newEvent = { "name": this.state.input, "date": this.state.date };
    axios({
      url: '/.json',
      baseURL: 'https://seventeenr-38a86.firebaseio.com',
      method: "POST",
      data: newEvent
    }).then((response) => {
      let Events = this.state.Events;  // need spread here??? let events = {...this.state.Events};
      let newEventId = response.data.name;  // this is key of database entry
      console.log(newEventId);
      Events[newEventId] = newEvent;
      this.setState({
        Events: Events,  // fix setState to update database
        input: '',      // and reset form
        date: ''       // for next input
      });
      this.getEvents();
    }).catch((error) => {
      console.log(error);
    });
  }

  renderEvents() {
    let allEvents = [];
    let keyArray = Object.keys(this.state.Events);
    console.log('keyArray = ' + keyArray);
    for(let date in this.state.Events) {
      if(this.state.Events.hasOwnProperty(date)) {
        let eachDate = this.state.Events[date];
        console.log('eachDate is currently ' + eachDate); // currently an object
        console.log('Currently adding ' + eachDate.name + ' : ' + eachDate.date + ' to allEvents array');

        this.state.allEvents.push(
          <div className="event" key={keyArray.date}>
              <p>{eachDate.name}: {eachDate.date}</p>
          </div>
        );

        this.setState({
          allEvents: allEvents,
          testEvent: [<p key={eachDate.date}>{eachDate.name}: {eachDate.date}</p>] // need key to be db key
        });

      }
    }
      // maybe setState w/ allEvents and pass prop to Read and Event???
      // Spread operator???
    return // (  // does this need a return? call another function or setState???
      // <div className="event-list">{this.state.allEvents}</div>
    // );
  }

    enableEditMode() {
    let eventId = 1;  // update this line with correct identifier
    this.setState({
      edit: true,
      currentEvent: eventId
    })
  }

  changeCurrentEvent(event) {
    this.setState({
      currentEvent: this.state.messages[event.target.value]
    });
  }

    /*  deleteEvent(eventId) {
    axios({
      url: `/${eventId}.json`,
      baseURL: 'https://seventeenr-38a86.firebaseio.com',
      method: "DELETE",
    }).then((response) => {
      let events = this.state.Events;
      delete events[eventId];
      this.setState({
        Events: events
      });
    }).catch((error) => {
      console.log(error);
    });
  }*/

  render() {
    return (
      <BrowserRouter>
      <div className="App">
          <Header />
        <div className="main">

        <form className='create'>
          <input
            className="textbox"
            name="name"
            placeholder='Add an event'
            type="text"
            value={this.state.input}
            onChange={this.handleChangeName}
          />
          <input
            className="textbox"
            name="date"
            placeholder=''
            type="date"
            value={this.state.date}
            onChange={this.handleChangeDate}
            />
          <button id="mySubmitButton" type="button"
          onClick={this.createEvent}>Create Event</button>
        </form>


        <div className='container'>
          <div className="read">
          {this.state.allEvents}
          </div>
        </div>


            <Match
              exactly pattern="/"
              component={() =>
                <Home
                  handleChange={this.handleChange}
                  createEvent={this.createEvent}
                  input={this.state.input}
                  changeCurrentEvent={this.changeCurrentEvent}
                  currentEvent={this.currentEvent}
                />}
            />
            <Match
              exactly pattern="/About"
              component={About}
            />
            <Miss component={NotFound}
            />
        </div>
        <Footer />
      </div>
      </BrowserRouter>
    );
  }
}

export default App;

/*
          {Object.keys(Events).map((key) => <div key={key} value={key}>{Events[key].name}</div>)}
      */







