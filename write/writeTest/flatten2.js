const flatten=(arr,depth)=>{
    if(depth<=0||!Array.isArray(arr)) return arr;
    return arr.reduce((result,item)=>{
        return result.concat(
            Array.isArray(item)?flatten(item,depth-1):item
        )
    },[])
}