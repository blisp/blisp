require("@blisp/reader/read")
const { expect } = require("chai")
const {
  arrayExpression,
  callExpression,
  identifier,
  stringLiteral,
  memberExpression,
} = require("@babel/types")
const syntax = require("@blisp/reader/syntax")

describeModule("@blisp/expander/expand", (expand) => {
  const env = {
    consolelog() {
      return syntax("", [
        syntax("", Symbol.for("memberExpression")),
        syntax("", Symbol.for("console")),
        syntax("", Symbol.for("log")),
      ])
    },
    memberExpression(form, env) {
      return memberExpression(
        ...form.elements.slice(1).map((arg) => expand(arg, env))
      )
    },
  }

  describeSyntax(
    syntax("", [
      syntax("", Symbol.for("memberExpression")),
      syntax("", Symbol.for("console")),
      syntax("", Symbol.for("log")),
    ]),
    (syntax) => {
      const expected = memberExpression(
        identifier("console"),
        identifier("log")
      )

      it("expands to MemberAccess node", () => {
        expect(expand(syntax, env)).to.eql(expected)
      })
    }
  )
  describeSyntax(
    syntax("", [
      syntax("", Symbol.for("consolelog")),
      syntax("", Symbol.for("foo")),
    ]),
    (syntax) => {
      const expected = memberExpression(
        identifier("console"),
        identifier("log")
      )

      it("expands to MemberAccess node", () => {
        expect(expand(syntax, env)).to.eql(expected)
      })
    }
  )

  describe('((memberExpression console log) "foo")', () => {
    it('expands to console.log("foo")', () => {
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
