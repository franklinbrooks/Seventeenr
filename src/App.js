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
      key: '',
      input: '',
      date: '',
      edit: false,
      selectedEvent: null,
      allEvents: [],
      currentDay: '' // set to new Date() ??
    };
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.createEvent = this.createEvent.bind(this);
    this.deleteEvent = this.deleteEvent.bind(this);
    this.renderEvents = this.renderEvents.bind(this);
    this.editEvent = this.editEvent.bind(this);
    this.makeEditable = this.makeEditable.bind(this);
  }

  componentDidMount() {
    this.getEvents();
  }

  getEvents() {
    axios.get('https://seventeenr-38a86.firebaseio.com/.json')
    .then((response) => {
      this.setState({
        Events: response.data
      });
      // this.renderEvents();
    })
    .catch((error) => { console.error(error); });
  }

  handleChangeName(event) {  // Set state of name to whatever is in the input
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
      let Events = this.state.Events;
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
    let counter = 0;
    let allEvents = [];
    let parents = Object.getOwnPropertyNames(this.state.Events);  // string keys: example: ["-Kah7k-1glM7qlgV9GU0"]
    //console.log('******>', parents[counter], counter);
    for(let event in this.state.Events) {  // actual Objects: example: ["-Kah76d2UUM9_ErGKHIW"])
      console.log('event is ' + event);
      //if(event.hasOwnProperty.call(date)) { // need a property that works
      let eachKey = this.state.Events[event];  // Object w/ 2 properties, date & name
      console.log('Currently adding ' + this.state.Events[event].date + ' : ' + this.state.Events[event].name + ' to allEvents array');
/*          if (parent === this.state.selectedEvent) {
            allEvents.push(<div>SELECTED</div>);
          } else {  */
            allEvents.push(
              <div className="event" key={parents[counter]}>
              <p>
                <button
                  className='delete'
                  type="button"
                  value={parents[counter]}
                  onClick={this.deleteEvent}>DELETE
                </button>
                <button
                  className='delete'
                  type="button"
                  value={parents[counter]}
                  onClick={this.makeEditable}>EDIT
                </button>
                <br />
                {eachKey.name}: {eachKey.date}
              </p>
            </div>
            )
       /*   }  */

    /*  }  */
      counter++;
    }
    return allEvents;
  }

  makeEditable(event) {
    let eventKey =  event.target.value;
    this.setState({
      edit: true,
      selectedEvent: eventKey
    });
    // console.log('The eventKey inside makeEditable is ' + eventKey);
    // console.log('selectedEvent is ' + this.state.selectedEvent);
    // console.log('Edit inside makeEditable is ' + this.state.edit);
    // this.renderEvents();
  }

  editEvent(input, date) {
    // let updatedEvent = { "name": this.state.input, "date": this.state.date };
/*  axios({
      url: `/${eventKey}.json`,
      baseURL: 'https://seventeenr-38a86.firebaseio.com',
      method: "PATCH",
      data: updatedEvent
    }).then((response) => {
      console.log(response.data);
      let events = this.state.Events;

      // set text + date of eventKey to input and date!!!

      this.setState({
        Events: events,
        edit: false,
        currentEvent: '',
        input: '',      //  reset form
        date: ''       // for next input
      });
      this.getEvents();
    })
    .catch((error) => {
      console.log(error);
    });
    */
  }

  deleteEvent(event) {
    let eventKey =  event.target.value;
    console.log('Delete! deleteEvent eventKey is ' + eventKey);  //  no value yet
    axios({
      url: `/${eventKey}.json`,
      baseURL: 'https://seventeenr-38a86.firebaseio.com',
      method: "DELETE",
    }).then((response) => {
      console.log(`url for DELETE request is ' + 'https://seventeenr-38a86.firebaseio.com/${eventKey}.json`);
      console.log(response.data);
      let events = this.state.Events;
      delete events[eventKey];
      this.setState({
        Events: events
      });
    this.getEvents();
    }).catch((error) => {
      console.log(error);
    });
  }

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
          {this.renderEvents()}
          </div>
        </div>

            <Match
              exactly pattern="/"
              component={() =>
                <Home
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
        <div className='edit'>
        <div className='editBox'>stuff</div>
        </div>*/





