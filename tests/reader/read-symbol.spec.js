const InputStream = require("@blisp/reader/input-stream")
const { expect } = require("chai")

describeModule("@blisp/reader/read-symbol", (readSymbol) => {
  describeCall(readSymbol, new InputStream("foo"), (readSymbol, stream) => {
    it('read the symbol "foo"', () => {
      expect(readSymbol(stream, stream.peekChar()).toString()).to.eql(
        Symbol("foo").toString()
      )
    })
  })

  describeCall(readSymbol, new InputStream("foo a"), (readSymbol, stream) => {
    it('read the symbol "foo"', () => {
      expect(readSymbol(stream, stream.peekChar()).toString()).to.eql(
        Symbol("foo").toString()
      )
    })
  })
})
