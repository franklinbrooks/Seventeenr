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
      update: false
    };
/*    this.handleNewTodoInput = this.handleNewTodoInput.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.enableEditMode = this.enableEditMode.bind(this);
    this.updateCurrentTodo = this.updateCurrentTodo.bind(this);*/
  }

  componentDidMount() {
    axios.get('https://seventeenr-38a86.firebaseio.com/.json')
    .then((response) => {
      console.log(response.data)
      this.setState(
        { events: response.data }
      );
    })
    .catch((error) => { console.error(error); });
  }

  getEvents() {
    axios.get('https://seventeenr-38a86.firebaseio.com/.json')
      .then((response) => {
        console.log(response.data)
        this.setState(
          { events: response.data }
        );
      })
      .catch((error) => { console.log(error);
      })
  }

/*  createEvent(eventText) {
    let newEvent = { title: todoText, createdAt: new Date() };

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
    });
  }*/

/*  deleteEvent(todoId) {
    axios({
      url: `/todos/${todoId}.json`,
      baseURL: 'https://todo-31265.firebaseio.com/',
      method: "DELETE",
    }).then((response) => {
      let todos = this.state.todos;
      delete todos[todoId];
      this.setState({ todos: todos });
    }).catch((error) => {
      console.log(error);
    });
  }*/

/*  handleNewEventInput(event) {
    if (event.charCode === 13) {
      this.createTodo(event.target.value);
      event.target.value = "";
    }
  }*/

/*  renderNewTodoBox() {
    return (
      <div className="new-todo-box pb-2">
        <input className="w-100" placeholder="What do you have to do?" onKeyPress={ this.handleNewTodoInput } />
      </div>
    );
  }*/

/*  renderTodoList() {
    let todoElements = [];
    for(let todoId in this.state.todos) {

      let todo = this.state.todos[todoId]
      console.log(todoId);
      todoElements.push(
        <div className="todo d-flex justify-content-between pb-4" key={todoId}>
          <div className="mt-2" onClick={ () => this.selectTodo(todoId) }>
            <h4>{todo.title}</h4>
            <div>{(todo.createdAt).calendar()}</div>
          </div>
          <button
            className="ml-4 btn btn-link"
            onClick={ () => { this.deleteTodo(todoId) } }
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      );
    }
    return (
      <div className="todo-list">
        {todoElements}
      </div>
    );
  }*/

/*  selectTodo(todoId) {
    this.setState({
      currentTodo: todoId
    })
  }*/

/*  updateCurrentTodo() {
    let id = this.state.currentTodo;
    let currentTodo = this.state.todos[id];
    currentTodo.title = this.refs.editTodoInput.value;

    axios({
      url: `/todos/${id}.json`,
      baseURL: 'https://todo-31265.firebaseio.com/',
      method: "PATCH",
      data: currentTodo
    }).then((response) => {
      let todos = this.state.todos;
      todos[id] = currentTodo;
      this.setState({
        todos: todos,
        edit: false
      });
    }).catch((error) => {
      console.log(error);
    });
  }*/

/*  renderSelectedTodo() {
    let content;

    if (this.state.currentTodo) {
      let currentTodo = this.state.todos[this.state.currentTodo];
      if(!this.state.edit) {
        content =  (
          <div>
            <div className="d-flex justify-content-end mb-3">
              <button onClick={this.enableEditMode}>Edit</button>
            </div>
            <h1>{currentTodo.title}</h1>
          </div>
        );
      } else {
        content =  (
          <div>
            <div className="d-flex justify-content-end mb-3">
              <button onClick={this.updateCurrentTodo}>Save</button>
            </div>
            <input className="w-100" defaultValue={currentTodo.title} ref="editTodoInput" />
          </div>
        );
      }
    }
    return content;
  }*/

/*  enableEditMode() {
    this.setState({
      edit: true
    })
  }*/

  render() {
    return (
      <BrowserRouter>
      <div className="App">
          <Header />
        <div className="main">
           <Match
              exactly
              pattern="/"
              component={Home}
            />
            <Match
              exactly pattern="/About"
              component={() =>
                <About  />}
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

/*          {this.renderNewTodoBox()}
            {this.renderSelectedTodo()}
            {this.renderTodoList()}
const PeopleList = ({ people }) => (
  <div className="people-list">
    {people.map((person, index) => (
      <p key={index}>
        <Link to={`/people/${index + 1}`}>{person.name}</Link>
      </p>
    ))}
  </div>
);*/







