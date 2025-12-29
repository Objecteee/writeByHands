import React, { useState, useEffect, useRef } from 'react';

const Timer = ({ initialSeconds = 60 }) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(false);
  // 核心逻辑：监听 isActive 和 seconds
useEffect(() => {
  let interval = null;

  if (isActive && seconds > 0) {
    interval = setInterval(() => {
      setSeconds(prev => {
        if (prev <= 1) {
          clearInterval(interval); // 倒计时结束
          setIsActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }

  // 清除函数
  return () => {
    if (interval) clearInterval(interval);
  };
}, [isActive]); // 依赖项只写 isActive

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