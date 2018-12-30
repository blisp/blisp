const { expect } = require("chai")
const InputStream = require("@blisp/reader/input-stream")

describeModule("@blisp/reader/string/read-string", (readString) => {
  describeCall(readString, new InputStream('"foo"'), (readString, stream) => {
    it('reads "foo"', () => {
      expect(readString(stream, '"')).to.eql("foo")
    })
  })
  describe("escape sequences", () => {
    describe("single character", () => {
      describeReadInput(readString, '"0\\""', (stream) => {
        itReadsTheString(stream.input, (n) => {
          expect(readString(stream, stream.peekChar())).to.eql(n)
        })
      })
      describeReadInput(readString, '"0\\\\"', (stream) => {
        itReadsTheString(stream.input, (n) => {
          expect(readString(stream, stream.peekChar())).to.eql(n)
        })
      })
      describeReadInput(readString, '"0\\b"', (stream) => {
        itReadsTheString(stream.input, (n) => {
          expect(readString(stream, stream.peekChar())).to.eql(n)
        })
      })
      describeReadInput(readString, '"0\\f"', (stream) => {
        itReadsTheString(stream.input, (n) => {
          expect(readString(stream, stream.peekChar())).to.eql(n)
        })
      })
      describeReadInput(readString, '"0\\n"', (stream) => {
        itReadsTheString(stream.input, (n) => {
          expect(readString(stream, stream.peekChar())).to.eql(n)
        })
      })
      describeReadInput(readString, '"0\\r"', (stream) => {
        itReadsTheString(stream.input, (n) => {
          expect(readString(stream, stream.peekChar())).to.eql(n)
        })
      })
      describeReadInput(readString, '"0\\t"', (stream) => {
        itReadsTheString(stream.input, (n) => {
          expect(readString(stream, stream.peekChar())).to.eql(n)
        })
      })
      describeReadInput(readString, '"0\\v"', (stream) => {
        itReadsTheString(stream.input, (n) => {
          expect(readString(stream, stream.peekChar())).to.eql(n)
        })
      })
    })
    describe("octal digit code", () => {
      describeReadInput(readString, '"0\\04a"', (stream) => {
        it('reads the string "0\u0004a"', () => {
          expect(readString(stream, stream.peekChar())).to.eql("0\u0004a")
        })
      })
      describeReadInput(readString, '"0\\040"', (stream) => {
        it('reads the string "0 "', () => {
          expect(readString(stream, stream.peekChar())).to.eql("0 ")
        })
      })
    })
    describe("hex digit code", () => {
      describeReadInput(readString, '"0\\x40"', (stream) => {
        it('reads the string "0@"', () => {
          expect(readString(stream, stream.peekChar())).to.eql("0@")
        })
      })
    })
    describe("unicode codepoint", () => {
      describeReadInput(readString, '"0\\u0040"', (stream) => {
        it('reads the string "0@"', () => {
          expect(readString(stream, stream.peekChar())).to.eql("0@")
        })
      })
    })
  })
})
