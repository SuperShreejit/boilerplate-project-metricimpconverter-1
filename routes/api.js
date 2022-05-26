'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function(app) {

  const convertHandler = new ConvertHandler();

  const getValues = (input) => {
    const initNum = convertHandler.getNum(input)
    const initUnit = convertHandler.getUnit(input)

    if( initNum === 'invalid number' && initUnit === 'invalid unit') 
      return ('invalid number and unit')
    else if(initNum === 'invalid number') return (initNum)
    else if (initUnit === 'invalid unit') return (initUnit)
    
    const returnNum = parseFloat(convertHandler.convert(initNum, initUnit))
    const returnUnit = convertHandler.getReturnUnit(initUnit)
    const initUnitString = convertHandler.spellOutUnit(initUnit)
    const returnUnitString = convertHandler.spellOutUnit(returnUnit)
    const string = convertHandler.getString(initNum, initUnitString, returnNum, returnUnitString)
    
    return { initNum, initUnit, returnNum, returnUnit, string }
  }

  app.route('/api/convert').get((req, res) => {
    const input = req.query.input
    const values = getValues(input)
    if(typeof values === 'string') return res.send(values)
    res.json(values)
  })

};
