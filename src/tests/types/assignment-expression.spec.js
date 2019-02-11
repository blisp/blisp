const compile = require("@blisp/compiler/compile")
const chai = require("chai")
const expect = chai.expect
const { assignmentExpression, identifier } = require("@babel/types")

describeModule("@blisp/types/assignment-expression", (env) => {
  describeForm("(#%assign = foo bar)", (form) => {
    itCompilesTo(
      assignmentExpression("=", identifier("foo"), identifier("bar")),
      (syntax) => {
        expect(compile.call(env, form)).to.eql(syntax)
      }
    )
  })
})
