const methodPrefix = 'test'
class COKE_UI {
  constructor() {
    this._year = 2017
    this.edition = 1
  }
  [methodPrefix + 'A']() {
    // console.log('getFunc', methodPrefix + 'A')
  }
  get year() {
    return this._year
  }
  set year(newVal) {
    if (newVal > 2017) {
      this._year = newVal
      this.edition += newVal - 2017
    }
  }
}

const testClass = new COKE_UI()

console.log(testClass.year)
testClass.year = 2018
console.log(testClass.edition)