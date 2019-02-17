import * as webdriver from 'selenium-webdriver'
import {
    By,
    Key,
    until
} from 'selenium-webdriver'

import dotenv from 'dotenv'
dotenv.config()
// const env = process.env 

let driver;

async function accessPairs() {
    driver = new webdriver.Builder()
        .withCapabilities(webdriver.Capabilities.firefox())
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

        //facebookログイン成功
        await driver.get("https://www.facebook.com")
        await driver.findElement(By.id("email")).sendKeys(email)
        await driver.findElement(By.id("pass")).sendKeys(password)
        await driver.findElement(By.xpath("//input[@data-testid='royal_login_button']")).click()

        //pairsへ
        await driver.get('https://www.pairs.lv/');
        await driver.findElement(By.className('login-facebook-button')).click()
        
        
    } catch (e) {
        console.error(e);
    } finally {
        // await driver.quit();
    }
};
accessPairs();