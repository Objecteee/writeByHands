class Scheduler{
    constructor(limit){
        this.limit=limit;
        this.now=0;
        this.queue=[];
    }
    add(addPromise){
        return new Promise(resolve=>{
            this.queue.push({addPromise,resolve});
            this.run();
        })
    }
    run(){
        if(this.queue.length>0&&this.now<this.limit){
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
const timeout = (time) => new Promise(resolve => setTimeout(resolve, time));
const addTask=(time,order)=>{
    scheduler.add(()=>timeout(time)).then(()=>{
        console.log(order);
    })
}