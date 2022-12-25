`use strict`;

const { By, Key, until } = require("selenium-webdriver");
const { get } = require("selenium-webdriver/http");
const BasePage = require("./base.page");
module.exports = class CheckoutPage extends BasePage{
    #driver;

    constructor(webdriver) {
        super(webdriver);
        this.#driver = webdriver;
    }
    goToPage() {
        this.#driver.get("http://shop.qa.rs/checkout");
    }
    getCheckoutSuccessTitle() {
        return this.#driver.findElement(By.css('h2')).getText();
    }

    async getCheckoutOrderNumber(){
        return (await this.getCheckoutSuccessTitle()).replace(/\D/g, '');
    }

}