`use strict`;

const { By, Key, until } = require("selenium-webdriver");
module.exports = class HomePage {
    #driver;

    constructor(webdriver) {
        this.#driver = webdriver;
    }

    goToPage() {
        this.#driver.get("http://shop.qa.rs/");
    }

    getPageHeaderTitle() {
        return this.#driver.findElement(By.css("h1")).getText();
    } 

    getWelcomeBackTitle() {
        return this.#driver.findElement(By.css("h2")).getText();
    }   

     isBugListDivDisplayed(){
               return this.#driver.findElement(
        By.xpath
                (`//*[@class="row" and contains (., "ORDER YOUR BUGS TODAY")]`
                      )
              ).isDisplayed();

          }

          isLogoutLinkDisplayed(){
            return this.#driver.findElement(By.partialLinkText('Logout')).isDisplayed();
 
          }
         async clickOnRegisterLink() {
            const registerLink = await this.#driver.findElement(By.linkText('Register'));
           await registerLink.click();
          }

          getSuccessAlertText() {
            return this.#driver.findElement(By.className('alert alert-success')).getText();
          }

          async clickOnLoginlink() {
            const loginLink = await this.#driver.findElement(By.linkText('Login'));
            await loginLink.click();
          }

          getPackageDiv(title) {
            const xpathPackage = `//h3[contains(text(), "${title}")]/ancestor::div[contains(@class, "panel")]`;
            return this.#driver.findElement(By.xpath(xpathPackage));
       }


          getQuantityDropdown(packageDiv) {
            return packageDiv.findElement(By.name('quantity'))
          }
          getQuantityOptions(QuantityDropdown) {
            return QuantityDropdown.findElements(By.css('option'));

          }
          getOrderButton(packageDiv) {
            return packageDiv.findElement(By.className('btn btn-primary'));

          }

          async clickOnViewShoppingCartLink() {
            const linkShoppingCart = await this.#driver.findElement(By.partialLinkText('shopping cart'));
            await linkShoppingCart.click();
        }
    }