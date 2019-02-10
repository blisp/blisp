const compile = require("@blisp/compiler/compile")
const chai = require("chai")
const expect = chai.expect
const { returnStatement, identifier } = require("@babel/types")

describeModule("@blisp/types/return-statement", (env) => {
  describeForm("(#%return)", (form) => {
    itCompilesTo(returnStatement(), (syntax) => {
      expect(compile.call(env, form)).to.eql(syntax)
    })
  })
  describeForm("(#%return bar)", (form) => {
    itCompilesTo(returnStatement(identifier("bar")), (syntax) => {
      expect(compile.call(env, form)).to.eql(syntax)
    })
  })
})
