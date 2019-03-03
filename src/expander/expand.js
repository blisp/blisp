const resolve = require("@blisp/core/resolve")

function expand(form) {
  if (!Array.isArray(form)) {
    const macro = this.env[Symbol.for(typeof form)]
    if (typeof macro === "function") {
      return macro.call(this, form)
    }
    return form
  }
  const first = form[0]
  if (typeof first === "symbol") {
    const macro = this.env[resolve.call(this, first)]
    if (typeof macro === "function") {
      return macro.call(this, form)
    }
  }
  return expand.call(this, [Symbol.for("call"), ...form])
}

module.exports = expand
