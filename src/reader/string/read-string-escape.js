const peekChar = require("../peek-char")
const readChar = require("../read-char")
const readTable = require("./escape-read-table")
const isOctalDigit = require("../number/is-decimal-digit")
module.exports = function readStringEscape(stream, char, value) {
  readChar(stream)
  char = peekChar(stream)
  const reader = readTable[char]
  if (reader) {
    return value + reader(stream, char, "")
  }
  if (isOctalDigit(stream)) {
    let octalCode = ""
    for (let i = 0; i !== 3; i++) {
      if (!isOctalDigit(stream)) {
        break
      }
      octalCode += readChar(stream)
      char = peekChar(stream)
    }
    // TODO: Validate decimal code
    return (value += String.fromCharCode(parseInt(octalCode, 8)))
  }
  return value
}
