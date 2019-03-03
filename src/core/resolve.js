const symbolKey = require("./symbol-key")

function resolve(symbol) {
  return Symbol.for(symbolKey(symbol))
}

module.exports = resolve
