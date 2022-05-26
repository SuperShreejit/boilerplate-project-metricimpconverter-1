const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {

  test("Convert a valid input such as 10L: GET request to /api/convert.",
    () => {
      const expectedResponse = { "initNum": 10, "initUnit": "L", "returnNum": 2.64172, "returnUnit": "gal", "string": "10 litres converts to 2.64172 gallons" }

      chai.request(server)
        .get('/api/convert?input=10L')
        .end((err, res) => {
          assert.isNull(err)
          assert.equal(res.status, 200)
          assert.isNumber(res.body.initNum, "initNum is a number")
          assert.strictEqual(res.body.initNum, expectedResponse.initNum, "matching Initail number")
          assert.isString(res.body.initUnit, "initUnit is a String")
          assert.strictEqual(res.body.initUnit, expectedResponse.initUnit, "matching initial Unit")
          assert.isNumber(res.body.returnNum, "returnNum is a number")
          assert.strictEqual(res.body.returnNum, expectedResponse.returnNum, "matching return number")
          assert.isString(res.body.returnUnit, "returnUnit is a String")
          assert.strictEqual(res.body.returnUnit, expectedResponse.returnUnit, "matching return unit")
          assert.isString(res.body.string, "string is indeed a string")
          assert.strictEqual(res.body.string, expectedResponse.string, "matching string")
        })
    })

  test("Convert an invalid input such as 32g: GET request to /api/convert.",
    () => {
      chai.request(server)
        .get('/api/convert?input=32g')
        .end((err, res) => {
          assert.isNull(err)
          assert.equal(res.status, 200)
          assert.isString(res.text, "error message is a string")
          assert.equal(res.text, "invalid unit", "The error string is 'invalid unit'")
        })
    })

  test("Convert an invalid number such as 3/7.2/4kg: GET request to /api/convert.",
    () => {
         chai.request(server)
        .get('/api/convert?input=3/7.2/4kg')
        .end((err, res) => {
          assert.isNull(err)
          assert.equal(res.status, 200)
          assert.isString(res.text, "error message is a string")
          assert.equal(res.text, "invalid number", "The error string is 'invalid number'")
        })
    })

  test("Convert an invalid number AND unit such as 3/7.2/4kilomegagram: GET request to /api/convert.",
    () => {
         chai.request(server)
        .get('/api/convert?input=3/7.2/4kilomegagram')
        .end((err, res) => {
          assert.isNull(err)
          assert.equal(res.status, 200)
          assert.isString(res.text, "error message is a string")
          assert.equal(res.text, 'invalid number and unit', "The error string is 'invalid number and unit'")
        })
    })

  test("Convert with no number such as kg: GET request to /api/convert.",
    () => {
      const expectedResponse = { "initNum": 1, "initUnit": "kg", "returnNum": 2.20462, "returnUnit": "lbs", "string": "1 kilograms converts to 2.20462 pounds" }

      chai.request(server)
        .get('/api/convert?input=kg')
        .end((err, res) => {
          assert.isNull(err)
          assert.equal(res.status, 200)
          assert.isNumber(res.body.initNum, "initNum is a number")
          assert.strictEqual(res.body.initNum, expectedResponse.initNum, "matching Initail number")
          assert.isString(res.body.initUnit, "initUnit is a String")
          assert.strictEqual(res.body.initUnit, expectedResponse.initUnit, "matching initial Unit")
          assert.isNumber(res.body.returnNum, "returnNum is a number")
          assert.strictEqual(res.body.returnNum, expectedResponse.returnNum, "matching return number")
          assert.isString(res.body.returnUnit, "returnUnit is a String")
          assert.strictEqual(res.body.returnUnit, expectedResponse.returnUnit, "matching return unit")
          assert.isString(res.body.string, "string is indeed a string")
          assert.strictEqual(res.body.string, expectedResponse.string, "matching string")
        })
    })

});
