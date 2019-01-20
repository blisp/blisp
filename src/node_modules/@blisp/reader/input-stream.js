class InputStream {
  constructor(input) {
    this.pos = 0
    this.input = input
    this.line = 1
    this.column = 0
  }

  get position() {
    return { line: this.line, column: this.column }
  }

  peekChar() {
    return this.input.charAt(this.pos)
  }

  readChar() {
    const char = this.input.charAt(this.pos++)
    if (char === "\n") {
      this.line++
      this.column = 0
    } else {
      this.column++
    }
    return char
  }

  eof() {
    return this.pos === this.input.length
  }

  toString() {
    return `#InputStream { pos: ${this.pos}, input: "${this.input}"}`
  }
}

module.exports = InputStream
