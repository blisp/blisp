const expand = require("@blisp/expander/expand")
const chai = require("chai")
const expect = chai.expect

describeModule("@blisp/types/function-expression", (env) => {
  describeForm("(function foo () bar)", (form) => {
    it("expands to a named FunctionExpression node", () => {
      expect(expand(form, env))
        .excludingEvery("loc")
        .to.eql({
          type: "FunctionExpression",
          id: { type: "Identifier", name: "foo" },
          params: [],
          body: { type: "Identifier", name: "bar" },
          generator: false,
        })
    })
    describeForm("(function () bar)", (form) => {
      it("expands to an anonymous FunctionExpression node", () => {
        expect(expand(form, env))
          .excludingEvery("loc")
          .to.eql({
            type: "FunctionExpression",
            id: undefined,
            params: [],
            body: { type: "Identifier", name: "bar" },
            generator: false,
          })
      })
    })
  })
})
