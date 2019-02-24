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
  isIdentifier,
  memberExpression,
} = require("@babel/types")
const resolve = require("./resolve")

function expand(form, env) {
  switch (form.type) {
    case "CallExpression": {
      const first = expand(form.callee, env)
      if (isIdentifier(first)) {
        const macro = resolve(first.name, env)
        if (typeof macro === "function") {
          return macro(form, env)
        }
      }
      return callExpression(first, form.arguments.map((s) => expand(s, env)))
    }
    case "ObjectExpression":
    default:
      return form
  }
}

module.exports = expand
