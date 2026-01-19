const moveZeroes=(arr)=>{
     let j=0;
     for(let i=0;i<arr.length;i++){
        if(arr[i]!==0){
            [arr[i],arr[j]]=[arr[j],arr[i]];
            j++;
        }
     }
     return arr;
}
console.log(moveZeroes([0,1,0,2,0,3]))