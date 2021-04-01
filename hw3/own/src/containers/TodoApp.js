import React, { useState } from "react";
import Header from "../components/Header";
import ItemList from "../components/ItemList";
import Footer from "../components/Footer";
function TodoApp() {
	const [items, setItem] = useState([])
	const [id, setID] = useState(0)
	const [visibility, setVisibility] = useState('All')
	function addItem(e) {
		if (e.key === 'Enter') {
			const val = e.target.value.trim()
			if (val !== "") {
				e.target.value = ""
				setItem((e) => {
					const newItem = [...e]
					newItem.push({ id: id, content: val, completed: false })
					console.log('additem', newItem)
					return newItem
				})
				setID((e) => (e + 1))
				
			}
			
		}
	}
	function show(type){
		return () => {
			switch (type){
				case "Active":
					setVisibility((preVi)=>{return "Active"})
					break;
				case "Completed":
					setVisibility((preVi)=>{return "Completed"})
					break;
				case "All":
				default:
					setVisibility((preVi)=>{return "All"});
					break;
			} 
			console.log('type', type)
		}
	}

	function remove(id) {
		return () => { setItem((preItem) => {
			const newItem = [...preItem]
			const idx = newItem.findIndex((item) => (item.id === id))
			newItem.splice(idx, 1)
			console.log('remove', newItem)
			return newItem
		})}
	}
	function completed(id){
		return () => { setItem((preItem) => {
			const newItem = [...preItem]
			const idx = newItem.findIndex((item) => (item.id === id))
			newItem[idx].completed = (newItem[idx].completed)? false : true
			console.log('complete', newItem)
			return newItem
		})}
	}
	function clearCompleted(){
		return () => { setItem((preItem) => {
			const newItem = preItem.filter((item)=>(!item.completed))
			console.log('clear ', newItem)
			return newItem
		})}
	}

	return (
		<>
			<Header text="todos" />
			<section className="todo-app__main">
				<input className="todo-app__input" id="app__input" placeholder="What needs to be done?" onKeyPress={addItem} />
				<ItemList items={items} remove={remove} completed={completed} visibility={visibility}/>
			</section>
			<Footer items={items} show={show} clearCompleted={clearCompleted}/>
		</>
	);

}

export default TodoApp;
