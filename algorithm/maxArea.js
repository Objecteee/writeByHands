const maxArea=(arr)=>{
    let i=0;
    let j=arr.length-1;
    let result=0;
    while(i<j){
         result=Math.max(result,Math.min(arr[i],arr[j])*(j-i));
         if(arr[i]>=arr[j]){
            j--;
         }else{
            i++;
         }
    }
    return result;
}