function debounce(fn, delay) {
  let timer = null; // 创建一个标记用来存放定时器的返回值

  return function(...args) {
    // 每当用户输入/点击时，把前一个定时器清除
    if (timer) clearTimeout(timer);

    // 然后创建一个新的定时器
    timer = setTimeout(() => {
      fn.apply(this, args); // 确保 this 指向正确，并传递参数
    }, delay);
  };
}