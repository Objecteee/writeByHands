class Scheduler {
  constructor() {
    this.queue = []; // 存储待执行的任务
    this.maxCount = 2; // 最大并发限制
    this.runCount = 0; // 当前正在执行的任务数量
  }

  add(promiseGenerator) {
    // 返回一个新的 Promise，只有当任务真正完成时，这个 Promise 才会 resolve
    return new Promise((resolve) => {
      // 1. 将任务包装成一个函数存入队列
      // 我们存入的是一个“逻辑包”，它包含：运行异步函数、resolve 外部的 Promise
      const task = () => {
        return promiseGenerator().then(() => resolve());
      };

      this.queue.push(task);
      
      // 2. 尝试执行任务
      this.run();
    });
  }

  run() {
    // 检查：如果有等待的任务，且当前运行数未达到上限，则开始执行
    if (this.queue.length > 0 && this.runCount < this.maxCount) {
      this.runCount++;
      const task = this.queue.shift(); // 取出队列中的第一个任务

      // 执行任务
      task().then(() => {
        // 3. 任务完成后，释放名额，并递归调用 run 尝试执行下一个排队任务
        this.runCount--;
        this.run();
      });
    }
  }
}

// --- 测试逻辑 ---

const timeout = (time) =>
  new Promise((resolve) => {
    setTimeout(resolve, time);
  });

const scheduler = new Scheduler();

const addTask = (time, order) => {
  scheduler
    .add(() => timeout(time))
    .then(() => console.log(order));
};

addTask(1000, "1");
addTask(500, "2");
addTask(300, "3");
addTask(400, "4");

// 期望输出: 2 3 1 4