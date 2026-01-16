function flatten(arr,depth){
    if(depth<0||!Array.isArray(arr)){
        return arr;
    }
    return arr.reduce((result,itme)=>{
        return result.concat(
            Array.isArray(itme)?flatten(arr,depth-1):arr
        )
    },[])
}