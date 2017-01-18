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
      updatedInput: '',
      updatedDate: '',
      edit: false,
      selectedEvent: '',
      allEvents: [],
      currentDate: new Date()
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
      input: event.target.value,
      updatedInput: event.target.value
    })
  }

  handleChangeDate(event) {  // Set state of date to whatever is in the input
    this.setState({
      date: event.target.value,
      updatedDate: event.target.value
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
        Events: Events,  // updates state
        input: '',      // and resets form
        date: ''       // for next input
      });
      this.getEvents();
    }).catch((error) => {
      console.log(error);
    });
  }

renderEvents() {
    console.log(this.state.currentDate);
    let allEvents = [];
    // let parents = Object.getOwnPropertyNames(this.state.Events);  // string keys: example: ["-Kah7k-1glM7qlgV9GU0"]
    //console.log('******>', parents[counter], counter);
    for(let event in this.state.Events) {  // actual Objects: example: ["-Kah76d2UUM9_ErGKHIW"])
      //console.log('event is ' + event);
      //if(event.hasOwnProperty.call(date)) { // need a property that works
      let eachKey = this.state.Events[event];  // Object w/ 2 properties, date & name
      //console.log('Currently adding ' + this.state.Events[event].date + ' : ' + this.state.Events[event].name + ' to allEvents array');
          if (event === this.state.selectedEvent) {
            allEvents.push(
          <div className="event" key={event}>
            <p>
              <button
                className='delete'
                type="button"
                value={event}
                onClick={this.editEvent}>SAVE
              </button>

              <input
                className="textbox"
                name="name"
                type="text"
                value={this.state.updatedInput}
                onChange={this.handleChangeName}
              />
              <input
                className="textbox"
                name="date"
                type="date"
                value={this.state.updatedDate}
                onChange={this.handleChangeDate}
              />
            </p>
          </div>
            );
          } else {
            allEvents.push(
              <div className="event" key={event}>
              <p>
                <button
                  className='delete'
                  type="button"
                  value={event}
                  onClick={this.deleteEvent}>DELETE
                </button>
                <button
                  className='delete'
                  type="button"
                  value={event}
                  onClick={this.makeEditable}>EDIT
                </button>
                <br />
                {eachKey.name}: {eachKey.date}
              </p>
            </div>
            )
          }

    /*  }  */
      // counter++;
    }
    return allEvents;
  }

  makeEditable(event) {
    let selectedEventKey =  event.target.value;
    console.log('selectedEvent will be ' + selectedEventKey);
    let selectedEventName = this.state.Events[selectedEventKey].name;
    console.log(selectedEventName);
    let selectedEventDate = this.state.Events[selectedEventKey].date;
    console.log(selectedEventDate);
    this.setState({
      edit: true,
      selectedEvent: selectedEventKey,
      updatedInput: selectedEventName,
      updatedDate: selectedEventDate
    });
  }

  editEvent(input, date) {
    let eventKey = this.state.selectedEvent;
    let updatedEvent = { "name": this.state.updatedInput, "date": this.state.updatedDate };
  axios({
      url: `/${eventKey}.json`,
      baseURL: 'https://seventeenr-38a86.firebaseio.com',
      method: "PATCH",
      data: updatedEvent
    }).then((response) => {
      console.log(response.data);
      this.setState({
        input: '',
        date: '',
        edit: false,
        selectedEvent: '',
        updatedInput: '',      //  reset form
        updatedDate: ''       // for next input
      });
      this.getEvents();
    })
    .catch((error) => {
      console.log(error);
    });

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
                  input={this.state.input}
                  handleChangeName={this.handleChangeName}
                  date={this.state.date}
                  createEvent={this.createEvent}
                  renderEvents={this.renderEvents}
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






