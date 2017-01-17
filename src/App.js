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
      update: false,
      allEvents: [],
      currentDay: ''
    };
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.createEvent = this.createEvent.bind(this);
    this.deleteEvent = this.deleteEvent.bind(this);
    this.renderEvents = this.renderEvents.bind(this);
    this.editEvent = this.editEvent.bind(this);
    // this.enableEditMode = this.enableEditMode.bind(this);
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
    let parents = Object.getOwnPropertyNames(this.state.Events);
    console.log(parents);  // example: ["-Kah7k-1glM7qlgV9GU0"]
    for(let date in this.state.Events) {  //  this.state.Events["-Kah7k-1glM7qlgV9GU0"].date
      console.log('******>', parents[counter], counter);
      if(this.state.Events.hasOwnProperty(date)) {

      /*let myPath = this.state.Events;*/
      /*let myPath = 'this.state.Events["'+parents[counter]+'"]';*/
      /*console.log('myPath is ' + myPath.{parents[counter]});*/
      /*console.log(this.state.Events["-Kah7k-1glM7qlgV9GU0"].date);*/

        let eachKey = this.state.Events[date];  // this should be key of db (string) ie ["-Kah7k-1glM7qlgV9GU0"]
        console.log('eachKey is currently ' + eachKey); // get parent[counter] in here!
        console.log('Currently adding ' + eachKey.name + ' : ' + eachKey.date + ' to allEvents array');

        allEvents.push( // need to change 92/93/94/112 from {eachKey.name} to {parents[counter]}
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
                onClick={this.editEvent}>EDIT
              </button>
              <br />
              {eachKey.name}: {eachKey.date}
            </p>
          </div>
        );
        counter++;
        this.setState({
          allEvents: allEvents,
        });
      }
    }
  }

  editEvent(event) {
    let eventKey =  event.target.value;
    console.log('Edit! editEvent eventKey is ' + eventKey);
/*
    const url = 'put url here';
    axios({
      url: `/${eventKey}.json`,
      baseURL: 'https://seventeenr-38a86.firebaseio.com',
      method: "PATCH",
    }).then((response) => {
      console.log(response.data);
      let events = this.state.Events;

      delete events[eventKey]; // fix this!!!
      this.setState({
        Events: events,
        edit: false
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
          {this.state.allEvents}
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
{Object.keys(Events).map((key) => <div key={key} value={key}>{Events[key].name}</div>)}
      */

/*    for(let key in keyArray) {  //  this.state.Events["-Kah7k-1glM7qlgV9GU0"].date
      console.log(keyArray[key]);
      let eachKey = keyArray[key];
      let formattedKey = `"${eachKey}"`;
      console.log('formattedKey = '+ formattedKey); // looks good, but...
      console.log(this.state.Events[formattedKey]); // this doesn't work
      console.log(this.state.Events["-Kah7k-1glM7qlgV9GU0"]); // works

      if(this.state.Events[formattedKey].hasOwnProperty(key)) {  //
        let eachDate = this.state.Events[key];  // this should be key of db (string) ie ["-Kah7k-1glM7qlgV9GU0"]
*/





