const expand = require("@blisp/expander/expand")

module.exports = {
  [expand.default]: function() {
    throw new Error("No macro found")
  },
  [Symbol.for(".")]: require("@blisp/esnext/dot"),
  [Symbol.for("array")]: require("@blisp/esnext/array"),
  [Symbol.for("=")]: require("@blisp/esnext/assignment"),
  [Symbol.for("block")]: require("@blisp/esnext/block"),
  [Symbol.for("call")]: require("@blisp/esnext/call"),
  [Symbol.for("const")]: require("@blisp/esnext/const"),
  [Symbol.for("function")]: require("@blisp/esnext/function"),
  [Symbol.for("new")]: require("@blisp/esnext/new"),
  [Symbol.for("number")]: require("@blisp/esnext/number"),
  [Symbol.for("object")]: require("@blisp/esnext/object"),
  [Symbol.for("return")]: require("@blisp/esnext/return"),
  [Symbol.for("string")]: require("@blisp/esnext/string"),
  [Symbol.for("symbol")]: require("@blisp/esnext/symbol"),
  [Symbol.for("undefined")]: require("@blisp/esnext/undefined"),
  [Symbol.for("quote")]: function(form) {
    return form
  },
}
