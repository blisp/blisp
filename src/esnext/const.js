const expand = require("@blisp/expander/expand")
const { SourceNode } = require("source-map")

function cnst(form) {
  return new SourceNode(null, null, null, [
    "const",
    " ",
    expand.call(this, form[1][1]),
    "=",
    expand.call(this, form[1][2]),
  ])
}

module.exports = cnst
