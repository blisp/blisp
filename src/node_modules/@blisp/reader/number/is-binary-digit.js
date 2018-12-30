const inRange = require("./in-range")
const { ZERO, ONE } = require("./number-codes")

module.exports = function isBinaryDigit(stream) {
  return inRange(stream, ZERO, ONE)
}
