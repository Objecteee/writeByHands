import React,{useState,useEffect} from 'react';
const TodoList=()=>{
    const [todos,setTodos]=useState([]);
    const [inputValue,setInputValue]=useState('');
    const addTodo=()=>{
        if(!inputValue.trim()) return;
        const newTodo={
            id:Date.now(),
            text:inputValue,
            completed:false
        }
        setTodos([...todos,newTodo]);
        setInputValue('');
    }
    const deleteTodo=(id)=>{
        setTodos(todos.filter(todo=>todo.id!==id));
    }
    const toggleTodo=(id)=>{
        setTodos(todos.map(todo=>{
            if(todo.id===id){
                todo.completed=!todo.completed;
            }
        }))
    }
    return (
        <div>
            <h2>我的待办事项</h2>
            <input
            value={inputValue}
            onChange={(e)=>{setInputValue(e.target.value)}}
            onKeyDown={(e)=>{
                if(e.key==='Enter'){
                    addTodo();
                }
            }}
            />
            <button onClick={addTodo}>添加</button>
        

         <ul>
                {
                    todos.map(todo=>(
                        <li key={todo.id}>
                            <span onClick={()=>toggleTodo(todo.id)}>
                                <input type='checkbox' checked={todo.completed} readOnly/>
                                {todo.text}
                            </span>
                            <button onClick={()=>deleteTodo(todo.id)}>删除</button>
                        </li>
                    ))
                }
            </ul>
            </div>
    )
}