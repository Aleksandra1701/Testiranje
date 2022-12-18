`use strict`;

require("chromedriver");
const webdriver = require("selenium-webdriver");
const { By, Key, until } = require("selenium-webdriver");
const chai = require("chai");
const assert = chai.assert;
const expect = chai.expect;
const HomePage = require("../pages/home.page");
const RegisterPage = require("../pages/register.page");
const LoginPage = require("../pages/login.page");

describe.only("shop.QA.rs tests", function() {
let driver;
let pageHomepage;
let pageRegister;
let pageLogin;
 
before(function() {
    driver = new webdriver.Builder().forBrowser("chrome").build(); 
    pageHomepage = new HomePage(driver);
    pageRegister = new RegisterPage(driver);
    pageLogin = new LoginPage(driver);
});


    after(async function(){
        await driver.quit();
    })

    beforeEach (function(){                   //pokrece se pre svakog testa

    });

    afterEach (function(){                    // pokrece se nakon svakog testa

    });

    it("Verify homepage is open", async function() {
      await pageHomepage.goToPage();
      const pageTitle = await pageHomepage.getPageHeaderTitle();
      expect(pageTitle).to.contain("(QA) Shop");
      expect(await pageHomepage.isBugListDivDisplayed()).to.be.true;
     
  });

    it("Goes to registration page", async function() {
       await pageHomepage.clickOnRegisterLink();
       expect (await pageRegister.getRegisterButtonValue()).to.contain('Register');
       
    });

    it('Succssefuly performs registration', async function() {
        await pageRegister.getInputFirstName().sendKeys('Bob');

       /* const inputFirstname = await pageRegister.getInputFirstName(); //ekvivalent reda iznad
        await inputFirstname.sendKeys('Bob');
        */

        await pageRegister.getInputLastName().sendKeys('Buttons');
        await pageRegister.getInputEmail().sendKeys('bob.buttons@example.local');
         await pageRegister.getInputUsername().sendKeys('bob.buttons');
         await pageRegister.getInputPassword().sendKeys('nekaLozinka123');
        // await pageRegister.getInputPasswordConfirmation().sendKeys('nekaLozinka123');
         await pageRegister.getInputPasswordConfirmation().sendKeys('nekaLozinka123');

         await pageRegister.getRegisterButton().click();

        expect (await pageHomepage.getSuccessAlertText()).to.contain('Uspeh!');

        });

        it('Goes to login page', async function() {
           // await pageHomepage.clickOnLoginlink();
          await pageLogin.goToPage();

          await pageLogin.getInputUsername().sendKeys('aaa');
          await pageLogin.getInputPassword().sendKeys('aaa');
          await pageLogin.clickOnLoginButton();
         

            expect( await pageHomepage.getWelcomeBackTitle()).to.contain('Welcome back,');
            expect( await pageHomepage.isLogoutLinkDisplayed()).to.be.true;
        });

        it('Adds item to carts - Starter, 2 items', async function(){
            const packageToAdd = 'starter';
            const packageQuantity = '2';

            const packageDiv = await pageHomepage.getPackageDiv(packageToAdd);
            const quantity = await pageHomepage.getQuantityDropdown(packageDiv);
            const options = await pageHomepage.getQuantityOptions(quantity);
            console.log(options);
            

            await Promise.all(options.map(async function(option) {
                const text = await option.getText();
                if (text === packageQuantity) {
                    await option.click();
    
                    const selectedValue = await quantity.getAttribute('value');
                    expect(selectedValue).to.contain(packageQuantity);
    
                    const buttonOrder = await pageHomepage.getOrderButton(packageDiv);
                    await buttonOrder.click();
    
                    expect(await driver.getCurrentUrl()).to.contain('http://shop.qa.rs/order');
                    
                }
               
            }));
        });
})