import { useState, useEffect } from 'react';

/**
 * @param key 存储在 localStorage 中的键
 * @param initialValue 初始值
 */
function useLocalStorage(key, initialValue) {
  // 1. 初始化状态：优先从 localStorage 读取，没有则使用初始值
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      // localStorage 存的是字符串，需要解析成对象
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("读取 localStorage 出错:", error);
      return initialValue;
    }
  });

  // 2. 定义更新函数
  const setValue = (value) => {
    try {
      // 支持函数式更新（如：setValue(prev => prev + 1)）
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // 保存状态到 React
      setStoredValue(valueToStore);
      
      // 保存到 localStorage（记得转成字符串）
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error("写入 localStorage 出错:", error);
    }
  };

  return [storedValue, setValue];
}

export default useLocalStorage;