const assert = require("assert")
const InputStream = require("@blisp/reader/input-stream")
describeModule("@blisp/reader/read-symbol", (readSymbol) => {
  describeCall(readSymbol, new InputStream("foo"), (readSymbol, stream) => {
    it('read the symbol "foo"', () => {
      assert.equal(readSymbol(stream, stream.peekChar()), Symbol.for("foo"))
    })
  })

  describeCall(readSymbol, new InputStream("foo a"), (readSymbol, stream) => {
    it('read the symbol "foo"', () => {
      assert.equal(readSymbol(stream, stream.peekChar()), Symbol.for("foo"))
    })
  })
})
