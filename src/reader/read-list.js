const { callExpression, nullLiteral } = require("@babel/types")
const peekChar = require("./peek-char")
const readChar = require("./read-char")
const read = require("./read")

module.exports = function readList(stream, char) {
  if (char !== "(") {
    // throw error
    return undefined
  }
  char = readChar(stream)
  char = peekChar(stream)
  const args = []
  while (char !== ")" && !stream.eof()) {
    args.push(read(stream))
    char = peekChar(stream)
  }
  if (char !== ")") {
    throw new Error("Unterminated call expression")
    // throw error
  }
  readChar(stream)
  return args
}
