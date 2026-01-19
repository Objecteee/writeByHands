const conncurentRequest=(urls,limit)=>{
    return new Promise((reslove,reject)=>{
        if(!Array.isArray(urls)) return reject("urls应该是一个数组");
        if(urls.length===0){
            reslove([]);
            return ;
        }
        const result=[];
        let index=0;
        let count=0;
        async function request(){
            if(index>=urls.length) return;
            const i=index++;
            const url=urls[i];
            try{
                const response=await fetch(url,{method:'POST',body:'...'});
                const data=await response.json();
                result[i]=data;
            }catch(err){
                result[i]=data;
            }finally{
                count++;
                if(count===urls.length){
                    reslove(result);
                }else{
                    request()
                }
            }
        }
        const start=Math.min(limit,urls.length);
        for(let i=0;i<start;i++){
            request()
        }
    })
}