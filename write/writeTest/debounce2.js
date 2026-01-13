function debounce(fn,delay){
    let timer=null;
    return (...args)=>{
        if(timer!==null) clearTimeout(timer)
        timer=setTimeout(()=>{
            fn.apply(this,args)
        },delay)
    }
}