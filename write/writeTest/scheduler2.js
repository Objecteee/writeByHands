class Scheduler{
    constructor(limit){
        this.queue=[];
        this.max=limit;
        this.now=0;
    }
    add(addPromise){
        return new Promise(resolve=>{
            this.queue.push({addPromise,resolve});
            this.run();
        })
    }
    run(){
        if(this.now<this.max&&this.queue.length>0){
            this.now++;
            const {addPromise,resolve}=this.queue.shift();
            addPromise().then((res)=>{
                this.now--;
                resolve(res);
                this.run();
            })
        }
    }
}
const timeout=(time)=>new Promise(resolve=>setTimeout(resolve,time));
const scheduler=new Scheduler(2);
const addTask=(time,order)=>{
    scheduler.add(()=>timeout(time)).then(()=>console.log(order))
}
addTask(1000, '1'); // 1秒后输出
addTask(500, '2');  // 0.5秒后输出
addTask(300, '3');  // 2号完成后（0.5s），3号进入，共0.8s后输出
addTask(400, '4');  // 1号完成后（1s），4号进入，共1.4s后输出