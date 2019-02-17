import * as webdriver from 'selenium-webdriver'
import {
    By,
    Key,
    until
} from 'selenium-webdriver'

import dotenv from 'dotenv'
const env = process.env 
console.log(env.EMAIL)

let driver;

async function accessPairs() {
    driver = new webdriver.Builder()
        .withCapabilities(webdriver.Capabilities.firefox())
        .build();
    try {
        await driver.get("https://www.facebook.com")
        await driver.findElement(By.id("email")).sendKeys("email")
        await driver.findElement(By.id("pass")).sendKeys("pass")

        // await driver.get('https://www.pairs.lv/');
        // await driver.findElement(By.className('login-facebook-button')).click()
        // await driver.findElement(By.id("email")).sendKeys("email")
        
        // await driver.wait(until.titleIs('webdriver - Google 検索'), 1000);
    } catch (e) {
        console.error(e);
    } finally {
        // await driver.quit();
    }
};
accessPairs();