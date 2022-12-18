const { equal } = require('assert');          //unit testiranje
const assert = require('assert');
const Math = require('../Math');

describe('Basic math test' , function() {
    it('Test if 1 equal 1', function(){
       assert.equal(1,1);
    });
    it('Test if 2 equal 2', function(){
        assert.equal(2,2);
     });
});

describe('Math test', function() {
   it('Test if 1+1 = 2', function() {
      assert.equal(Math.add(1,1), 2);    //Math.add sabira
   });
   it('Test if 2-1 = 2', function() {
      assert.equal(Math.sub(2,1), 1);   //Math.sub oduzima
   });
});