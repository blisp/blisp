const { expect } = require("chai")
const {
  arrayExpression,
  callExpression,
  identifier,
  stringLiteral,
  memberExpression,
} = require("@babel/types")

const env = {
  memberExpression,
}

describeModule("@blisp/expander/expand", (expand) => {
  describe("(memberAccess console log)", () => {
    it("expands to MemberAccess node", () => {
      // const input = '((memberAccess console log) "foo")'
      expect(
        expand(
          arrayExpression([
            identifier("memberExpression"),
            identifier("console"),
            identifier("log"),
          ]),
          env
        )
      ).to.eql(memberExpression(identifier("console"), identifier("log")))
    })
  })
  describe('((memberAccess console log) "foo")', () => {
    it('expands to console.log("foo"', () => {
      expect(
        expand(
          arrayExpression([
            arrayExpression([
              identifier("memberExpression"),
              identifier("console"),
              identifier("log"),
            ]),
            stringLiteral("foo"),
          ]),
          env
        )
      ).to.eql(
        callExpression(
          memberExpression(identifier("console"), identifier("log")),
          [stringLiteral("foo")]
        )
      )
    })
  })
})
