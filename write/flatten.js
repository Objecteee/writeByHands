function flatten(arr) {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      // 如果是数组，递归调用并将结果合并
      result = result.concat(flatten(arr[i]));
    } else {
      // 如果不是数组，直接放入结果集
      result.push(arr[i]);
    }
  }
  return result;
}
/**
 * const arr = [1, [2, [3, 4]]];
 * console.log(arr.flat(Infinity));
 */