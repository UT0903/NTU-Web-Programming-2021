import React from "react";

const listItem = ({item_text,index,tedo,opa,dis,checked,onItemClickDone,onItemClickRemove}) => {
    const handleClickDone = () => {
        onItemClickDone(index)
    }
    const handleClickRemove = () => {
        onItemClickRemove(index)
    }
    return (<li className="todo-app__item" style={{display:dis}}>
                <div className="todo-app__checkbox">
                    <input type="checkbox" id={index} checked={checked} onClick={handleClickDone}></input>
                    <label htmlFor={index}></label>
                </div>
                <h1 className="todo-app__item-detail" style={{textDecoration:tedo,opacity:opa}}>{item_text}</h1>
                <img src="./img/x.png" className="todo-app__item-x" onClick={handleClickRemove}></img>
            </li>)
}
export default listItem
