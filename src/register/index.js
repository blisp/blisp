const { SourceNode } = require("source-map")
const readFile = require("@blisp/reader/read-file")
const { resolve, symbolKey } = require("@blisp/core")
const expand = require("@blisp/expander/expand")
const path = require("path")

const env = {
  env: {
    [Symbol.for("macro")]: function macro(form) {
      // TODO: multiple macros
      const symbol = resolve.call(this, expand.call(this, form[1][1]))
      this.env[symbol] = this.env[Symbol.for("eval")].call(this, [
        Symbol.for("eval"),
        form[1][2],
      ])
    },
    [Symbol.for("eval")]: function(form) {
      const m = expand.call({ env: this.codegen }, expand.call(this, form[1]))
      return eval(`(${m.toString()})`)
    },
  },
}
require.extensions[".bl"] = function(module, filename) {
  var content = readFile(filename)
  if (Array.isArray(content[0])) {
    if (symbolKey(content[0][0]) === "#%codegen") {
      env.codegen = require(require.resolve(content[0][1], {
        paths: [path.dirname(filename)],
      }))
      content = content.slice(1)
    }
  }

  const expanded = content.map((form) => expand.call(env, form))

  const codegen = { env: env.codegen }

  const compiled = new SourceNode(
    null,
    null,
    null,
    expanded.reduce((acc, form) => {
      acc.push(expand.call(codegen, form))
      acc.push(";")
      return acc
    }, [])
  )

  module._compile(compiled.toString(), filename)
}
