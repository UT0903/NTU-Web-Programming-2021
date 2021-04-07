import React, { Component } from "react";

class TodoFooter extends Component {
    constructor(props) {
        super(props);
        // this.state = {mode: this.props.left}
    }

    countLeft = () => {
        let left = 0;
        for (let i = 0; i < this.props.left.length; ++i) {
            if (!this.props.left[i]) {
                ++left;
            }
        }
        // console.log(left);
        return left;
    }

    render() {
        // console.log(this.props.left);
        return (
            <footer class="todo-app__footer" id="todo-footer" style={{visibility: this.props.left.length? "visible":"hidden"}}>
                <div class="todo-app__total">{this.countLeft()} left</div>
                <ul class="todo-app__view-buttons">
                    <button onClick={() => {this.props.mode("all")}}>All</button>
                    <button onClick={() => {this.props.mode("active")}}>Active</button>
                    <button onClick={() => {this.props.mode("completed")}}>Completed</button>
                </ul>
                <div class="todo-app__clean" style={{visibility: this.props.left.length - this.countLeft()? "visible":"hidden"}}>
                    <button onClick={this.props.clear}>Clear completed</button>
                </div>
            </footer>
        )        
    }
}

export default TodoFooter;