const promiseAllSettled = (promises) => {
    return new Promise((resolve, reject) => {
        // 1. 类型检查
        if (!Array.isArray(promises)) {
            return reject(new TypeError('Arguments must be an array'));
        }

        const result = [];
        let count = 0;
        const len = promises.length;

        // 2. 处理空数组
        if (len === 0) return resolve([]);

        promises.forEach((p, index) => {
            // 3. 包装 Promise.resolve 兼容非 Promise 值
            Promise.resolve(p).then(
                (value) => {
                    result[index] = {
                        status: 'fulfilled',
                        value
                    };
                },
                (reason) => {
                    result[index] = {
                        status: 'rejected',
                        reason
                    };
                }
            ).finally(() => {
                // 4. 无论成功还是失败，都会进入 finally
                count++;
                if (count === len) {
                    resolve(result);
                }
            });
        });
    });
};

// 测试一下
const p1 = Promise.resolve(1);
const p2 = Promise.reject("error");
const p3 = 3;

promiseAllSettled([p1, p2, p3]).then(console.log);
/*
输出:
[
  { status: 'fulfilled', value: 1 },
  { status: 'rejected', reason: 'error' },
  { status: 'fulfilled', value: 3 }
]
*/