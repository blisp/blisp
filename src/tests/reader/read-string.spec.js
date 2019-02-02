const { expect } = require("chai")
const InputStream = require("@blisp/reader/input-stream")

describeModule("@blisp/reader/string/read-string", (readString) => {
  describeCall(readString, new InputStream('"foo"'), (readString, stream) => {
    itReadsTheString(stream.input, (s) => {
      expect(readString(stream, '"')).to.eql(s)
    })
  })
  describe("escape sequences", () => {
    describe("single character", () => {
      describeReadInput(readString, '"0\\""', (stream) => {
        itReadsTheString(stream.input, (s) => {
          expect(readString(stream, stream.peekChar())).to.eql(s)
        })
      })
      describeReadInput(readString, '"0\\\\"', (stream) => {
        itReadsTheString(stream.input, (s) => {
          expect(readString(stream, stream.peekChar())).to.eql(s)
        })
      })
      describeReadInput(readString, '"0\\b"', (stream) => {
        itReadsTheString(stream.input, (s) => {
          expect(readString(stream, stream.peekChar())).to.eql(s)
        })
      })
      describeReadInput(readString, '"0\\f"', (stream) => {
        itReadsTheString(stream.input, (s) => {
          expect(readString(stream, stream.peekChar())).to.eql(s)
        })
      })
      describeReadInput(readString, '"0\\n"', (stream) => {
        itReadsTheString(stream.input, (s) => {
          expect(readString(stream, stream.peekChar())).to.eql(s)
        })
      })
      describeReadInput(readString, '"0\\r"', (stream) => {
        itReadsTheString(stream.input, (s) => {
          expect(readString(stream, stream.peekChar())).to.eql(s)
        })
      })
      describeReadInput(readString, '"0\\t"', (stream) => {
        itReadsTheString(stream.input, (s) => {
          expect(readString(stream, stream.peekChar())).to.eql(s)
        })
      })
      describeReadInput(readString, '"0\\v"', (stream) => {
        itReadsTheString(stream.input, (s) => {
          expect(readString(stream, stream.peekChar())).to.eql(s)
        })
      })
    })
    describe("octal digit code", () => {
      describeReadInput(readString, '"0\\04a"', (stream) => {
        itReadsTheString('"0\u0004a"', (s) => {
          expect(readString(stream, stream.peekChar())).to.eql(s)
        })
      })
      describeReadInput(readString, '"0\\040"', (stream) => {
        itReadsTheString('"0 "', (s) => {
          expect(readString(stream, stream.peekChar())).to.eql(s)
        })
      })
    })
    describe("hex digit code", () => {
      describeReadInput(readString, '"0\\x40"', (stream) => {
        itReadsTheString('"0@"', (s) => {
          expect(readString(stream, stream.peekChar())).to.eql(s)
        })
      })
    })
    describe("unicode codepoint", () => {
      describeReadInput(readString, '"0\\u0040"', (stream) => {
        itReadsTheString('"0@"', (s) => {
          expect(readString(stream, stream.peekChar())).to.eql(s)
        })
      })
    })
  })
})
