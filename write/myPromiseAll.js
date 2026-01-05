function myPromiseAll(promises) {
  // 返回一个新Promise
  return new Promise((resolve, reject) => {
    // 处理非数组参数
    if (!Array.isArray(promises)) {
      return reject(new TypeError('The input must be an array'));
    }

    const result = []; // 存储成功结果
    let completedCount = 0; // 已完成的Promise数量
    const total = promises.length;

    // 空数组特殊处理
    if (total === 0) {
      return resolve(result);
    }

    promises.forEach((promise, index) => {
      // 确保每个元素都是Promise（非Promise则包装成成功的Promise）
      Promise.resolve(promise).then(
        (value) => {
          result[index] = value; // 按原顺序存储结果
          completedCount++;

          // 所有Promise都成功时resolve
          if (completedCount === total) {
            resolve(result);
          }
        },
        (reason) => {
          // 任一Promise失败立即reject
          reject(reason);
        }
      );
    });
  });
}

// 测试示例
const p1 = Promise.resolve(1);
const p2 = new Promise(resolve => setTimeout(() => resolve(2), 100));
const p3 = Promise.resolve(3);

myPromiseAll([p1, p2, p3]).then(values => {
  console.log(values); // [1, 2, 3]（顺序与输入一致）
});

// 测试失败情况
const p4 = Promise.reject('出错了');
myPromiseAll([p1, p4, p3]).catch(reason => {
  console.log(reason); // '出错了'（立即返回错误）
});
