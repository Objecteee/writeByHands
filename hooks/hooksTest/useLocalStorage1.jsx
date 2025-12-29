import React,{useState} from 'react';
function useLocalStorage1(key,initialValue){
    const [storedValue,setStoredValue]=useState(()=>{
        try{
            const item=window.localStorage.getItem(key);
            return item?JSON.parse(item):initialValue;
        }catch(error){
            console.error("读取 localStorage 出错:", error);
            return initialValue;
        }
    })
    const setValue=(value)=>{
        const valueToStore =value instanceof Function?value(storedValue):value;
        try{
            setStoredValue(valueToStore);
            window.localStorage.setItem(key,JSON.stringify(valueToStore));
        }catch(error){
            console.error("写入 localStorage 出错:", error);
        }
    }
    return [storedValue,setValue];
}