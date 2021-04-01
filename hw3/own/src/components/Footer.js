import React from "react";
export default ({ items, show, clearCompleted}) => (
    <footer className="todo-app__footer" id="todo-footer">
        <div className="todo-app__total">{ items.filter((item)=>(!item.completed)).length } left</div>
        <ul className="todo-app__view-buttons">
            <button onClick={show("All")}>All</button>
            <button onClick={show("Active")}>Active</button>
            <button onClick={show("Completed")}>Completed</button>
        </ul>
        <div className="todo-app__clean"><button onClick={clearCompleted()}>Clear completed</button></div>
    </footer>
)