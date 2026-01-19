// 两数之和
const twoSum=(nums,target)=>{
    const map=new Map();
    for(let i=0;i<nums.length;i++){
        if(map.has(target-nums[i])) return [i,map.get(target-nums[i])];
        map.set(nums[i],i);
    }
}

console.log(twoSum([1,2,3,4,5],9));

/**
 * 两数之和的要点是使用map去做存储已有的值
 * 当然，这是只有一种解的情况
 */