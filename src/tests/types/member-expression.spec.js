const compile = require("@blisp/compiler/compile")
const chai = require("chai")
const expect = chai.expect
const { memberExpression, identifier } = require("@babel/types")

describeModule("@blisp/types/member-expression", (env) => {
  describeForm("(#%member foo bar)", (form) => {
    itCompilesTo(
      memberExpression(identifier("foo"), identifier("bar")),
      (syntax) => {
        expect(compile.call(env, form))
          .excludingEvery("loc")
          .to.eql(syntax)
      }
    )
  })
  describeForm("(#%member foo bar true)", (form) => {
    itCompilesTo(
      memberExpression(identifier("foo"), identifier("bar"), true),
      (syntax) => {
        expect(compile.call(env, form))
          .excludingEvery("loc")
          .to.eql(syntax)
      }
    )
  })
})
