import { useCallback, useRef } from 'react';

/**
 * @param fn 需要执行的函数
 * @param delay 延迟时间
 */
function useDebounceFn(fn, delay) {
  // 1. 使用 useRef 存储定时器，确保跨渲染周期能找到它
  const timer = useRef(null);

  // 2. 使用 useCallback 包装返回的函数，保证引用地址不变
  // 否则每次组件渲染都会生成新的防抖函数，导致定时器永远被重置
  const debouncedFn = useCallback((...args) => {
    // 3. 如果已经在计时了，直接清除旧闹钟
    if (timer.current) {
      clearTimeout(timer.current);
    }

    // 4. 开启新闹钟
    timer.current = setTimeout(() => {
      fn(...args);
    }, delay);
  }, [fn, delay]);

  return debouncedFn;
}

export default useDebounceFn;