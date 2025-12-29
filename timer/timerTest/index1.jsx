import React,{useState,useEffect} from 'react';
const Timer=({initialSeconds=60})=>{
    const [seconds,setSeconds]=useState(initialSeconds);
    const [isActive,setIsActive]=useState(false);
    const handleStart=()=>{
        setIsActive(true);
    }
    const handlePause=()=>{
        setIsActive(false);
    }
    const reset=()=>{
        setIsActive(false);
        setSeconds(initialSeconds);
    }
    useEffect(()=>{
        let interval=null;
        if(seconds>0&&isActive===true){
            interval=setInterval(()=>{
                setSeconds(prev=>{
                    if(prev<=1){
                        setIsActive(false);
                        clearInterval(interval);
                        return 0;
                    }
                    return prev-1;
                })
            },1000)
        }
        return ()=>{
            if(interval){
                clearInterval(interval);
            }
        }
    },[isActive]);
    return (
        <div>
            <p>当前时间: {seconds}</p>
            <button onClick={handleStart} disabled={isActive || seconds === 0}>开始</button>
            <button onClick={handlePause}>暂停</button>
            <button onClick={reset}>重置</button>
        </div>
    )
}