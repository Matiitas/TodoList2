import React, { Component } from "react";
import axios from "axios";
import Todo from "./todoComponent";
import "../assets/styles/todoList.css";

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      isFetching: true,
      inputTodo: "",
    };
  }

  componentDidMount() {
    this.getTodos();
  }

  getTodos = async () => {
    const todos = await axios.get("http://localhost:5000/api/v1/todos");
    console.log(todos.data.todos);
    this.setState({ todos: todos.data.todos, isFetching: false });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const newTodo = await axios.post("http://localhost:5000/api/v1/todos", {
      text: this.state.inputTodo,
    });
    let tempTodos = [...this.state.todos, newTodo.data.todo];
    this.setState({ todos: tempTodos });
  };

  handleRemove = async (id) => {
    try {
      await axios.delete("http://localhost:5000/api/v1/todos/" + id);
      const tempTodos = this.state.todos.filter((todo) => {
        return todo._id !== id;
      });
      this.setState({ todos: tempTodos });
    } catch (e) {
      console.log("No se puedo remover el todo");
    }
  };

  handleFinished = async (id) => {
    try {
      let tempTodos = [...this.state.todos];
      tempTodos.forEach((todo) => {
        if (todo._id === id) {
          todo.finalized = !todo.finalized;
        }
      });
      const todo = tempTodos.filter((todo) => {
        return todo._id === id;
      });
      await axios.put("http://localhost:5000/api/v1/todos/" + id, {
        finalized: todo[0].finalized,
      });
      this.setState({ todos: tempTodos });
    } catch (e) {
      console.log("No se puedo remover el todo");
    }
  };

  handleAddTodo = (e) => {
    this.setState({ inputTodo: e.target.value });
  };

  render() {
    return (
      <div className="wrapper-todoList">
        <div className="container d-flex flex-column">
          <div className="row">
            <div className="col-10">
              <form
                className="d-sm-flex justify-content-between"
                onSubmit={this.handleSubmit}
              >
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Add todo"
                    onChange={this.handleAddTodo}
                  />
                  <div className="input-group-append">
                    <button className="btn btn-outline-primary" type="submit">
                      Add
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          {this.state.isFetching ? (
            <h1>You don't have any todo</h1>
          ) : (
            <div className="row">
              <div className="col-10">
                <div className="card">
                  <ul className="list-group list-group-flush">
                    {this.state.todos.map((todo) => {
                      return (
                        <Todo
                          key={todo._id}
                          id={todo._id}
                          text={todo.text}
                          finalized={todo.finalized}
                          handleRemove={this.handleRemove}
                          handleFinished={this.handleFinished}
                        />
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default TodoList;
