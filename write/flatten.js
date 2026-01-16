function flatten(arr, depth = 1) {
  // 1. 递归终止条件：
  // 如果 depth 已经减到 0，或者 arr 根本不是数组，直接原样返回
  if (depth <= 0 || !Array.isArray(arr)) {
    return arr;
  }

  // 2. 核心逻辑：使用 reduce 累加结果
  return arr.reduce((result, item) => {
    return result.concat(
      // 3. 判断当前项是否需要继续递归
      Array.isArray(item) ? flatten(item, depth - 1) : item
    );
  }, []);
}

/**
 * const arr = [1, [2, [3, 4]]];
 * console.log(arr.flat(Infinity));
 */