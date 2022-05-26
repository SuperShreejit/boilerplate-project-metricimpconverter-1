const chai = require('chai');
const assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');
const convertHandler = new ConvertHandler();

suite('Unit Tests', function() {

  test("convertHandler should correctly read a whole number input",
    () => {
      const num = convertHandler.getNum('20km')
      assert.isNumber(num, "returns the whole number from the string")
      assert.isTrue(Number.isInteger(num), "all integers are whole numbers")
      assert.isNotString(num, "doesn't return the string invalid number")
    })

  test("convertHandler should correctly read a decimal number input.",
    () => {
      const num = convertHandler.getNum('2.5lbs')
      assert.isNumber(num, "returns the decimal number from the string")
      assert.isFalse(Number.isInteger(num), "decimal is not integer: gets false")
      assert.isNotString(num, "doesn't return the string invalid number")
    })

  test("convertHandler should correctly read a fractional input.",
    () => {
      const num = convertHandler.getNum('2/5kg')
      assert.isNumber(num, "returns the evaluated fraction as a decimal number from the string")
      assert.isFalse(Number.isInteger(num), "decimal is not integer: gets false")
      assert.isNotString(num, "doesn't return the string invalid number")
    })

  test("convertHandler should correctly read a fractional input with a decimal.",
    () => {
      const num = convertHandler.getNum('2/2.5L')
      assert.isNumber(num, "returns the evaluated fractional decimal as a decimal number from the string")
      assert.isFalse(Number.isInteger(num), "decimal is not integer: gets false")
      assert.isNotString(num, "doesn't return the string invalid number")
    })

  test("convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3).",
    () => {
      const num = convertHandler.getNum('3/2/3L')
      assert.isNotNumber(num, "doesn't return a number")
      assert.isString(num, "returns a string")
      assert.equal(num, "invalid number", "the string is 'invalid number'")
    })

  test("convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.",
    () => {
      const num = convertHandler.getNum('gal')
      assert.isNumber(num, "returns a number")
      assert.isNotString(num, "doesn't returns a string")
      assert.strictEqual(num, 1, "returns 1 as a number")
    })

  test("convertHandler should correctly read each valid input unit.",
    () => {
      const units = ["10.5Km", "10/25mi", "1.2lbs", "10/15.5KG", "gal", "100L"]
      units.forEach(unit => {
        const value = convertHandler.getUnit(unit)
        const split = unit.split(/\d|[\.\/]/)
        const legitimateUnit = split[split.length - 1]
        const legitimateUnitCase = (legitimateUnit === 'l' || legitimateUnit === 'L') ? 'L' : legitimateUnit.toLowerCase()

        assert.isString(value, 'returns the unit string')
        assert.equal(value, legitimateUnitCase, 'checks for valid case')
      })
    })

  test("convertHandler should correctly return an error for an invalid input unit.",
    () => {
      const errorUnits = ["10k", "4litre", "50miles", "abc", "12"]
      errorUnits.forEach(error => {
        const value = convertHandler.getUnit(error)
        assert.isString(value, 'Returns an error string')
        assert.equal(value, 'invalid unit', "The string returned is 'invalid unit'")
      })
    })

  const units = ["km", "mi", "lbs", "kg", "gal", "L"]

  test("convertHandler should return the correct return unit for each valid input unit.",
    () => {      
      const convertedUnits = ["mi", "km", "kg", "lbs", "L", "gal"]

      units.forEach((unit, i) => {
        const value = convertHandler.getReturnUnit(unit)
        assert.isString(value, 'Returns a string')
        assert.equal(value, convertedUnits[i], "Matches the converted equivalent")
      })
    })

  test("convertHandler should correctly return the spelled-out string unit for each valid input unit.",
    () => {
      const spelledUnits = ["kilometers", "miles", "pounds", "kilograms", "gallons", "litres"]

      units.forEach((unit, i) => {
        const value = convertHandler.spellOutUnit(unit)
        assert.isString(value, "Returns a string")
        assert.equal(value, spelledUnits[i], "Matches the spelled out equivalent")
      })
    })

  const initNums = [5, 100, 5.5, 2 / 3, 4 / 6.5]
  const galToL = 3.78541;
  const lbsToKg = 0.453592;
  const miToKm = 1.60934;

  test("convertHandler should correctly convert gal to L.",
    () => {
      initNums.forEach(initNum => {
        const value = parseFloat(convertHandler.convert(initNum, "gal"))
        const converted = parseFloat((initNum * galToL).toFixed(5))
        assert.isNumber(value, "returns a number")
        assert.strictEqual(value, converted, "A correct conversion")
      })
    })

  test("convertHandler should correctly convert L to gal.",
    () => {
      initNums.forEach(initNum => {
        const value = parseFloat(convertHandler.convert(initNum, "L"))
        const converted = parseFloat((initNum / galToL).toFixed(5))
        assert.isNumber(value, "returns a number")
        assert.strictEqual(value, converted, "A correct conversion")
      })
    })

  test("convertHandler should correctly convert mi to km.",
    () => {
      initNums.forEach(initNum => {
        const value = parseFloat(convertHandler.convert(initNum, "mi"))
        const converted = parseFloat((initNum * miToKm).toFixed(5))
        assert.isNumber(value, "returns a number")
        assert.strictEqual(value, converted, "A correct conversion")
      })
    })

  test("convertHandler should correctly convert km to mi.",
    () => {
      initNums.forEach(initNum => {
        const value = parseFloat(convertHandler.convert(initNum, "km"))
        const converted = parseFloat((initNum / miToKm).toFixed(5))
        assert.isNumber(value, "returns a number")
        assert.strictEqual(value, converted, "A correct conversion")
      })
    })

  test("convertHandler should correctly convert lbs to kg.",
    () => {
      initNums.forEach(initNum => {
        const value = parseFloat(convertHandler.convert(initNum, "lbs"))
        const converted = parseFloat((initNum * lbsToKg).toFixed(5))
        assert.isNumber(value, "returns a number")
        assert.strictEqual(value, converted, "A correct conversion")
      })
    })

  test("convertHandler should correctly convert kg to lbs.",
    () => {
      initNums.forEach(initNum => {
        const value = parseFloat(convertHandler.convert(initNum, "kg"))
        const converted = parseFloat((initNum / lbsToKg).toFixed(5))
        assert.isNumber(value, "returns a number")
        assert.strictEqual(value, converted, "A correct conversion")
      })
    })

});