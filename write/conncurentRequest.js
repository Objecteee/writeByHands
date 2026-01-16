/**
 * @param {Array} urls - 待上传的资源列表
 * @param {number} limit - 最大并发数
 */
function conncurentRequest(urls, limit) {
  return new Promise((resolve) => {
    if (urls.length === 0) {
      resolve([]);
      return;
    }

    const results = [];
    let index = 0; // 指向下一个待处理的任务索引
    let count = 0; // 已完成的任务计数

    async function request() {
      if (index === urls.length) return; // 递归出口

      // 1. 抢占当前索引，并递增 index 供下一个任务使用
      const i = index++;
      const url = urls[i];

      try {
        console.log(`开始上传: ${url}`);
        // 2. 使用 fetch 发起请求
        const response = await fetch(url, { method: 'POST', body: '...' });
        const data = await response.json();
        results[i] = data; // 保证结果顺序
      } catch (err) {
        results[i] = err;
      } finally {
        count++;
        // 3. 关键逻辑：
        if (count === urls.length) {
          // 全部完成
          resolve(results);
        } else {
          // 只要有一个坑位空出来，立即启动下一个
          request();
        }
      }
    }

    // 4. 初始化：启动第一批并发
    const startCount = Math.min(limit, urls.length);
    for (let i = 0; i < startCount; i++) {
      request();
    }
  });
}