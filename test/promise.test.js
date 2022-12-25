`use strict`;

const chai = require('chai');
const chaiAsPromised =  require('chai-as-promised');

chai.use (chaiAsPromised);
const expect = chai.expect;

chai.should();

describe("Promise test", function() {
    it('Test a resolved promise', async function() {
        const promise = new Promise (function (resolve, reject) {
            setTimeout(function() {
                resolve(1);
            }, 5000);
        });
        expect(await promise).to.equal(1);
    });

    it("Test a rejected promise", async function() {
        const promise = new Promise (function(resolve, reject){
            setTimeout(function(){
                reject(new Error("Promise rejected"));
            }, 1500)
        });
        await expect(promise).to.eventually.be.rejectedWith('Promise rejected');
    });
})