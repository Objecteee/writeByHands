const promiseAll=(promise)=>{
    return new Promise((resolve,reject)=>{
        if(!Array.isArray(promise)) return reject("应该传入的是数组");
        let count=0;
        const result=[];
        if(promise.length===0) return resolve([]);
        promise.forEach((p,index)=>{
            Promise.resolve(p).then((res)=>{
                count++;
                result[index]=res
                if(count===promise.length)  resolve(result);
            },(err)=>{
                reject(err);
            })
        })
    })
}