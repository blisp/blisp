const { SourceNode } = require("source-map")
const readFile = require("@blisp/reader/read-file")
const { symbolKey } = require("@blisp/core")
const expand = require("@blisp/expander/expand")
const path = require("path")

const env = {}
require.extensions[".bl"] = function(module, filename) {
  var content = readFile(filename)
  if (Array.isArray(content[0])) {
    if (symbolKey(content[0][0]) === "#%env") {
      env.env = require(require.resolve(content[0][1], {
        paths: [path.dirname(filename)],
      }))
      content = content.slice(1)
    }
  }
  const compiled = new SourceNode(
    null,
    null,
    null,
    content.reduce((acc, form) => {
      acc.push(expand.call(env, form))
      acc.push(";")
      return acc
    }, [])
  )
  module._compile(compiled.toString(), filename)
}
