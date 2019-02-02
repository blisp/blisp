const { identifier } = require("@babel/types")
const InputStream = require("@blisp/reader/input-stream")
const { expect } = require("chai")
describeModule("@blisp/reader/read-symbol", (readSymbol) => {
  describeCall(readSymbol, new InputStream("foo"), (readSymbol, stream) => {
    it('read the symbol "foo"', () => {
      expect(readSymbol(stream, stream.peekChar())).to.eql(identifier("foo"))
    })
  })

  describeCall(readSymbol, new InputStream("foo a"), (readSymbol, stream) => {
    it('read the symbol "foo"', () => {
      expect(readSymbol(stream, stream.peekChar())).to.eql(identifier("foo"))
    })
  })
})
