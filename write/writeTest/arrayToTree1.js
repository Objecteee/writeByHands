import { Children } from "react";
function arrayToTree(items){
    const result=[];
    const map=new Map();
    for(const item of items){
        map.set(item.id,{...item,children:[]});
    }
    for(const item of items){
        const id=item.id;
        const parentID=item.parent;
        const nowItem=map[id];
        if(parentID===null){
            result.push(nowItem);
        }else{
            if (map[parentID]) {
                map[parentID].children.push(nowItem);
            }
        }
    }
    return result;
}