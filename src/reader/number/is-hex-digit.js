const inRange = require("./in-range")
const isDecimalDigit = require("./is-decimal-digit")
const { A, F, a, f } = require("./number-codes")

module.exports = function isHexDigit(stream) {
  return (
    isDecimalDigit(stream) || inRange(stream, A, F) || inRange(stream, a, f)
  )
}
