/**
 * 手写 new 操作符
 * @param {Function} constructor 构造函数
 * @param {...any} args 传递给构造函数的参数
 */
function myNew(constructor, ...args) {
    // 1. 创建一个全新的空对象
    const obj = {};

    // 2. 将该对象的原型 (__proto__) 指向构造函数的原型对象 (prototype)
    // 这样对象就能访问构造函数原型上的方法
    Object.setPrototypeOf(obj, constructor.prototype);

    // 3. 执行构造函数，并将 this 绑定到这个新对象上
    // 使用 apply 执行函数，拿到返回值
    const result = constructor.apply(obj, args);

    // 4. 处理返回值：如果构造函数返回的是一个对象，则返回该对象；
    // 否则返回我们创建的新对象 obj
    return (result instanceof Object) ? result : obj;
}