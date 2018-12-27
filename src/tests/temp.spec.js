const read = require("@blisp/reader/read")
const expand = require("@blisp/expander/expand")
const { memberExpression } = require("@babel/types")
const generate = require("@babel/generator").default
const utils = require("@babel/types/lib/definitions/utils")
const defineType = utils.default
const assertValueType = utils.assertValueType

defineType("SymbolLiteral", {
  builder: ["name"],

  aliases: ["Expression", "PatternLike", "LVal", "TSEntityName"],

  fields: {
    name: {
      validate: assertValueType("string"),
    },

    optional: {
      validate: assertValueType("boolean"),

      optional: true,
    },
  },
})

const env = {
  memberExpression(object, property) {
    return memberExpression(expand(object, env), expand(property, env))
  },
}

describe("foo", () => {
  it("bar", () => {
    const form = read('((memberExpression console log) "Hello World")')
    const expanded = expand(form, env)
    const js = generate(expanded)
    eval(js.code)
  })
})
