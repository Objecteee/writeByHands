// 字母异位词
groupAnagrams=(strs)=>{
    const map=new Map();
    for(const str of strs){
        const key=Array.from(str).sort().join('');
        const list=map.has(key)?map.get(key):[];
        list.push(str);
        map.set(key,list);
    }
    return Array.from(map.values());
}
console.log(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]));

/**
 * 这题的关键是找到key，key是组成字符相同的字符串的共性值，这里是使用的排序后的字符串很好
 */