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
      testEvent: [<div className="event"><p>Event name: Event date</p></div>],
      currentDay: Date.now()
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
    //  const Events = {...this.state.Events};  need spread here???
    console.log("createEvent with name: " + this.state.input + " + date: " + this.state.date);
    // let events = {...this.state.Events};
    let newEvent = { "name": this.state.input, "date": this.state.date };
    axios({
      url: '/.json',
      baseURL: 'https://seventeenr-38a86.firebaseio.com',
      method: "POST",
      data: newEvent
    }).then((response) => {
      let Events = this.state.Events;  // need spread here???
      let newEventId = response.data.name;
      console.log(newEventId);
      Events[newEventId] = newEvent;
      this.setState({
        Events: Events,  // fix setState to update database
        input: '',      // and reset form
        date: ''       // for next input
      });
      this.getEvents();
      console.log(this.state.Events);
    }).catch((error) => {
      console.log(error);
    });
  }

  renderEvents() {
    for(let date in this.state.Events) {
      if(this.state.Events.hasOwnProperty(date)) {
        let eachDate = this.state.Events[date]
        console.log('eachDate is currently ' + eachDate);
        console.log('Events currently = ' + eachDate.name + ' : ' + eachDate.date);
        console.log('Inside ' + this.state.allEvents);

/*        this.setState({
          testEvent: [<p>{eachDate.name}: {eachDate.date}</p>]
        });

        this.state.allEvents.push(
          <div className="event" key={eachDate}>
              <p>{eachDate.name}: {eachDate.date}</p>
          </div>
        );*/

      }
      console.log('Outside ' + this.state.allEvents);
    }

      // maybe setState w/ allEvents and pass prop to Read and Event???
      // Spread operator???
    return (  // does this need a return? call another function or setState???
      <div className="event-list">
        {this.state.allEvents}
      </div>
    );
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
          className=read Events will display here
          {this.state.testEvent}
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







