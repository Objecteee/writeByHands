const promiseAll=(promise)=>{
    return new Promise((relosve,reject)=>{
        if(!Array.isArray(promise)) return reject('应该输入数组');
        const result=[];
        let count=0;
        if(promise.length===0){
            return relosve([])
        }
        promise.forEach((p,index)=>{
            Promise.resolve(p).then(
                (res)=>{
                    result[index]=res;
                    count++;
                    if(count===promise.length) return relosve(result);
                },
                (err)=>{
                    return reject(err)
                }
            )
        })
    })

}