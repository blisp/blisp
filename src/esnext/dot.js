const { SourceNode } = require("source-map")
const { resolve, symbolKey } = require("@blisp/core")
const expand = require("@blisp/expander/expand")

// (. object (quote symbol))
// (. object computed)
const quote = Symbol("quote")
function dot(form) {
  return new SourceNode(null, null, null, [
    expand.call(this, form[1]),
    Array.isArray(form[2]) &&
    resolve.call(this, form[2][0]) === resolve.call(this, quote)
      ? new SourceNode(null, null, null, [".", symbolKey(form[2][1])])
      : new SourceNode(null, null, null, [
          "[",
          expand.call(this, form[2]),
          "]",
        ]),
  ])
}

module.exports = dot
