import * as webdriver from 'selenium-webdriver'
import {
    By,
    Key,
    until
} from 'selenium-webdriver'

import firefox from 'selenium-webdriver/firefox'
var firefoxOptions = new firefox.Options()
firefoxOptions.headless()
firefoxOptions.addArguments("--no-sandbox")
firefoxOptions.addArguments("--single-process")

// import { Sleep } from './time'

import dotenv from 'dotenv'
dotenv.config()
// const env = process.env 

let driver: any

async function accessPairs() {
    driver = new webdriver.Builder()
        .withCapabilities(webdriver.Capabilities.firefox())
        .setFirefoxOptions(firefoxOptions)
        .build();    
    try {
        let email: string
        let password: string

        if (!process.env.EMAIL || !process.env.PASSWORD) {
          console.error("環境変数が読み取られてないよ！")
          return
        } else {
          email = process.env.EMAIL
          password = process.env.PASSWORD
        }

        // facebookログイン成功
        await driver.get("https://www.facebook.com")
        await driver.findElement(By.id("email")).sendKeys(email)
        await driver.findElement(By.id("pass")).sendKeys(password)
        await driver.findElement(By.xpath("//input[@data-testid='royal_login_button']")).click()

        //pairsへ
        await driver.get('https://www.pairs.lv/');
        await driver.findElement(By.className('login-facebook-button')).click()
        await shallowSleep(2)
        // await sleep.shallowSleep(2)

        // let modal;
        
        // let modalFlag = true
        // while (modalFlag) {
        //   modal = await driver.findElement(By.className('modal_close'))
        //   if (modal) {
        //     await modal.click()
        //   } else {
        //     modalFlag = false
        //   }
        // }


        //検索条件追加

        const startIndex = Math.floor(Math.random() * 5000)

        await shallowSleep(2)
        await driver.get(`https://pairs.lv/#/search/one/${startIndex}`)
        await shallowSleep(2)
        await driver.get(`https://pairs.lv/#/search/one/${startIndex}`)
        await shallowSleep(2)
        await driver.get(`https://pairs.lv/#/search/one/${startIndex}`)
        await shallowSleep(2)
        await driver.findElement(By.id("openSearchConditionBtn")).click()
        await shallowSleep(2)
        await driver.findElement(By.xpath(`//*[text()=\"更に詳しい条件を設定する\"]`)).click()

        await shallowSleep(0)

        await driver.findElement(By.xpath(`//*[text()=\"1週間以内\"]`)).click()
        await shallowSleep(2)

        // const select = await driver.findElement(By.id("select-lastlogin"))
        // await sleep.shallowSleep(0)
        // await select.click()

        // let searchConditions = []
        // searchConditions.push(process.env.SEARCH_CONDITIONS_1)
        // searchConditions.push(process.env.SEARCH_CONDITIONS_2)
        // searchConditions.push(process.env.SEARCH_CONDITIONS_3)
        // searchConditions.push(process.env.SEARCH_CONDITIONS_4)
        
        // for (let i = 0; i < searchConditions.length; i++) {
        //   if (!searchConditions[i]) {
        //     continue
        //   }


        //   await sleep.shallowSleep(1)
        //   const element = await driver.findElement(By.xpath(`//*[text()=\"${searchConditions[i]}\"]`)).click()
        //   // driver.actions().moveToElement(element).perform();
        //   driver.executeScript("arguments[0].scrollIntoView()", element);
        //   await sleep.shallowSleep(1)
        //   element.click()
        //   await sleep.shallowSleep(1)
        // }

        await driver.findElement(By.id("submitSearchConditionBtn")).click()
        await shallowSleep(1)
        await shallowSleep(1)

        // 足跡開始
        let count = 0
        let limit = Math.floor(Math.random() * 2000)

        

        while (count < limit) {
          count++

          try {
            await driver.findElement(By.xpath(`//*[text()=\"次へ\"]`)).click()
            await shallowSleep(1)
          } catch {
            count = 100000000
          }
          console.log(count)
        }
        

        
    } catch (e) {
        console.error(e);
    } finally {
        // await driver.quit();
    }
};
accessPairs();

import { resolve } from "dns";

//ランダムでsleepさせるfunction


function shallowSleep(depth: Depth) {
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


enum Depth {
  Shallow,
  Middle,
  Deep
}