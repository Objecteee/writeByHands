import React,{useState,useEffect,useRef} from 'react';
function useThrottle1(value,interval){
    const [throttledValue,setThrottledValue]=useState(value);
    const lastUpdate=useRef(Date.now());
    useEffect(()=>{
        let remainTime=interval-(Date.now()-lastUpdate.current);
        let timer=null;
        if(remainTime<=0){
            setThrottledValue(value);
            lastUpdate.current=Date.now();
        }else{
            let timer=setTimeout(()=>{
                setThrottledValue(value);
                lastUpdate.current=Date.now();
            },remainTime)
        }
        return  ()=>{
            if(timer){
                clearTimeout(timer);
            }
        }
    },[value,interval])
    return throttledValue;
}