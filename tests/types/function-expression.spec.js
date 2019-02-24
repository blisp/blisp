const compile = require("@blisp/compiler/compile")
const chai = require("chai")
const expect = chai.expect
const {
  functionExpression,
  identifier,
  blockStatement,
} = require("@babel/types")

describeModule("@blisp/types/function-expression", (env) => {
  env = Object.assign(env, require("@blisp/types/block-statement"))
  describeForm("(#%function foo () (#%block))", (form) => {
    itCompilesTo(
      functionExpression(identifier("foo"), [], blockStatement([])),
      (syntax) => {
        expect(compile.call(env, form))
          .excludingEvery("loc")
          .to.eql(syntax)
      }
    )
  })
  describeForm("(#%function undefined () (#%block))", (form) => {
    itCompilesTo(
      functionExpression(undefined, [], blockStatement([])),
      (syntax) => {
        expect(compile.call(env, form))
          .excludingEvery("loc")
          .to.eql(syntax)
      }
    )
  })
})
