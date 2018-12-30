const inRange = require("./in-range")
const { ZERO, NINE } = require("./number-codes")

module.exports = function isDecimalDigit(stream) {
  return inRange(stream, ZERO, NINE)
}
