const assert = require("assert")
const InputStream = require("@blisp/reader/input-stream")
const syntax = require("@blisp/reader/syntax")
const { expect } = require("chai")

describeModule("@blisp/reader/read-list", (readList) => {
  describeCall(readList, new InputStream("(foo bar)"), (readList, stream) => {
    it("reads (foo bar)", () => {
      assert.deepEqual(readList(stream, stream.peekChar()), [
        syntax(Symbol.for("foo"), loc(1, 1, 4)),
        syntax(Symbol.for("bar"), loc(4, 5, 8)),
      ])
    })
  })
  describeCall(
    readList,
    new InputStream("(foo (bar baz))"),
    (readList, stream) => {
      it("reads (foo (bar baz))", () => {
        expect(readList(stream, stream.peekChar())).to.eql([
          syntax(Symbol.for("foo"), loc(1, 1, 4)),
          syntax(
            [
              syntax(Symbol.for("bar"), loc(7, 7, 9)),
              syntax(Symbol.for("baz"), loc(9, 10, 13)),
            ],
            loc(4, 5, 13)
          ),
        ])
      })
    }
  )
})
