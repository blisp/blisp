const chai = require("chai")
const { expect } = chai
const chaiExclude = require("chai-exclude")
chai.use(chaiExclude)

const {
  variableDeclaration,
  variableDeclarator,
  identifier,
  numericLiteral,
} = require("@babel/types")
const expand = require("@blisp/expander/expand")
const read = require("@blisp/reader/read")
const env = require("@blisp/es5")

describeModule("@blisp/es5/declare", (declare) => {
  describeInput("(declare let (a 1))", (input) => {
    it("expands to a variable declaration", () => {
      expect(expand(read(input), env))
        .excludingEvery("scopes")
        .to.eql(
          variableDeclaration("let", [
            variableDeclarator(identifier("a"), numericLiteral(1)),
          ])
        )
    })
  })
  describeInput("(declare let (a 1) (b 2))", (input) => {
    it("expands to a variable declaration", () => {
      expect(expand(read(input), env))
        .excludingEvery("scopes")
        .to.eql(
          variableDeclaration("let", [
            variableDeclarator(identifier("a"), numericLiteral(1)),
            variableDeclarator(identifier("b"), numericLiteral(2)),
          ])
        )
    })
  })
})
