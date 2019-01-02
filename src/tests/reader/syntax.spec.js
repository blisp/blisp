const { expect } = require("chai")

describeModule("@blisp/reader/syntax", (syntax) => {
  describe('(syntax "" (Symbol.for "foo"))', () => {
    it("returns a symbol literal", () => {
      expect(syntax("", Symbol.for("foo"))).to.eql({
        type: "SymbolLiteral",
        name: Symbol.for("foo"),
      })
    })
  })
  describe('(syntax "" "foo")', () => {
    it("returns a string literal", () => {
      expect(syntax("", "foo")).to.eql({
        type: "StringLiteral",
        value: "foo",
      })
    })
  })
  describe('(syntax "" 0)', () => {
    it("returns a numeric literal", () => {
      expect(syntax("", 0)).to.eql({
        type: "NumericLiteral",
        value: 0,
      })
    })
  })
})
