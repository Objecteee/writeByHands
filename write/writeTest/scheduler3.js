class Scheduler{
    constructor(limit){
        this.max=limit;
        this.now=0;
        this.queue=[];
    }
    add(addPromise){
        return new Promise(resolve=>{
            this.queue.push({addPromise,resolve});
            this.run()
        })
    }
    run(){
        if(this.now<this.max&&this.queue.length>0){
            this.now++;
            const {addPromise,resolve}= this.queue.shift();
            addPromise().then((res)=>{
                this.now--;
                resolve(res);
                this.run()
            })
        }
    }
}
const timeout=(time)=>new Promise(reslove=>setTimeout(reslove,time));
const scheduler=new Scheduler(2);
const addTask=(time,order)=>{
    scheduler.add(()=>timeout(time)).then(()=>{console.log(order)})
}