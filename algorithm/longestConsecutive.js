// 最长连续序列
const longestConsecutive=(nums)=>{
    const set=new Set(nums);
    let result=1;
    for(const num of nums){
        let temp=1;
        nowNum=num
        if(set.has(nowNum-1)) continue;
        while(set.has(nowNum+1)){
            nowNum++;
            temp++;
        }
        result=Math.max(result,temp);
    }
    return result;
}
console.log(longestConsecutive([0,3,7,2,5,8,4,6,0,1]))