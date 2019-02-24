const inRange = require("./in-range")
const { ZERO, SEVEN } = require("./number-codes")

module.exports = function isOctalDigit(stream) {
  return inRange(stream, ZERO, SEVEN)
}
