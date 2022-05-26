function ConvertHandler() {
  
  this.getNum = (input) => {
    if(input.match(/[\/]\d*[\/]|[\/]\d*[\.]\d*[\/]/)) return 'invalid number' 
    const num = input.split(/[a-z]/i)[0]
    if(num === '') return 1
    return eval(num)
  }
  
  this.getUnit = (input) => {    
    const split = input.split(/\d|[\.\/]/)
    const unit = split[split.length-1]
    if(!isUnit(unit.toLowerCase())) return 'invalid unit'
    return ((unit === 'L' || unit === 'l')? 'L' : unit.toLowerCase())
  }
  
  this.getReturnUnit = (initUnit) => {
    switch (initUnit) {
      case 'L':
        return 'gal'
      case 'gal':
        return 'L'
      case 'kg':
        return 'lbs'
      case 'lbs':
        return 'kg'
      case 'km':
        return 'mi'
      case 'mi':
        return 'km'
      default:
        return
    }    
  }

  this.spellOutUnit = (unit) => {
    switch (unit) {
      case 'L':
        return 'litres'
      case 'gal':
        return 'gallons'
      case 'kg':
        return 'kilograms'
      case 'lbs':
        return 'pounds'
      case 'km':
        return 'kilometers'
      case 'mi':
        return 'miles'
      default:
        return
    }    
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    switch (initUnit) {
      case 'L':
        return parseFloat(initNum / galToL).toFixed(5)
      case 'gal':
        return parseFloat(initNum * galToL).toFixed(5)
      case 'kg':
        return parseFloat(initNum / lbsToKg).toFixed(5)
      case 'lbs':
        return parseFloat(initNum * lbsToKg).toFixed(5)
      case 'km':
        return parseFloat(initNum / miToKm).toFixed(5)
      case 'mi':
        return parseFloat(initNum * miToKm).toFixed(5)
      default:
        return
    }
  };
  
  this.getString = (initNum, initUnit, returnNum, returnUnit) => `${initNum} ${initUnit} converts to ${returnNum} ${returnUnit}`
  
}

const isUnit = (unit) => (unit === 'l' || unit === 'km' || unit === 'kg' || unit === 'lbs' || unit === 'gal' || unit === 'mi')

module.exports = ConvertHandler;
