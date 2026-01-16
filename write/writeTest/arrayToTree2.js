import { Children } from "react";

const arrayToTree=(items)=>{
    const result=[];
    const map=new Map();
    for(const item of items){
        map.set(id,{...item,children:[]})
    }
    for(const item of items){
        const id=item.id;
        const parentId=item.id;
        const fItem=map(id);
        if(parentId===null){
            result.push(fItem);
        }else{
            if(map[parentId]) map(parentId).children.push(fItem)
        }
    }
}