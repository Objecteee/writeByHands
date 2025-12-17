import React, { useState } from 'react';

const TodoList = () => {
  // 1. 定义状态：数组存储对象 { id, text, completed }
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  // 2. 添加逻辑
  const addTodo = () => {
    if (!inputValue.trim()) return; // 判空处理
    const newTodo = {
      id: Date.now(), // 简单生成 ID，面试够用
      text: inputValue,
      completed: false,
    };
    setTodos([...todos, newTodo]);
    setInputValue(''); // 清空输入框
  };

  // 3. 删除逻辑：使用 filter 过滤
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // 4. 切换状态逻辑：使用 map 更新
  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px' }}>
      <h2>我的待办事项</h2>
      
      {/* 输入区域 */}
      <div style={{ marginBottom: '20px' }}>
        <input 
          value={inputValue} 
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTodo()}
          placeholder="添加新任务..."
        />
        <button onClick={addTodo}>添加</button>
      </div>

      {/* 列表渲染区域 */}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos.map(todo => (
          <li key={todo.id} style={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            marginBottom: '10px',
            textDecoration: todo.completed ? 'line-through' : 'none' 
          }}>
            <span onClick={() => toggleTodo(todo.id)} style={{ cursor: 'pointer' }}>
              <input type="checkbox" checked={todo.completed} readOnly />
              {todo.text}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>删除</button>
          </li>
        ))}
      </ul>
      
      {/* 补充：简单的统计 */}
      <div>剩余任务: {todos.filter(t => !t.completed).length}</div>
    </div>
  );
};

export default TodoList;