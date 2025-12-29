import React,{useState} from 'react';
const TodoList=()=>{
    const [todos,setTodos]=useState([]);
    const [inputValue,setInputValue]=useState('');
    const addTodo=()=>{
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
                return {...todo,completed:!todo.completed};
            }
            return todo;
        }))
    }
    return (
        <div>
            <h2>我的代办事项</h2>
            <div>
                <input
                    value={inputValue}
                    onKeyDown={(e)=>{
                        if(e.key==='Enter'){
                            addTodo();
                        }
                    }}
                    onChange={(e)=>{setInputValue(e.target.value)}}
                    placeholder='添加新任务...'
                />
                <button onClick={()=>addTodo()}>添加</button>
            </div>
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