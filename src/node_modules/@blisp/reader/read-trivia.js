const isWhitespace = require("./is-whitespace")
const peekChar = require("./peek-char")
const readChar = require("./read-char")

module.exports = function readTrivia(stream, char) {
  let trivia = ""
  while (isWhitespace(char) && !stream.eof()) {
    trivia += readChar(stream)
    char = peekChar(stream)
  }
  return trivia
}
