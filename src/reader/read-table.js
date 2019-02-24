const readList = require("./read-list")
const readString = require("./string/read-string")
const readNumber = require("./number/read-number")
const readSymbol = require("./read-symbol")

module.exports = {
  "(": readList,
  '"': readString,
  "0": readNumber,
  "1": readNumber,
  "2": readNumber,
  "3": readNumber,
  "4": readNumber,
  "5": readNumber,
  "6": readNumber,
  "7": readNumber,
  "8": readNumber,
  "9": readNumber,
  ".": (stream, char, value) => {
    stream.readChar()
    const next = stream.peekChar()
    return "0" <= next && next <= "9"
      ? readNumber(stream, next, char)
      : readSymbol(stream, next, char)
  },
}
