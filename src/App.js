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
      Events: {},
      input: '',
      date: '',
      update: false
    };
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.createEvent = this.createEvent.bind(this);
    this.renderEvents = this.renderEvents.bind(this);
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
      console.log(this.state.Events);
      this.renderEvents();
    })
    .catch((error) => { console.error(error); });
  }

  handleChangeName(event) {
    console.log("current Input Value is " + event.target.value) // Set state of input to whatever is in the input
    this.setState({
      input: event.target.value
    })
  }

  handleChangeDate(event) {
    console.log("current Date Value is " + event.target.value) // Set state of date to whatever is in the input
    this.setState({
      date: event.target.value
    })
  }

  createEvent(input, date) {
    console.log("createEvent with " + this.state.input + "  " + this.state.date);
    let newEvent = { "name": this.state.input, "date": this.state.date };
    console.log(newEvent);
    axios({
      url: '/event.json',
      baseURL: 'https://seventeenr-38a86.firebaseio.com',
      method: "POST",
      data: newEvent
    }).then((response) => {
      console.log(response.data);
      let Events = this.state.Events;
      console.log('Events currently is ' + this.state.Events);
      let newEventId = response.data.name;
      console.log(newEventId);
      Events[newEventId] = newEvent;
      this.setState({
        Events: Events
      });
      console.log('Events after submit is ' + this.state.Events);
    }).catch((error) => {
      console.log(error);
    });
  }

  renderEvents() {
    let allEvents = [];
    for(let eventId in this.state.Events) {
      let event = this.state.Events[eventId]
      allEvents.push(
        <div className="event" key={eventId}>
          <div className="">
            <p>{event.name}</p>
            <p>{event.date}</p>
          </div>
        </div>
      );
    }
    console.log('allEvents array is ' + allEvents);
    return (
      <div className="event-list">
        {allEvents}
      </div>
    );
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

            <Match
              exactly pattern="/"
              component={() =>
                <Home
                  handleChange={this.handleChange}
                  createEvent={this.createEvent}
                  input={this.state.input}
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









