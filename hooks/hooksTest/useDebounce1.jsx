import React,{useState} from "react";

function useDebounce1(value,delay){
    const [debouncedValue,setDebouncedValue]=useState(value);
    useEffect(()=>{
        const timer=setTimeout(()=>{
            setDebouncedValue(value);
        },delay)
        return ()=>{
            clearTimeout(timer);
        }
    },[value,delay]);
    return debouncedValue;

}
export default useDebounce1;