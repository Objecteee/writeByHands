class Scheduler1{
    constructor(){
        this.queue=[];
        this.runCount=0;
        this.maxCount=2;
    }
    add(promiseGenerator){
        return new Promise((resolve)=>{
            const task=()=>{
                return promiseGenerator().then(()=>resolve());
            }
            this.queue.push(task);
            task.run();
        })

    }
    run(){
        if(this.queue.length>0&&this.runCount<this.maxCount){
            this.runCount++;
            const task=this.queue.shift();
            task().then(()=>{
                this.runCount--;    
                this.run();
            });
        }
    }
}

const timeout = (time) =>
  new Promise((resolve) => {
    setTimeout(resolve, time);
  });

const scheduler = new Scheduler1();

const addTask = (time, order) => {
  scheduler
    .add(() => timeout(time))
    .then(() => console.log(order));
};

addTask(1000, "1");
addTask(500, "2");
addTask(300, "3");
addTask(400, "4");