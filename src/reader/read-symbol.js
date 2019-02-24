const peekChar = require("./peek-char")
const readChar = require("./read-char")
const readSymbolTable = require("./read-symbol-table")
const isWhitespace = require("./is-whitespace")
const { identifier } = require("@babel/types")

module.exports = function readSymbol(stream, char, value) {
  let symbolString = value || ""
  while (!isWhitespace(char) && !stream.eof()) {
    const reader = readSymbolTable[char]
    if (reader) {
      return reader(stream, char, symbolString)
    }
    symbolString += readChar(stream)
    char = peekChar(stream)
  }
  return Symbol.for(symbolString)
}
