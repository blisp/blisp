const symbolKey = require("@blisp/core/symbol-key")

function compileSymbol(symbol) {
  return symbolKey(symbol)
}

module.exports = compileSymbol
