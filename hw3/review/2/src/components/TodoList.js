import React, { Component } from "react";
import Todo from "./Todo";

class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // mode: props.display,
            // todo: props.list,
            // checked: props.status
        };
    }

    render() {
        // console.log("change list")
        let display = [];
        switch (this.props.display) {
            case "active":
                for (let i = 0; i < this.props.list.length; ++i) {
                    if (!this.props.status[i]) {
                        display.push(<Todo idx={i} content={this.props.list[i]} done={this.props.status[i]} update={this.props.update} deleteTodo={this.props.deleteFunc}/>);
                    }                    
                }
                break;
            case "completed":
                for (let i = 0; i < this.props.list.length; ++i) {
                    if (this.props.status[i]) {
                        display.push(<Todo idx={i} content={this.props.list[i]} done={this.props.status[i]} update={this.props.update} deleteTodo={this.props.deleteFunc}/>);
                    }                    
                }
                break;
            default:
                for (let i = 0; i < this.props.list.length; ++i) {
                    display.push(<Todo idx={i} content={this.props.list[i]} done={this.props.status[i]} update={this.props.update} deleteTodo={this.props.deleteFunc}/>);
                }
                break;
        }
        // console.log(display.length)
        return display;
    }
}

export default TodoList;