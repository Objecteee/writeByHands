class Scheduler{
    constructor(limit){
        this.max=limit;
        this.now=0;
        this.queue=[];
    }
    add(promise){
        return new Promise((resolve)=>{
            this.queue.push({promise,resolve});
            this.run()
        })
    }
    run(){
        if(this.now<max&&this.queue.length>0){
            this.now++;
            const {promise,resolve}=this.queue.shift();
            promise().then((res)=>{
                this.now--;
                resolve(res);
                this.run();
            })
        }
    }
}
const setTime=(time)=>{
    return new Promise(resolve=>setTimeout(resolve,time));
}
const scheduler=new Scheduler(2)
const addTask=(time,order)=>{
    scheduler.add(()=>setTime(time)).then(
        ()=>console.log(order)
    )
}