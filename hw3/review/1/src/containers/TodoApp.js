import React, { Component } from "react";
import Header from "../components/Header";
import Item from "../components/Item";
class TodoApp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            items: [],
            inputValue:'',
            showElem:'none',
            itemNum: 0,
            itemsStyle:[],
            checked:[],
            textDeco:[],
            opa:[],
            display:[],
            displayState:'all',
            showClear:'none'
        }
    }
    render() {
        return (
            <>
                <Header text="todos" />
                <section className="todo-app__main">
                    <input className="todo-app__input" onChange={this.handleChange} onKeyPress={this.handleKeyPress} value={this.state.inputValue}></input>
                    <ul className="todo-app__list" id="todo-list">
                        {
                            this.state.items.map((value,index) => {
                                return <Item key={index} item_text={value} index={index} tedo={this.state.textDeco[index]} opa={this.state.opa[index]} dis={this.state.display[index]} checked={this.state.checked[index]} onItemClickDone={this.handleDone} onItemClickRemove={this.handleRemove}/>
                            })
                        }
                    </ul>
                </section>
                <footer className="todo-app__footer" style={{display:this.state.showElem}}>
                    <div className="todo-app__total">{this.state.itemNum} left</div>
                    <ul className="todo-app__view-buttons">
                        <button onClick={this.showAll}>All</button>
                        <button onClick={this.showActive}>Active</button>
                        <button onClick={this.showCompleted}>Completed</button>
                    </ul>
                    <div className="todo-app__clean">
                        <button style={{display:this.state.showClear}} onClick={this.clearCompleted}>Clear completed</button>
                    </div>
                </footer>
            </>
        );
        
    }
    handleChange = (e) => {
        if (e.target instanceof HTMLInputElement) {
          this.setState({
            inputValue: e.target.value,
          })
        }
      }
    handleKeyPress = (e) => {
        if(e.key === 'Enter' && e.target instanceof HTMLInputElement){    
            this.setState((state) =>{
                let newItems = [...state.items, e.target.value];
                let newItemsStyle = [...state.itemsStyle, "noline"];
                let newChecked = [...state.checked, false];
                let newTextDeco = [...state.textDeco,""];
                let newOpa = [...state.opa,1];
                let newDisplay = [...state.display,"flex"];
                this.newState = {
                items: newItems,
                inputValue: '',
                showElem: 'flex',
                itemNum: state.itemNum + 1,
                itemsStyle: newItemsStyle,
                checked:newChecked,
                textDeco:newTextDeco,
                opa:newOpa,
                display:newDisplay

                };
                return this.newState;
            });
        }
      }
    handleDone = (index) => {
        this.setState((state) => {
            let newItemsStyle = state.itemsStyle;
            let newChecked = state.checked;
            let newTextDeco = state.textDeco;
            let newOpa = state.opa;
            let newNum = 0;
            let newDisplay = state.display;
            let newShowClear = state.showClear;
            if(newItemsStyle[index] == "noline"){
                newItemsStyle[index] = "haveline";
                newTextDeco[index] = "line-through";
                newOpa[index] = (0.5);
                newNum = state.itemNum - 1;
                newChecked[index] = true;
                if(state.displayState != 'all'){
                    newDisplay[index] = 'none';
                }
            }
            else{
                newItemsStyle[index] = "noline";
                newTextDeco[index] = "";
                newOpa[index] = 1;
                newNum = state.itemNum + 1;
                newChecked[index] = false;
                if(state.displayState != 'all'){
                    newDisplay[index] = 'none';
                }
            }
            if(newNum < newChecked.length)
                newShowClear = 'flex';
            else
                newShowClear = 'none';
            this.newState = {
                itemNum: newNum,
                itemsStyle: newItemsStyle,
                textDeco:newTextDeco,
                opa:newOpa,
                display:newDisplay,
                showClear:newShowClear
            };
            return this.newState;
        });
    }
    handleRemove = (index) => {   
        this.setState((state) => {
            let oldItems = state.items;
            let oldItemsStyle = state.itemsStyle;
            let newItems = oldItems.slice(0,index).concat(oldItems.slice(index+1));
            let newItemsStyle = oldItemsStyle.slice(0,index).concat(oldItemsStyle.slice(index+1));
            let oldChecked = state.checked;
            let newChecked = oldChecked.slice(0,index).concat(oldChecked.slice(index+1));
            let newItemNum = state.itemNum;
            let newShowElem = 'flex';

            let oldTextDeco = state.textDeco;
            let newTextDeco = oldTextDeco.slice(0,index).concat(oldTextDeco.slice(index+1));
            let oldOpa = state.opa;
            let newOpa = oldOpa.slice(0,index).concat(oldOpa.slice(index+1));
            let oldDisplay = state.display;
            let newDisplay = oldDisplay.slice(0,index).concat(oldDisplay.slice(index+1));
            if(newItems.length == 0){
                newShowElem = 'none';
            }
            if(oldChecked[index] == false){
                newItemNum -= 1;
            }
            this.newState = {
                items: newItems,
                itemsStyle: newItemsStyle,
                itemNum: newItemNum,
                checked:newChecked,
                showElem: newShowElem,
                textDeco:newTextDeco,
                opa:newOpa,
                display:newDisplay
            };
            return this.newState;
        });
    }
    showAll = () => {
        this.setState((state) =>{
            let newDisplay = state.display;
            for(var i = 0;i<newDisplay.length;i++){
                newDisplay[i] = 'flex';
            }
            this.newState = {
                display:newDisplay,
                displayState:'all'
            }
            return this.newState;
        })
    }
    showActive = () => {
        this.setState((state) =>{
            let newDisplay = state.display;
            for(var i = 0;i<newDisplay.length;i++){
                if(state.checked[i] == true)
                    newDisplay[i] = 'none';
                else
                    newDisplay[i] = 'flex';
            }
            this.newState = {
                display:newDisplay,
                displayState:'active'
            }
            return this.newState;
        })
    }
    showCompleted = () => {
        this.setState((state) =>{
            let newDisplay = state.display;
            for(var i = 0;i<newDisplay.length;i++){
                if(state.checked[i] == true)
                    newDisplay[i] = 'flex';
                else
                    newDisplay[i] = 'none';
            }
            this.newState = {
                display:newDisplay,
                displayState:'completed'
            }
            return this.newState;
        })
    }
    clearCompleted = () =>{
        this.setState((state) =>{
            let oldItems = state.items;
            let oldItemsStyle = state.itemsStyle;
            let oldChecked = state.checked;
            let oldTextDeco = state.textDeco;
            let oldOpa = state.opa;
            let oldDisplay = state.display;
            let newShowElem = 'flex';
            let newItemNum = state.itemNum;
            
            let deleteIndex = [];
            for(var i = oldChecked.length-1 ;i >= 0;i--){
                if(oldChecked[i] == true)
                    deleteIndex = [...deleteIndex,i];
            }
            for (var i = 0;i<deleteIndex.length;i++){
                oldItems = oldItems.slice(0,deleteIndex[i]).concat(oldItems.slice(deleteIndex[i]+1));
                oldItemsStyle = oldItemsStyle.slice(0,deleteIndex[i]).concat(oldItemsStyle.slice(deleteIndex[i]+1));
                oldChecked = oldChecked.slice(0,deleteIndex[i]).concat(oldChecked.slice(deleteIndex[i]+1));
                oldTextDeco = oldTextDeco.slice(0,deleteIndex[i]).concat(oldTextDeco.slice(deleteIndex[i]+1));
                oldOpa = oldOpa.slice(0,deleteIndex[i]).concat(oldOpa.slice(deleteIndex[i]+1));
                oldDisplay = oldDisplay.slice(0,deleteIndex[i]).concat(oldDisplay.slice(deleteIndex[i]+1));
            }
            if(oldItems.length == 0){
                newShowElem = 'none';
            }

            this.newState = {
                items: oldItems,
                itemsStyle: oldItemsStyle,
                checked:oldChecked,
                textDeco:oldTextDeco,
                opa:oldOpa,
                display:oldDisplay,

                showElem: newShowElem,
                itemNum: newItemNum,
            };
            return this.newState;
        })
    }
}

export default TodoApp;

