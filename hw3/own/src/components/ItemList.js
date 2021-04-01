import React from "react";
export default ({ items, remove, completed, visibility }) => {
    if (items.length === 0) return <></>;
    let filterItems;
    switch (visibility) {
        case ("Active"):
            filterItems = items.filter((item) => (!item.completed))
            break;
        case ("Completed"):
            filterItems = items.filter((item) => (item.completed))
            break;
        case ("All"):
        default:
            filterItems = items
            break;
    }
    console.log('listItem', filterItems)
    return (
        <ul className="todo-app__list" id="todo-list">
            {filterItems.map((item) => (
                <li className="todo-app__item" key={item.id}>
                    <div className="todo-app__checkbox">
                        <input type="checkbox" id={item.id} onClick={completed(item.id)} defaultChecked={item.completed} />
                        <label htmlFor={item.id} />
                    </div>
                    <h1 className="todo-app__item-detail" style={(item.completed) ? { textDecoration: "line-through", opacity: 0.5 } : {}}>{item.content}</h1>
                    <img src="./img/x.png" className="todo-app__item-x" onClick={remove(item.id)} />
                </li>
            ))}
        </ul>
    );
};