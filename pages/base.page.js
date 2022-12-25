`use strict`;

const { By, Key, until } = require("selenium-webdriver");
module.exports = class BasePage {
    #driver;
    constructor(webdriver) {
        this.#driver = webdriver;
    }
    async clickOnGetOrderHistoryLink() {
        const orderHistoryLink = await this.#driver.findElement(By.linkText('Order history'));
        await orderHistoryLink.click();
    }
}