import {useState} from 'react';
const TodoList=()=>{
    const [todos,setTodos]=useState([]);
    const [value,setValue]=useState('');
    const addTodo=()=>{
        const newTodo={
            id:Date.now(),
            text:value,
            completed:false,
        }
        setTodos([...todos,newTodo]);
        setValue('');
    }
    const deleteTodo=(id)=>{
        setTodos(todos.filter((todo)=>{todo.id!==id}))
    }
    const toggleTodo=(id)=>{
        setTodos(todos.map((todo)=>{
            if(todo.id===id){
                return {...todo,completed:!todo.completed}
            }
        }))
    }
    return (
        <div>
            <h2>我的待办实现</h2>
            <input
            value={value}
            onChange={(e)=>{setValue(e.target.value)}}
            onKeyDown={(e)=>{
                if(e.key==='Enter'){
                    addTodo();
                }
            }}
            type="text"
            placeholder="添加待办事项..."
            />
            <div>
                <ul>
                {
                    todos.map((todo=>(
                    <li key={todo.id}>
                        <span onClick={() => toggleTodo(todo.id)}>
                        <input type="checkbox" checked={todo.completed} readOnly />
                            {todo.text}
                        </span>
                        <button onClick={() => deleteTodo(todo.id)}>删除</button>
                    </li>
                    )))
                }
                </ul>
            </div>
        </div>
    )
}