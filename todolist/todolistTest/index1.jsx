import React,{useState} from 'react';
const TodoList=()=>{
    const [todos,setTodos]=useState([]);
    const [inputValue,setInputValue]=useState('');
    const addTodo=()=>{
        if(!inputValue.trim()) return;
        const newTodo={
            id:new Date(),
            text:inputValue,
            completed:false
        }
        setTodos([...todos,newTodo]);
        setInputValue('');
    }
    const deleteTodo=(id)=>{
        setTodos(todos.filter(todos=>todos.id!==id));
    }
    const toggleTodo=(id)=>{
        setTodos(todos.map(todo=>{
            if(todo.id===id){
                return {...todo,completed:!todo.completed}
            }
            return todo;
        }))
    }
    return (
        <div>
            <h1>我的代办事项</h1>
            <input 
                value={inputValue},
                onchange
            />

        </div>
    )
}