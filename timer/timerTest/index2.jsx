// useEffect(()=>{
//         let interval=null;
//         if(seconds>0&&isActive===true){
//             interval=setInterval(()=>{
//                 setSeconds(prev=>{
//                     if(prev<=1){
//                         setIsActive(false);
//                         clearInterval(interval);
//                         return 0;
//                     }
//                     return prev-1;
//                 })
//             },1000)
//         }
//         return ()=>{
//             if(interval){
//                 clearInterval(interval);
//             }
//         }
//     },[isActive]);

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
                return prev-1
            })
        },1000)
    }
    return ()=>{
        if(interval){
            clearInterval(interval);
        }   
    }
},isActive)


