const throttle=(fn,time)=>{
    let timer=null;
    return (...args)=>{
        if(timer) return;
        timer=setTimeout(()=>{
            fn.apply(this,args);
            timer=null;
        },time)
    }
}