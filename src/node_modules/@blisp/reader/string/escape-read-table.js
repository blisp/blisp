const peekChar = require("../peek-char")
const isHexDigit = require("../number/is-hex-digit")
const readEscapeCharacter = require("./read-escape-character")
const readChar = require("../read-char")

module.exports = {
  '"': readEscapeCharacter,
  "\\": readEscapeCharacter,
  b: readEscapeCharacter,
  f: readEscapeCharacter,
  n: readEscapeCharacter,
  r: readEscapeCharacter,
  t: readEscapeCharacter,
  v: readEscapeCharacter,
  x: (stream) => {
    readChar(stream)
    let char = peekChar(stream)
    let code = ""
    for (let i = 0; i !== 2; i++) {
      if (!isHexDigit(stream)) {
        throw new Error(`Unexpected input expected hexidecimal but got ${char}`)
      }
      code += readChar(stream)
      char = peekChar(stream)
    }
    return String.fromCodePoint(parseInt(code, 16))
  },
  u: (stream) => {
    readChar(stream)
    let char = peekChar(stream)
    let code = ""
    // TODO: Do we need to handle code point sequences?
    for (let i = 0; i !== 4; i++) {
      if (!isHexDigit(stream)) {
        throw new Error(`Unexpected input expected hexidecimal but got ${char}`)
      }
      code += readChar(stream)
      char = peekChar(stream)
    }
    return String.fromCodePoint(parseInt(code, 16))
  },
}
