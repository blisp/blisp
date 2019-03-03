const expand = require("@blisp/expander/expand")
const { SourceNode } = require("source-map")

// (call callee ...arguments)
// callee(...arguments.join(","))
function nw(form) {
  return new SourceNode(null, null, null, [
    "new",
    " ",
    expand.call(this, form[1]),
    "(",
    ...form.slice(2).reduce((acc, subForm, index, forms) => {
      acc.push(expand.call(this, subForm))
      if (index !== forms.length - 1) acc.push(",")
      return acc
    }, []),
    ")",
  ])
}

module.exports = nw
