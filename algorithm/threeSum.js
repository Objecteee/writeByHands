const threeSum=(nums)=>{
    const result=[];
    nums.sort((a,b)=>a-b);
    for(let i=0;i<nums.length-2;i++){
        if(nums[i]>0) break;
        if(i>0&&nums[i]===nums[i-1]) continue; 
        let n=i+1;
        let m=nums.length-1;
        while(n<m){
            if(nums[n]+nums[m]+nums[i]===0){
                result.push([nums[n],nums[m],nums[i]]);
                while(nums[n]===nums[n+1]) n++;
                while(nums[m]===nums[m-1]) m--;
                n++;
                m--;
            }else if(nums[n]+nums[m]+nums[i]<0){
                n++;
            }else{
                m--;
            }
        }
    }
    return result;
}
console.log(threeSum([-1,0,1,2,-1,-4]));

