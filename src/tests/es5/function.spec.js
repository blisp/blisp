const chai = require("chai")
const { expect } = chai
const chaiExclude = require("chai-exclude")
chai.use(chaiExclude)

const env = require("@blisp/es5")
const {
  functionExpression,
  callExpression,
  expressionStatement,
  blockStatement,
  identifier,
} = require("@babel/types")
const read = require("@blisp/reader/read")
const removeAllScopes = require("@blisp/expander/removeAllScopes")

describeModule("@blisp/es5/function", (fn) => {
  describeInput(
    `(function foo (bar)
                   (block
                     (function baz () (return 1))
                     (bar (baz))))`,
    (input) => {
      it("Expands to a function expression", () => {
        expect(
          fn(read(input), {
            ...env,
            bar: [{ ...identifier("bar"), scopes: new Set() }],
          })
        )
          .excludingEvery("scopes")
          .to.eql(
            functionExpression(
              identifier("foo"),
              [identifier("bar_1")],
              blockStatement([
                expressionStatement(callExpression(identifier("bar_1"), [])),
              ])
            )
          )
      })
    }
  )
  describeInput("(function (bar) (block (bar)))", (input) => {
    it("Expands to an anonymous function expression", () => {
      expect(fn(read(input), env))
        .excludingEvery("scopes")
        .to.eql(
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
