const { SourceNode } = require("source-map")
const { resolve, symbolKey } = require("@blisp/core")
const expand = require("@blisp/expander/expand")

const quote = Symbol("quote")
function object(form) {
  return new SourceNode(null, null, null, [
    "({",
    ...form.slice(1).map((property, index, properties) => {
      // TODO: Assuming array
      return new SourceNode(null, null, null, [
        Array.isArray(property[1]) &&
        typeof property[1][0] === "symbol" &&
        resolve.call(this, property[1][0]) === resolve.call(this, quote)
          ? new SourceNode(null, null, null, [symbolKey(property[1][1]), ":"])
          : new SourceNode(null, null, null, [
              "[",
              expand.call(this, property[1]),
              "]:",
            ]),
        expand.call(this, property[2]),
        ...(index !== properties.length - 1 ? [","] : []),
      ])
    }),
    "})",
  ])
}

module.exports = object
