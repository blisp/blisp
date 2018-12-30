const peekCharCode = require("../peek-char-code")

module.exports = function inRange(stream, start, stop) {
  const charCode = peekCharCode(stream)
  return start <= charCode && charCode <= stop
}
