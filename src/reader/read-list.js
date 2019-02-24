const { callExpression, nullLiteral } = require("@babel/types")
const peekChar = require("./peek-char")
const readChar = require("./read-char")
const readSymbol = require("./read-symbol")
const read = require("./read")

const emptyStream = {
  eof() {
    return true
  },
}

function terminate(_, char, value) {
  return readSymbol.call(this, emptyStream, char, value)
}

module.exports = function readList(stream, char) {
  const readTable = this.readTable
  if (this.readTable[")"] !== terminate) {
    this.readTable = { ...readTable, ")": terminate }
  }
  if (char !== "(") {
    // throw error
    return undefined
  }
  char = readChar(stream)
  char = peekChar(stream)
  const args = []
  while (char !== ")" && !stream.eof()) {
    args.push(read.call(this, stream))
    char = peekChar(stream)
  }
  if (char !== ")") {
    this.readTable = readTable
    throw new Error("Unterminated call expression")
    // throw error
  }
  readChar(stream)
  this.readTable = readTable
  return args
}
