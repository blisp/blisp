const expand = require("@blisp/expander/expand")
const { expect } = require("chai")

describeModule("@blisp/types/member-expression", (env) => {
  describeForm("(. console log)", (form) => {
    it("expands to a MemberExpression node", () => {
      expect(expand(form, env)).to.eql({
        type: "MemberExpression",
        object: form.arguments[0],
        property: form.arguments[1],
        computed: false,
        loc: form.loc,
      })
    })
  })
})
