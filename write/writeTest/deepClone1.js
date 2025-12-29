function deepClone(source,hash=new WeakMap()){
    if(typeof source !=='object' ||source===null) return source;
    if(hash.has(source)) return hash.get(source);
    if(source instanceof Date) return new Date(source);
    if(source instanceof RegExp) return new RegExp(source.source, source.flags);
    if(source instanceof Map){
        const map=new Map();
        map.set(source,map);
        source.forEach((key,value)=>{
            map.set(deepClone(key,hash),deepClone(value,hash));
        })
    }
    if(source instanceof Set){
        const set  =new Set();
        set.add(source,set);
        set.forEach(value=>{
            set.add(deepClone(value,hash));
        })
    }
    const cloned=Array.isArray(source)?[]:Object.create(Object.getPrototypeOf(source));
    hash.set(source,cloned);
    Reflect.ownKeys(source).forEach(key=>{
        cloned[key]=deepClone(source[key],hash);
    })
    return cloned;
}