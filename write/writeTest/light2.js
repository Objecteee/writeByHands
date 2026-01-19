const light=(light)=>{
    console.log(`现在是${light}...`);
}
const sleep=(time)=>{
    return new Promise(resolve=>setTimeout(resolve,time));
}
const start=()=>{
    Promise.resolve()
        .then(()=>{
            light("红灯");
            return sleep(3000);
        }).then(()=>{
            light("黄灯");
            return sleep(3000);
        }).then(()=>{
            light("绿灯");
            return sleep(3000);
        }).then(()=>{
            start();
        })
}
start();