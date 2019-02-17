import * as webdriver from 'selenium-webdriver'
import {
    By,
    Key,
    until
} from 'selenium-webdriver'

import { Sleep } from './time'

import dotenv from 'dotenv'
dotenv.config()
// const env = process.env 

let driver: any
let sleep

async function accessPairs() {
    driver = new webdriver.Builder()
        .withCapabilities(webdriver.Capabilities.firefox())
        .build();
    sleep = new Sleep()
    
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
        await sleep.shallowSleep(2)
        await sleep.shallowSleep(2)
        await sleep.shallowSleep(2)

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
        await driver.get('https://pairs.lv/#/search/one/1')
        await sleep.shallowSleep(2)
        await driver.get('https://pairs.lv/#/search/one/1')
        await sleep.shallowSleep(2)

        await driver.findElement(By.id("openSearchConditionBtn")).click()
        await sleep.shallowSleep(0)
        const select = await driver.findElement(By.id("select-lastlogin"))
        await sleep.shallowSleep(0)
        await select.click()
        await sleep.shallowSleep(0)
        await driver.findElement(By.xpath("//*[text()=\"1週間以内\"]")).click()
        

        //足跡開始
        // let count = 0
        // let limit = 5
        // while (count < limit) {

        // }
        

        
    } catch (e) {
        console.error(e);
    } finally {
        // await driver.quit();
    }
};
accessPairs();