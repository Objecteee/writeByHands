function arrayToTree(items) {
  const result = [];   // 存放根节点
  const itemMap = {};  // 映射表

  // 1. 先将所有项存入 map，并初始化 children
  for (const item of items) {
    itemMap[item.id] = { ...item, children: [] };
  }

  // 2. 再次遍历，寻找父子关系
  for (const item of items) {
    const id = item.id;
    const parentId = item.parent;
    const treeItem = itemMap[id];

    if (parentId === null) {
      // 如果没有父节点，说明是根节点
      result.push(treeItem);
    } else {
      // 如果有父节点，将其放入父节点的 children 中
      // 此时 itemMap[parentId] 指向的是同一个内存地址
      if (itemMap[parentId]) {
        itemMap[parentId].children.push(treeItem);
      }
    }
  }

  return result;
}