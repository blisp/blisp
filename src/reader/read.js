const peekChar = require("./peek-char")
const readSymbol = require("./read-symbol")
const readTrivia = require("./read-trivia")
const InputStream = require("./input-stream")
const loc = require("./loc")

let readTable

module.exports = function read(stream) {
  const triviaStart = stream.position
  if (!this.readTable) {
    this.readTable = require("./read-table")
  }
  if (typeof stream === "string") {
    return read.call(this, new InputStream(stream))
  }
  // const start = stream.pos
  let char = peekChar(stream)
  const trivia = readTrivia(stream, char)
  const formStart = stream.position
  if (stream.eof()) {
    return undefined
  }
  char = peekChar(stream)
  const reader = this.readTable[char] || readSymbol
  let value = reader.call(this, stream, char)
  if (value && typeof value === "object") {
    Object.defineProperty(value, "meta", {
      enumerable: false,
      value: loc(formStart, stream.position, triviaStart),
    })
  }
  return value
}
