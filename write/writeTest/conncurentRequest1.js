function conncurentRequest(urls,limit){
    return new Promise((reslove)=>{
        if(urls.length===0){
            reslove([]);
            return;
        }
    
    const results=[];
    let index=0;
    let count=0;
    async function request(){
        if(index===urls.length) return ;
        const i=index++;
        const url=urls[i];
        try{
            console.log(`开始上传${url}`);
            const response = await fetch(url,{method:'POST',body:'...'});
            const data=await response.json();
            results[i]=data;
        }catch(err){
            results[i]=err; 
        }finally{
            count++;
            if(count===url.length){
                reslove();
            }else{
                count++;
                if(count===urls.length){
                    reslove(result);
                }else{
                 request();
                }
            }
        }
    }
    const startCount=MMath.min(limit,urls.length);
    for(let i=0;i<startCount;i++){
        request();
    }
    })
}