const { expect } = require("chai")
const env = require("@blisp/es5")
const {
  functionExpression,
  callExpression,
  expressionStatement,
  blockStatement,
  identifier,
} = require("@babel/types")
const read = require("@blisp/reader/read")

describeModule("@blisp/es5/function", (fn) => {
  describeInput("(function foo (bar) (block (bar)))", (input) => {
    it("Expands to a function expression", () => {
      expect(fn(read(input), env)).to.eql(
        functionExpression(
          identifier("foo"),
          [identifier("bar")],
          blockStatement([
            expressionStatement(callExpression(identifier("bar"), [])),
          ])
        )
      )
    })
  })
  describeInput("(function (bar) (block (bar)))", (input) => {
    it("Expands to an anonymous function expression", () => {
      expect(fn(read(input), env)).to.eql(
        functionExpression(
          undefined,
          [identifier("bar")],
          blockStatement([
            expressionStatement(callExpression(identifier("bar"), [])),
          ])
        )
      )
    })
  })
})
