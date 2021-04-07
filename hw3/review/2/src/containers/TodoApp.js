import React, { Component } from "react";
import Header from "../components/Header";
import TodoList from "../components/TodoList";
import TodoFooter from "../components/TodoFooter";

class TodoApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // input: "",
            mode: "all",
            todo: [],
            done: [],            
        };
        // this.changeMode = this.changeMode.bind(this)
    }

    inputTodo = (e) => {
        if (e.key === "Enter" && e.target.value.trim() !== "") {
            this.setState({
                todo: [...this.state.todo, e.target.value.trim()],
                done: [...this.state.done, false]
            });
            e.target.value = "";
        }
    }

    changeMode = (m) => {
        this.setState({mode: m});
        // console.log(this.state.mode);
    }

    checkDone = (i) => {
        // console.log("call check", i);
        const d = [...this.state.done];
        d.splice(i, 1, !d[i]);
        this.setState({done: d});
    }

    deleteTodo = (i) => {
        // console.log("delete", i);
        const t = [...this.state.todo];
        const d = [...this.state.done];
        t.splice(i, 1);
        d.splice(i, 1);
        this.setState({todo: t});
        this.setState({done: d});
    }

    clearComplete = () => {
        // console.log("clear");
        const t = [...this.state.todo];
        const d = [...this.state.done];
        for (let i = 0; i < d.length; ++i) {
            if (d[i]) {
                t.splice(i, 1);
                d.splice(i, 1);
                this.setState({todo: t});
                this.setState({done: d});
                --i;
            }
        }
    }

    render() {
        // console.log("render", this.state.mode, this.state.todo, this.state.done);
        return (
            <>
                <Header text="todos" />
                <section class="todo-app__main">
                    <input class="todo-app__input" onKeyPress={ this.inputTodo }></input>
                    <TodoList display={this.state.mode} list={this.state.todo} status={this.state.done} update={this.checkDone} deleteFunc={this.deleteTodo}/>
                </section>
                <TodoFooter mode={this.changeMode} left={this.state.done} clear={this.clearComplete}/>
            </>
        );
    }
}

export default TodoApp;
