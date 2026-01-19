const light=(color)=>{
    console.log(`当前亮灯${color}`);
}
const sleep=(time)=>{
    return new Promise((reslove)=>setTimeout(reslove,time));
}
const start=()=>{
    Promise.resolve()
        .then(()=>{
            light('红灯');
            return sleep(3000);
        }).then(()=>{
            light('黄灯');
            return sleep(3000);
        }).then(()=>{
            light('绿灯');
            return sleep(3000);
        }).then(()=>{
            start()
        })
}
start();