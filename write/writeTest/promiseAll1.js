const promiseAll=(promise)=>{
    return new Promise((resolve,reject)=>{
        if(!Array.isArray(promise)){
            return reject(new TypeError("传入的不是数组"));
        }
        const result=[];
        let count=0;
        if(promise.length===0){
            return resolve([])
        }
        promise.forEach((p,index)=>{
            Promise.resolve(p).then(
                (res)=>{
                    result[index]=res;
                    count++;
                    if(count===promise.length){
                      return resolve(result);
                    }
                },
            (err)=>{
                return reject(err);
            }
            )
            
        })
    })
    
}