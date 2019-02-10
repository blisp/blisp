const {
  callExpression,
  identifier,
  nullLiteral,
  stringLiteral,
  numericLiteral,
  booleanLiteral,
} = require("@babel/types")
const resolve = require("@blisp/expander/resolve")

function compile(form) {
  if (Array.isArray(form)) {
    const first = resolve(form[0] && form[0].valueOf(), this)
    if (first) {
      return first.call(this, form)
    }
    return callExpression(
      compile.call(this, form[0]),
      form.slice(1).map(compile.bind(this))
    )
  }
  if (typeof form === "object" && !form) {
    return nullLiteral()
  }
  switch (typeof form) {
    case "object":
      if (typeof form.valueOf() === "object") {
        throw new Error("Not implemented")
      }
      // TODO: Source location
      return compile.call(this, form.valueOf())
    case "string":
      return stringLiteral(form)
    case "number":
      return numericLiteral(form)
    case "boolean":
      return booleanLiteral(form)
    case "undefined":
      return identifier("undefined")
    case "symbol":
      return identifier(Symbol.keyFor(form))
  }
}

module.exports = compile
