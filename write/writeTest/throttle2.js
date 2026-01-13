function throttle(fn,time){
    let now=Date.now();
    return (...args)=>{
        if(Date.now()-time<=0){
            fn.apply(this,args);
            now=Date.now();
        }
    }
}