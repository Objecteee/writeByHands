import React, { useState, useEffect, useRef } from 'react';

const Timer = ({ initialSeconds = 60 }) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(false);
  // 使用 useRef 存储定时器 ID，方便跨渲染周期访问和清除
  const timerRef = useRef(null);

  // 核心逻辑：监听 isActive 和 seconds
  useEffect(() => {
    if (isActive && seconds > 0) {
      timerRef.current = setInterval(() => {
        // 关键点：使用函数式更新，确保拿到的是最新的状态值
        setSeconds(prev => prev - 1);
      }, 1000);
    } else if (seconds === 0) {
      clearInterval(timerRef.current);
      setIsActive(false);
    }

    // 重要：生命周期结束或状态变化时，必须清除定时器（防止内存泄漏）
    return () => clearInterval(timerRef.current);
  }, [isActive, seconds]);

  const handleStart = () => setIsActive(true);
  const handlePause = () => setIsActive(false);
  const handleReset = () => {
    setIsActive(false);
    setSeconds(initialSeconds);
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>{seconds}s</h1>
      <button onClick={handleStart} disabled={isActive}>开始</button>
      <button onClick={handlePause}>暂停</button>
      <button onClick={handleReset}>重置</button>
    </div>
  );
};

export default Timer;