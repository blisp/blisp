const peekChar = require("./peek-char")
const readChar = require("./read-char")
const isWhitespace = require("./is-whitespace")

module.exports = function readSymbol(stream, char, value) {
  let symbolString = value || ""
  while (!isWhitespace(char) && !stream.eof()) {
    const reader = this.readTable[char]
    if (reader) {
      return reader.call(this, stream, char, symbolString)
    }
    symbolString += readChar(stream)
    char = peekChar(stream)
  }
  switch (symbolString) {
    case "true":
      return true
    case "false":
      return false
    case "NaN":
      return NaN
  }
  return Symbol(symbolString)
}
