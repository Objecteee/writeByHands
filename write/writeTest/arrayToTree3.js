const ArrayToTree=(arrs)=>{
    const result=[];
    const map=new Map();
    for(const arr of arrs){
        map.set(arr.id,{...arr,children:[]});
    }
    for(const arr of arrs){
        const parentId=arr.parentId;
        const item=map.get(arr.id);
        if(parentId===null) {
            result.push(item);
        }else{
            if(map.has(parentId)){
                map.get(parentId).children.push(item);
            }
        }
    }
    return result;
}