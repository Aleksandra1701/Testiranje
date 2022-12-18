`use strict`;

/*function delay(time) {
    return new Promise (function (resolve) {
             setTimeout(resolve, time)
            });
}
//use await driver.sleep() instead
*/
require("chromedriver");
const webdriver = require("selenium-webdriver");
const { By, Key, until } = require("selenium-webdriver");
const chai = require("chai");
const assert = chai.assert;
const expect = chai.expect;

describe("Selenium tests", function() {
    let driver;
    

    before(function() {
            driver = new webdriver.Builder().forBrowser("chrome").build();  // uradice sve za nase potrebe da koristimo Chrome
             
        });

    after(async function() {
          await driver.quit();   //gasi chrome i cisti za sobom. Gde god imamo await f-ja mora biti async
});

    it("Open  qa.rs website", async function() {
    await driver.get("http://qa.rs");

         const pageTitle = await driver.getTitle();   //cita naslov title
         expect(pageTitle).to.contain("QA.rs");
         assert.equal(pageTitle, "Edukacija za QA testere - QA.rs");

     });

     it("Open google.com", async function(){
        await driver.get("https://google.com");
        const pageTitle = await driver.getTitle(); 
        expect(pageTitle).to.contain("Google"); 
     });

     it("Perform a search on Google", async ()  =>  {
           expect(await driver.getTitle()).to.contain("Google"); 
           const inputSearch = await driver.findElement(By.name("q")); // trazi element na stranici po atributu name
           inputSearch.click(); // click na input polje
           inputSearch.sendKeys("qa.rs", Key.ENTER); // simulira kucanje na tastaturi. ukucaj qa.rs i ptitisni Enter
           await driver.wait(until.elementLocated(By.id("search")));
           expect(await driver.getTitle()).to.contain("qa.rs");
           
     });

     it("Go to next page on search results", async function() {
        expect(await driver.getTitle()).to.contain("qa.rs");
        const navigation = await driver.findElement(By.xpath('(//div[@role="navigation"])[2]'));
        const nextpage = navigation.findElement(By.id("pnnext"));
        nextpage.click();
        await driver.wait(until.elementLocated(By.id("search")));
        expect(await driver.getTitle()).to.contain("qa.rs");
     });
    });  
