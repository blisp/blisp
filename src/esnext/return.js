const expand = require("@blisp/expander/expand")
const { SourceNode } = require("source-map")

function rtn(form) {
  return new SourceNode(null, null, null, [
    "return",
    " ",
    form.length === 2 ? expand.call(this, form[1]) : "",
  ])
}

module.exports = rtn
