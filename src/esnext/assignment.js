const expand = require("@blisp/expander/expand")
const { SourceNode } = require("source-map")

function assignment(form) {
  return new SourceNode(null, null, null, [
    expand.call(this, form[1]),
    "=",
    expand.call(this, form[2]),
  ])
}

module.exports = assignment
