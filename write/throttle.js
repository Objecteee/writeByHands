function throttle(fn, limit) {
  let lastCall = 0; // 上次执行的时间戳

  return function(...args) {
    const now = Date.now();
    
    // 如果当前时间减去上次执行时间大于设定的限制，则执行
    if (now - lastCall >= limit) {
      lastCall = now;
      fn.apply(this, args);
    }
  };
}