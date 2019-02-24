const peekChar = require("./peek-char")
const readSymbol = require("./read-symbol")
const readTrivia = require("./read-trivia")
const syntax = require("./syntax")
const InputStream = require("./input-stream")
const utils = require("@babel/types/lib/definitions/utils")
const defineType = utils.default
const assertValueType = utils.assertValueType
const loc = require("./loc")

// TODO: Is there a better place to load this?
defineType("SymbolLiteral", {
  builder: ["name"],

  aliases: ["Expression", "PatternLike", "LVal", "TSEntityName"],

  fields: {
    name: {
      validate: assertValueType("string"),
    },

    optional: {
      validate: assertValueType("boolean"),

      optional: true,
    },
  },
})

let readTable

module.exports = function read(stream) {
  const triviaStart = stream.position
  // TODO: How to load initial read table
  if (!readTable) {
    readTable = require("./read-table")
  }
  if (typeof stream === "string") {
    return read(new InputStream(stream))
  }
  // const start = stream.pos
  let char = peekChar(stream)
  const trivia = readTrivia(stream, char)
  const formStart = stream.position
  if (stream.eof()) {
    return undefined
  }
  char = peekChar(stream)
  const reader = readTable[char] || readSymbol
  let value = reader(stream, char)
  if (typeof value === "symbol") {
    switch (Symbol.keyFor(value)) {
      case "true":
        value = true
        break
      case "false":
        value = false
        break
      case "NaN":
        value = NaN
        break
    }
  }
  return Object.assign(
    value,
    Object.defineProperty({}, "meta", {
      writable: false,
      enumerable: false,
      value: loc(formStart, stream.position, triviaStart),
    })
  )
}
