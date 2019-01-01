const assert = require("assert")
const InputStream = require("@blisp/reader/input-stream")
const syntax = require("@blisp/reader/syntax")
const { expect } = require("chai")

describeModule("@blisp/reader/read-list", (readList) => {
  describeCall(readList, new InputStream("(foo bar)"), (readList, stream) => {
    it("reads (foo bar)", () => {
      assert.deepEqual(readList(stream, stream.peekChar()), [
        syntax("", Symbol.for("foo"), 3),
        syntax(" ", Symbol.for("bar"), 3),
      ])
    })
  })
  describeCall(
    readList,
    new InputStream("(foo (bar baz))"),
    (readList, stream) => {
      it("reads (foo (bar baz))", () => {
        expect(readList(stream, stream.peekChar())).to.eql([
          syntax("", Symbol.for("foo"), 3),
          syntax(
            " ",
            [
              syntax("", Symbol.for("bar"), 3),
              syntax(" ", Symbol.for("baz"), 3),
            ],
            9
          ),
        ])
      })
    }
  )
})
