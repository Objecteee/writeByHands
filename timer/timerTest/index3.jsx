import React,{useState,useEffect} from 'react';
const Timer=(init=60)=>{
    const [seconds,setSeconds]=useState(init);
    const [isActive,setIsActive]=useState(false);
    const start=()=>{setIsActive(true)}
    const stop=()=>{setIsActive(false)}
    const reset=()=>{
        setSeconds(init);
        setIsActive(false);
    }
    useEffect(()=>{
        let timer=null;
        if(seconds>0&&isActive===true){
            timer=setInterval(()=>{
                setSeconds((prev)=>{
                    if(prev<=1){
                        setIsActive(false);
                        clearInterval(timer);
                        return 0;
                    }
                    return prev-1;
                })
            },1000)
        }
        return ()=>{
            if(timer) clearInterval(timer)
        }
    },[isActive]);
    return(
        <div>
            <h1>{seconds}s</h1>
            <button onClick={()=>{start()}} disabled={isActive}>开始</button>
            <button onClick={()=>{stop()}}>暂停</button>
            <button onClick={()=>{reset()}}>重置</button>
        </div>
    )
}