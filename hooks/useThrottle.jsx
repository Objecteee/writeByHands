import { useState, useEffect, useRef } from 'react';

/**
 * @param value 需要节流的值
 * @param interval 节流间隔时间（毫秒）
 */
function useThrottle(value, interval = 500) {
  const [throttledValue, setThrottledValue] = useState(value);
  // 使用 useRef 记录上一次成功更新的时间，跨渲染周期保持
  const lastUpdated = useRef(Date.now());

  useEffect(() => {
    const now = Date.now();
    const remainingTime = interval - (now - lastUpdated.current);

    if (remainingTime <= 0) {
      // 1. 如果距离上次更新已超过间隔，立即更新
      setThrottledValue(value);
      lastUpdated.current = now;
    } else {
      // 2. 如果还在间隔期内，设置一个定时器补齐最后的更新
      // 这样可以确保最后一次输入不会被完全丢失
      const handler = setTimeout(() => {
        setThrottledValue(value);
        lastUpdated.current = Date.now();
      }, remainingTime);

      return () => clearTimeout(handler);
    }
  }, [value, interval]);

  return throttledValue;
}

export default useThrottle;