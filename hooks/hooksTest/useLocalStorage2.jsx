import React,{useState,useEffect} from 'react';
const useLocalStorage=(key,init)=>{
    const [itme,setItme]=useState(()=>{
        try{
            const value=window.localStorage.getItme(key);
            return value?JSON.parse(value):init;
        }catch(error){
            console.log("获取初始值失败",error);
            return init;
        }
    })
    const setValue=(value)=>{
        const valueToStore =value instanceof Function?value(storedValue):value;
        try{
            setItme(valueToStore);
            window.localStorage.setItem(key,JSON.parse(valueToStore))
        }catch(error){
            console.log("写入出错",error)
        }
    }
    return [itme,setValue]   
}