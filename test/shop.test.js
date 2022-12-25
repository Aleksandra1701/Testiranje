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
const CartPage = require("../pages/cart.page");
const CheckoutPage = require("../pages/checkout.page");
const HistoryPage = require("../pages/history.page");

describe.only ("shop.QA.rs tests", function() {
let driver;
let pageHomepage;
let pageRegister;
let pageLogin;
let pageCart;
let pageCheckout;
let pageHistory;

const packageToAdd = 'starter';
const packageQuantity = '2';
 
before(function() {
    driver = new webdriver.Builder().forBrowser("chrome").build(); 
    pageHomepage = new HomePage(driver);
    pageRegister = new RegisterPage(driver);
    pageLogin = new LoginPage(driver);
    pageCart = new CartPage(driver);
    pageCheckout = new CheckoutPage(driver);
    pageHistory = new HistoryPage(driver);
    

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

        it('Opens shopping carts', async function(){
            await pageHomepage.clickOnViewShoppingCartLink();

            expect( await driver.getCurrentUrl()).to.contain('http://shop.qa.rs/cart')
            expect (await pageCart.getPageHeaderTitle()).to.contain('Order');
        })

        it('Verifies items are in cart - Starter 2 items', async function(){
            const orderRow = await pageCart.getOrderRow(packageToAdd.toUpperCase());
            const ItemQuantity = await pageCart.getItemQuantity(orderRow);

            expect(await ItemQuantity.getText()).to.eq(packageQuantity);
        });
        it("Verifies total item price is correct", async function(){
            const orderRow = await pageCart.getOrderRow(packageToAdd.toUpperCase());
            const itemQuantity = await pageCart.getItemQuantity(orderRow);
            const itemPrice = await pageCart.getItemPrice(orderRow);
            const itemPriceTotal = await pageCart.getItemPriceTotal(orderRow);

            const qntty = Number(await itemQuantity.getText());
            const price = Number((await itemPrice.getText()).substring(1));
            const total = Number((await itemPriceTotal.getText()).substring(1));

                //Zamena ne-brojcanih karaktera koriscenjem Regex
            const price2 =Number((await itemPrice.getText()).replace(/\D/g,''));
            const total2 = Number((await itemPriceTotal.getText()).replace(/\D/g,''));

            const price3 =Number((await itemPrice.getText()).replace('$',''));
            const total3 = Number((await itemPriceTotal.getText()).replace('$',''));
        
            const calculatedItemPriceTotal = qntty * price;
            const calculatedItemPriceTotal2 = qntty * price2;
            const calculatedItemPriceTotal3 = qntty * price3;

            expect(calculatedItemPriceTotal).to.be.eq(total); 
            expect(calculatedItemPriceTotal2).to.be.eq(total2);
            expect(calculatedItemPriceTotal3).to.be.eq(total3);
             
        })


        it("Performs checkout", async function() {
            await pageCart.clickOnCheckoutButton();
    
            expect(await pageCheckout.getCheckoutSuccessTitle()).to.contain('(Order #');
        });
        it("Verifies checkout success", async function() {
            const orderNumber = await pageCheckout.getCheckoutOrderNumber();
    
            await pageCheckout.clickOnGetOrderHistoryLink();
    
            expect(await pageHistory.getPageHeaderTitle()).to.contain('Order History');

            const historyRow = await pageHistory.getHistoryRow(orderNumber);
            const historyStatus =await pageHistory.getHistoryStatus(historyRow).getText(); 
            expect(historyStatus).to.be.eq('Ordered'); 
            
        });
        

}); 
