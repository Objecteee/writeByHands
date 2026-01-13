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



//  FlatNode {
//   id: number;
//   parentId: number | null;
//   name: string;
// }

//  TreeNode {
//   id: number;
//   name: string;
//   children: TreeNode[];
// }

// function buildTree(nodes){
//   // TODO: 补全这段代码
//   const map=new Map();
//   const nodeF={}
//   const res=[]
//   for(let i=0;i<nodes.length;i++){
//     if(nodes[i].parentId===null) {
//         nodeF={id:nodes[i].id,name:nodes[i].name,children:[]}
//         res.push(nodeF)
//     }
//     map.set(nodes[i].id,{id:nodes[i].id,name:nodes[i].name,children:[]});
//   }
//   for(let i=0;i<nodes.length;i++){
//     const parentId=nodes[i].parentId;
//     if(parentId===nodeF.id){
//         nodeF.push(map.get(nodes[i].id))
//     }
//     if(map.has(parentId)){
//         map.get(parentId).children.push(map.get(nodes[i].id))
//     }
//   }
//   return res;
// }
// const a=[
//   { id: 1, parentId: null, name: 'Root' },
//   { id: 2, parentId: 1, name: 'Child 1' },
//   { id: 3, parentId: 1, name: 'Child 2' },
//   { id: 4, parentId: 2, name: 'Grandchild' }
// ]

// console.log(JSON.stringify(buildTree(a)));
