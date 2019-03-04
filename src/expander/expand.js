const resolve = require("@blisp/core/resolve")

function expand(form) {
  if (!Array.isArray(form)) {
    const macro = this.env[Symbol.for(typeof form)]
    if (typeof macro === "function" && typeof form !== "object") {
      return macro.call(this, form)
    }
    return form
  }
  const first = form[0]
  if (typeof first === "symbol") {
    const resolved = resolve.call(this, first)
    if (this.codegen && this.codegen[resolved]) {
      return form.map(expand.bind(this))
    }
    const macro = this.env[resolved]
    if (typeof macro === "function") {
      return expand.call(this, macro.call(this, form))
    }
  }
  return this.env[expand.default]
    ? this.env[expand.default].call(this, form)
    : expand.call(this, [Symbol.for("call"), ...form.map(expand.bind(this))])
}

expand.default = Symbol("default")

module.exports = expand
