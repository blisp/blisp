module.exports = function resolve(symbol, env) {
  if (!symbol) {
    return undefined
  }
  if (symbol instanceof Symbol) {
    return resolve(symbol.valueOf(), env)
  }
  if (typeof symbol !== "symbol") {
    return undefined
  }
  return env[symbol]
}
