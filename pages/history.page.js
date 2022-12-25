`use strict`;

const { By, Key, until } = require("selenium-webdriver");
const { get } = require("selenium-webdriver/http");
const BasePage = require("./base.page");

module.exports = class HistoryPage extends BasePage {
    #driver;

    constructor(webdriver) {
        super(webdriver); 
        this.#driver = webdriver;
    }
    goToPage() {
        this.#driver.get("http://shop.qa.rs/history");
    }
    getHistoryTable() {
        return this.#driver.findElement(By.css('table'));
    }
    getOrderRow(orderNum){
        const xpathHistoryRow = `//td[contains (., "#${orderNum}")]/parent::tr`;
        return this.getHistoryTable().findElement(By.xpath(xpathHistoryRow));
    }

    getHistoryStatus(orderRow){
        return OrderRow.findElement(By.className('status'));
    } 
}