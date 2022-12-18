`use strict`;

const { By, Key, until } = require("selenium-webdriver");
module.exports = class RegisterPage {
    #driver;

    constructor(webdriver) {
        this.#driver = webdriver;
    }

      getRegisterButtonValue(){

                    return this.getRegisterButton ().getAttribute('value');
        }

        getRegisterButton () {
            return this.#driver.findElement(By.name('register'))
        }
            getInputFirstName(){
                return this.#driver.findElement(By.name('ime'));
            }

            getInputLastName(){
                return this.#driver.findElement(By.name('prezime'));
            }

            getInputEmail(){
                return this.#driver.findElement(By.name('email'));
            }

            getInputUsername(){
                return this.#driver.findElement(By.name('korisnicko'));
            }

            getInputPassword(){
                return this.#driver.findElement(By.name('lozinka'));
            }

            getInputPasswordConfirmation(){
                return this.#driver.findElement(By.name('lozinkaOpet'));
            }
       
       
}