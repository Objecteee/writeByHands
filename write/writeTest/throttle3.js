const throttle=(fn,time)=>{
    let now=Date.now();
    return function (...args){
        if(Date.now()-now>=time){
            fn.apply(this,args);
            now=Date.now();
        }
    }
}