function light(color){
    console.log(`当前亮灯${color}`)
}
const sleep=(ms)=>{
    return new Promise((reslove)=>setTimeout(reslove,ms));
}
function step(){
    Promise.resolve()
        .then(()=>{
            light('红灯'),
            sleep(3000)
        }).then(()=>{
            light('黄灯'),
            sleep(3000)
        }).then(()=>{
            light('绿灯'),
            sleep(3000)
        }).then(()=>{
            step()
        })
}