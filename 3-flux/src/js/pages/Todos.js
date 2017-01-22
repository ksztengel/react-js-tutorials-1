import React from "react";

import Todo from "../components/Todo";
import * as TodoActions from "../actions/TodoActions";
import TodoStore from "../stores/TodoStore";


export default class ToDo extends React.Component {
  constructor() {
    super();
    this.getTodos = this.getTodos.bind(this);
    this.state = {
      todos: TodoStore.getAll(),
    };
  }

  componentWillMount() {
    TodoStore.on("change", this.getTodos);
  }

  componentWillUnmount() {
    TodoStore.removeListener("change", this.getTodos);
  }

  createTodos(newTodo) {
   newTodo = {
     id: Date.now(),
     text: this.input.value,
     complete: false
   }
   TodoActions.createTodos(newTodo);
   this.input.value = ''
 }

  getTodos() {
    this.setState({
      todos: TodoStore.getAll(),
    });
  }

  reloadTodos() {
    TodoActions.reloadTodos();
  }

  render() {
    const { todos } = this.state;

    const TodoComponents = todos.map((todo) => {
        return <Todo key={todo.id} {...todo}/>;
    });

    return (
      <div>
        <button type="button" class="btn btn-primary" onClick={this.reloadTodos.bind(this)}>Reload!</button>
        <h1>Todos</h1>
        <ul>{TodoComponents}</ul>
        <input type="text" placeholder="Enter a new To Do" class="form-control" style={{width: '30%', display: 'inline'}} ref={(input) => this.input = input} />
        <button type="button" class="btn btn-success"  onClick={this.createTodos.bind(this)}>Submit!</button>
      </div>
    );

  }
}
