function deepClone(source, hash = new WeakMap()) {
  // 1. 处理非对象或 null
  if (typeof source !== 'object' || source === null) return source;

  // 2. 处理循环引用
  if (hash.has(source)) return hash.get(source);

  // 3. 处理特殊内置对象
  if (source instanceof Date) return new Date(source);
  if (source instanceof RegExp) return new RegExp(source.source, source.flags);
  
  if (source instanceof Map) {
    const cloned = new Map();
    hash.set(source, cloned);
    source.forEach((value, key) => {
      cloned.set(deepClone(key, hash), deepClone(value, hash));
    });
    return cloned;
  }

  if (source instanceof Set) {
    const cloned = new Set();
    hash.set(source, cloned);
    source.forEach(value => cloned.add(deepClone(value, hash)));
    return cloned;
  }

  // 4. 初始化克隆对象（保留原型链）
  const cloned = Array.isArray(source) 
    ? [] 
    : Object.create(Object.getPrototypeOf(source));
  
  hash.set(source, cloned);

  // 5. 修复遍历逻辑：使用 Reflect.ownKeys 获取所有属性名（包括 Symbol）
  Reflect.ownKeys(source).forEach(key => {
    cloned[key] = deepClone(source[key], hash);
  });

  return cloned;
}