import { resolve } from "dns";

//ランダムでsleepさせるfunction
export class Sleep {

  public shallowSleep(depth: Depth) {
    let time: number
    
    switch (depth) {
      case Depth.Shallow:
        time = Math.floor(Math.random() * 1000) + 1000
        break;

      case Depth.Middle:
        time = Math.floor(Math.random() * 2000) + 2000
        break;
      case Depth.Deep:
        time = Math.floor(Math.random() * 4000) + 4000
        break
      default:
        time = 1000
        break
    }

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`私こんなに待ったんだよ？${time}`)
      }, time);
    })
  }
}

enum Depth {
  Shallow,
  Middle,
  Deep
}

(async () => {
  const aaa = await new Sleep().shallowSleep(2)
  console.log(aaa)
})()


// function sampleResolve(value: any) {
//   return new Promise(resolve => {
//       setTimeout(() => {
//           resolve(value * 2);
//       }, 2000);
//   })
// }

/**
* sampleResolve()をawaitしているため、Promiseの結果が返されるまで処理が一時停止される
* 今回の場合、2秒後にresolve(10)が返ってきてその後の処理（return result + 5;）が再開される
* resultにはresolveされた10が格納されているため、result + 5 = 15がreturnされる
*/
// async function sample() {
//   const result: any = await sampleResolve(5);
//   return result + 5;
// }

// sample().then(result => {
//   console.log(result); // => 15
// });