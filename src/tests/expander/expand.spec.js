require("@blisp/reader/read")
const { expect } = require("chai")
const {
  arrayExpression,
  objectProperty,
  objectExpression,
  stringLiteral,
  numericLiteral,
  booleanLiteral,
  nullLiteral,
  callExpression,
  identifier,
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
  describe("quote", () => {
    const number = syntax("", 1)
    describeSyntax(
      syntax("", [syntax("", Symbol.for("quote")), number]),
      (syntax) => {
        it("it stops expansion", () => {
          expect(expand(syntax, env)).to.equal(number)
        })
      }
    )
  })
  describe("syntaxQuote", () => {
    describeSyntax(
      syntax("", [syntax("", Symbol.for("syntaxQuote")), numericLiteral(1)]),
      (syntax) => {
        it("it expands to babel object expression", () => {
          expect(expand(syntax, env)).to.eql(
            objectExpression([
              objectProperty(
                identifier("type"),
                stringLiteral("NumericLiteral")
              ),
              objectProperty(identifier("value"), numericLiteral(1)),
            ])
          )
        })
      }
    )
    describeSyntax(
      syntax("", [syntax("", Symbol.for("syntaxQuote")), stringLiteral("foo")]),
      (syntax) => {
        it("it expands to babel object expression", () => {
          expect(expand(syntax, env)).to.eql(
            objectExpression([
              objectProperty(
                identifier("type"),
                stringLiteral("StringLiteral")
              ),
              objectProperty(identifier("value"), stringLiteral("foo")),
            ])
          )
        })
      }
    )
    describeSyntax(
      syntax("", [syntax("", Symbol.for("syntaxQuote")), booleanLiteral(true)]),
      (syntax) => {
        it("it expands to babel object expression", () => {
          expect(expand(syntax, env)).to.eql(
            objectExpression([
              objectProperty(
                identifier("type"),
                stringLiteral("BooleanLiteral")
              ),
              objectProperty(identifier("value"), booleanLiteral(true)),
            ])
          )
        })
      }
    )
    describeSyntax(
      syntax("", [
        syntax("", Symbol.for("syntaxQuote")),
        booleanLiteral(false),
      ]),
      (syntax) => {
        it("it expands to babel object expression", () => {
          expect(expand(syntax, env)).to.eql(
            objectExpression([
              objectProperty(
                identifier("type"),
                stringLiteral("BooleanLiteral")
              ),
              objectProperty(identifier("value"), booleanLiteral(false)),
            ])
          )
        })
      }
    )
    describeSyntax(
      syntax("", [
        syntax("", Symbol.for("syntaxQuote")),
        syntax("", Symbol.for("foo")),
      ]),
      (syntax) => {
        it("it expands to babel object expression", () => {
          expect(expand(syntax, env)).to.eql(
            objectExpression([
              objectProperty(
                identifier("type"),
                stringLiteral("SymbolLiteral")
              ),
              objectProperty(
                identifier("value"),
                callExpression(
                  memberExpression(identifier("Symbol"), identifier("for")),
                  [stringLiteral("foo")]
                )
              ),
            ])
          )
        })
      }
    )
  })
})
