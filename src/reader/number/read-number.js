const peekChar = require("../peek-char")
const readChar = require("../read-char")
const numberReadTable = require("./number-read-table")
const isBinaryDigit = require("./is-binary-digit")
const isOctalDigit = require("./is-octal-digit")
const isDecimalDigit = require("./is-decimal-digit")
const isHexDigit = require("./is-hex-digit")

function readDigits(test) {
  return (stream, char, number) => {
    reader = this.readTable[char]
    while (reader || test(stream)) {
      number = reader
        ? reader.call(this, stream, char, number)
        : number + readChar(stream)
      reader = this.readTable[peekChar(stream)]
    }
    return number
  }
}

module.exports = function readNumber(stream, char, value) {
  const readTable = this.readTable
  this.readTable = numberReadTable
  let number = value || ""
  let test = isDecimalDigit
  if (char === "0") {
    number += readChar(stream)
    char = peekChar(stream)
    switch (peekChar(stream)) {
      case "b":
      case "B":
        test = isBinaryDigit
        number += readChar(stream)
        char = peekChar(stream)
        break

      case "o":
      case "O":
        test = isOctalDigit
        number += readChar(stream)
        char = peekChar(stream)
        break

      case "x":
      case "X":
        test = isHexDigit
        number += readChar(stream)
        char = peekChar(stream)
        break
    }
    if (test === isDecimalDigit && isDecimalDigit(stream)) {
      this.readTable = readTable
      throw new Error(`Invalid input expected '.' got '${char}'`)
    }
  }

  number = readDigits(test).call(this, stream, char, number)

  if (test === isDecimalDigit) {
    char = peekChar(stream)
    if (char === ".") {
      number += readChar(stream)
      char = peekChar(stream)
      number = readDigits(test).call(this, stream, char, number)
      char = peekChar(stream)
    }
    if (char === "e" || char === "E") {
      number += readChar(stream)
      char = peekChar(stream)
      if (char === "-" || char === "+") {
        number += readChar(stream)
        char = peekChar(stream)
      }
      number = readDigits(test).call(this, stream, char, number)
    }
  }
  char = peekChar(stream)
  // Fixes list reading in the case of (1)
  // if (!(stream.eof() || isWhitespace(char))) {
  //   throw new Error(`Unexpected input ${char}`)
  // }
  this.readTable = readTable
  return Number(number)
}
