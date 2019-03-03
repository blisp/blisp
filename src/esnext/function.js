const expand = require("@blisp/expander/expand")
const { SourceNode } = require("source-map")

// (function id? [...params] (block  ...body))
// (function id? (array ...params) (block ..body))
// function id? (params.join(", ") { ...body })
function fn(form) {
  const result = ["function", " "]
  let index = 1
  if (typeof form[index] === "symbol") {
    result.push(expand.call(this, form[index]))
    index++
  }
  result.push("(")
  for (let i = 1; i !== form[index].length; i++) {
    result.push(expand.call(this, form[index][i]))
    if (i !== form[index].length - 1) {
      result.push(",")
    }
  }
  result.push(")")
  result.push(expand.call(this, form[index + 1]))
  return new SourceNode(null, null, null, result)
}

module.exports = fn
