const readChar = require("../read-char")

module.exports = function readEscapeCharacter(stream) {
  return "\\" + readChar(stream)
}
