const assert = require("assert")
const InputStream = require("@blisp/reader/input-stream")
const syntax = require("@blisp/reader/syntax")
const { expect } = require("chai")

describeModule("@blisp/reader/read-list", (readList) => {
  describeCall(readList, new InputStream("(foo bar)"), (readList, stream) => {
    it("reads (foo bar)", () => {
      assert.deepEqual(readList(stream, stream.peekChar()), [
        syntax(Symbol.for("foo")),
        syntax(Symbol.for("bar")),
      ])
    })
  })
  describeCall(
    readList,
    new InputStream("(foo (bar baz))"),
    (readList, stream) => {
      it("reads (foo (bar baz))", () => {
        expect(readList(stream, stream.peekChar())).to.eql([
          syntax(Symbol.for("foo")),
          syntax([syntax(Symbol.for("bar")), syntax(Symbol.for("baz"))]),
        ])
      })
    }
  )
})
