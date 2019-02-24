const compile = require("@blisp/compiler/compile")
const chai = require("chai")
const expect = chai.expect
const {
  blockStatement,
  expressionStatement,
  identifier,
} = require("@babel/types")

describeModule("@blisp/types/block-statement", (env) => {
  describeForm("(#%block)", (form) => {
    itCompilesTo(blockStatement([]), (syntax) => {
      expect(compile.call(env, form)).to.eql(syntax)
    })
  })
  describeForm("(#%block (#%block))", (form) => {
    itCompilesTo(blockStatement([blockStatement([])]), (syntax) => {
      expect(compile.call(env, form)).to.eql(syntax)
    })
  })
  describeForm("(#%block bar)", (form) => {
    itCompilesTo(
      blockStatement([expressionStatement(identifier("bar"))]),
      (syntax) => {
        expect(compile.call(env, form)).to.eql(syntax)
      }
    )
  })
})
