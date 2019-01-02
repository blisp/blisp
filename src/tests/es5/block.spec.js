const read = require("@blisp/reader/read")
const { expect } = require("chai")
const {
  blockStatement,
  callExpression,
  identifier,
  expressionStatement,
} = require("@babel/types")

describeModule("@blisp/es5/block", (block) => {
  describeInput("(block (foo))", (input) => {
    it("expands to a BlockStatement", () => {
      expect(block(read(input), testEnv)).to.eql(
        blockStatement([
          expressionStatement(callExpression(identifier("foo"), [])),
        ])
      )
    })
  })
  describeInput("(block (foo) (bar))", (input) => {
    it("expands to a BlockStatement", () => {
      expect(block(read(input), testEnv)).to.eql(
        blockStatement([
          expressionStatement(callExpression(identifier("foo"), [])),
          expressionStatement(callExpression(identifier("bar"), [])),
        ])
      )
    })
  })
})
