import React,{useState,useEffect,useRef} from 'react';
const useThrottle=(initValue,time)=>{
    const [value,setValue]=useState(initValue);
    let now=useRef(Date.now());
    useEffect(()=>{
        let timer=null;
        if(Date.now()-now<=0){
            setValue(value);
            now.current=Date.now();
        }else{
            timer=setTimeout(()=>{
                setValue(value);
                now.current=Date.now();

            })
        }
        return ()=>{
            if(timer) clearTimeout(timer)
        }
    },[value,time])
    return value;
}