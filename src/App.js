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
      newEvent: [],
      update: false
    };
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.createEvent = this.createEvent.bind(this);
  }

  componentDidMount() {
    this.getEvents();
  }

  getEvents() {
    axios.get('https://seventeenr-38a86.firebaseio.com/.json')
    .then((response) => {
      this.setState(
        { events: response.data }
      );
      console.log(this.state.events.Sample);  // is currently a string
    })
    .catch((error) => { console.error(error); });
  }

  handleChangeName(event) {
    let currentInputValue = (event.target.value);
    console.log("currentInputValue is " + event.target.value) // Set state of input to whatever is in the input
    this.setState({
      input: event.target.value
    })
  }

  handleChangeDate(event) {
    console.log(this.state.date);
    let currentDateValue = (event.target.value);
    console.log("currentDateValue is " + event.target.value) // Set state of date to whatever is in the input
    this.setState({
      date: event.target.value
    })
  }

  createEvent(eventText) {
    console.log("createEvent!");
/*    let newEvent = { title: todoText, createdAt: new Date() };

    axios({
      url: '/todos.json',
      baseURL: 'https://todo-31265.firebaseio.com/',
      method: "POST",
      data: newTodo
    }).then((response) => {
      let todos = this.state.todos;
      let newTodoId = response.data.name;
      todos[newTodoId] = newTodo;
      this.setState({ todos: todos });
    }).catch((error) => {
      console.log(error);
    }); */

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









