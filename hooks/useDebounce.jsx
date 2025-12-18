import { useState, useEffect } from 'react';
/**
 * @param value 需要防抖的值
 * @param delay 延迟时间（毫秒）
 */
function useDebounce(value, delay) {
  // 1. 设置一个内部状态来存储防抖后的值
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // 2. 设置定时器，在 delay 毫秒后更新 debouncedValue
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // 3. 关键：清除函数（Cleanup）
    // 如果 value 或 delay 在定时器触发前发生变化，
    // React 会执行这个清除函数，取消之前的定时器，重新计时。
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // 只要 value 或 delay 变化，就重新运行 effect

  return debouncedValue;
}

export default useDebounce;

// const debouncedSearchTerm = useDebounce(searchTerm, 500);