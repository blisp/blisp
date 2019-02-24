const t = require("@babel/types")
module.exports = function syntax(value, opts) {
  if (Array.isArray(value)) {
    return t.arrayExpression(value)
  }
  switch (typeof value) {
    case "string":
      return { ...t.stringLiteral(value), ...opts }
    case "number":
      return { ...t.numericLiteral(value), ...opts }
    case "symbol":
      return { type: "SymbolLiteral", value, ...opts }
  }
}
