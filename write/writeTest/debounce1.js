const debounce=(fn,delay)=>{
    let timer=null;
    return (...arg)=>{
        if(timer) clearTimeout(timer);
        timer=setTimeout(()=>{
            fn.apply(this,arg)
        },delay)
    }
}