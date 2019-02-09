const InputStream = require("@blisp/reader/input-stream")
const { expect } = require("chai")

describeModule("@blisp/reader/read-list", (readList) => {
  describeCall(readList, new InputStream("(foo"), (readList, stream) => {
    it("throws", () => {
      expect(() => readList(stream, stream.peekChar())).to.throw()
    })
  })
  describeCall(readList, new InputStream("()"), (readList, stream) => {
    it("reads a null literal", () => {
      expect(readList(stream, stream.peekChar())).to.be.eql([])
    })
  })
  describeCall(readList, new InputStream("(foo ())"), (readList, stream) => {
    it("reads a null literal", () => {
      expect(readList(stream, stream.peekChar())).to.eql([
        Object.assign(Symbol.for("foo")),
        [],
      ])
    })
  })

  describeCall(readList, new InputStream("(foo)"), (readList, stream) => {
    it("reads (foo)", () => {
      expect(readList(stream, stream.peekChar())).to.eql([
        Object.assign(Symbol.for("foo")),
      ])
    })
  })
  describeCall(readList, new InputStream("(foo bar)"), (readList, stream) => {
    it("reads (foo bar)", () => {
      expect(readList(stream, stream.peekChar())).to.eql([
        Object.assign(Symbol.for("foo")),
        Object.assign(Symbol.for("bar")),
      ])
    })
  })
  describeCall(
    readList,
    new InputStream("(foo (bar baz))"),
    (readList, stream) => {
      it("reads (foo (bar baz))", () => {
        expect(readList(stream, stream.peekChar())).to.eql([
          Object.assign(Symbol.for("foo")),
          [Object.assign(Symbol.for("bar")), Object.assign(Symbol.for("baz"))],
        ])
      })
    }
  )
})
