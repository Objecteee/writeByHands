import React,{useState} from 'react';
const useDebounce=(initValue,delay)=>{
    const [value,setValue]=useState(initValue);
    useEffect(()=>{
        let timer=setTimeout(()=>{
            setValue(value);
        },delay);
        return ()=>{
            if(timer) clearTimeout(timer);
        }
    },[value,delay])
    return value;
}