import React,{useState} from 'react';
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
            <div>
                <input 
                    value={inputValue}
                    onChange={(e)=>{setInputValue(e.target.value)}}
                    onKeyDown={(e)=>{
                        if(e.key==='Enter'){
                            addTodo();
                        }
                    }}
                    placeholder="添加新任务..."
                />
                <button onClick={addTodo}>添加</button>
            </div>
            <ul>
                {
                    todos.map(todos=>(
                        <li key={todos.id}>
                            <span onClick={()=>toggleTodo(todos.id)}>
                                <input type='checkbox' checked={todos.completed} readOnly/>
                                {todos.text}
                            </span>
                            <button onClick={()=>deleteTodo(todos.id)}>删除</button>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}
export default TodoList;