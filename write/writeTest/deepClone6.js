function deepClone(source,hash=new WeakMap()){
    if(typeof source!=='object'||source===null) return source;
    if(hash.has(source)) return hash.get(source);
    if(source instanceof Map){
        const cloned=new Map();
        hash.set(source,cloned);
        source.forEach((value,key)=>{
            cloned.set(deepClone(key,hash),deepClone(value,hash))
        })
    }
    if(source instanceof Set){
        const cloned=new Set();
        hash.add(source,cloned);
        source.forEach((key)=>{
            cloned.add(deepClone(key,hash))
        })
    }
    if (source instanceof Date) return new Date(source);
    if (source instanceof RegExp) return new RegExp(source.source, source.flags);
    const cloned= Array.isArray(source)?[]:Object.create(Object.getPrototypeOf(source));
    hash.set(source,cloned);
    Reflect.ownKeys(source).forEach((key)=>{
        cloned[key]=deepClone(source[key],hash);
    })
    return cloned;
}