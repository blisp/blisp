const { stringLiteral } = require("@babel/types")
const stringReadTable = require("./string-read-table")
const peekChar = require("../peek-char")
const readChar = require("../read-char")
module.exports = function readString(stream, char, value) {
  if (char !== '"') {
    // throw error
  }
  readChar(stream)
  char = peekChar(stream)
  let stringContent = value || ""
  while (char !== '"' && !stream.eof()) {
    const reader = stringReadTable[char]
    if (reader) {
      stringContent = reader(stream, char, stringContent)
    } else {
      stringContent += readChar(stream)
    }
    char = peekChar(stream)
  }
  if (char !== '"') {
    // throw error
  }
  readChar(stream)
  return stringContent
}
