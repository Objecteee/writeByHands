/**
 * 深拷贝实现
 * @param {Object} target 目标对象
 * @param {WeakMap} map 用于存储已拷贝过的对象，解决循环引用
 */
function deepClone(target, map = new WeakMap()) {
    // 1. 处理原始类型（Number, String, Boolean, null, undefined, Symbol）
    if (typeof target !== 'object' || target === null) {
        return target;
    }

    // 2. 处理特殊对象类型：日期和正则
    if (target instanceof Date) return new Date(target);
    if (target instanceof RegExp) return new RegExp(target);

    // 3. 检查循环引用：如果已经拷贝过，直接返回之前存储的对象
    if (map.has(target)) {
        return map.get(target);
    }

    // 4. 初始化克隆对象（兼容数组和普通对象）
    const cloneTarget = Array.isArray(target) ? [] : {};

    // 5. 存储当前对象到 map
    map.set(target, cloneTarget);

    // 6. 递归拷贝属性（使用 Reflect.ownKeys 处理 Symbol 键名）
    Reflect.ownKeys(target).forEach(key => {
        cloneTarget[key] = deepClone(target[key], map);
    });

    return cloneTarget;
}