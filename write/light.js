// 模拟灯亮起的动作
function light(color) {
    console.log(`当前灯光: ${color}`);
}
// 封装一个延迟器 (Promise)
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function startTrafficLight() {
    while (true) {
        light('红灯');
        await sleep(3000); // 等待3秒

        light('绿灯');
        await sleep(2000); // 等待2秒

        light('黄灯');
        await sleep(1000); // 等待1秒
    }
}

// 执行
startTrafficLight();

// function step() {
//     Promise.resolve()
//         .then(() => {
//             light('红灯');
//             return sleep(3000);
//         })
//         .then(() => {
//             light('绿灯');
//             return sleep(2000);
//         })
//         .then(() => {
//             light('黄灯');
//             return sleep(1000);
//         })
//         .then(() => {
//             step(); // 递归调用实现循环
//         });
// }