const expand = require("@blisp/expander/expand")
const { SourceNode } = require("source-map")

function array(form) {
  return new SourceNode(null, null, null, [
    "[",
    ...form.slice(1).reduce((acc, subForm, index, forms) => {
      acc.push(expand.call(this, subForm))
      if (index !== forms.length - 1) {
        acc.push(",")
      }
      return acc
    }, []),
    "]",
  ])
}

module.exports = array
