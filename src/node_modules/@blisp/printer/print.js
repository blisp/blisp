function print(form) {
  if (Array.isArray(form)) {
    return `(${form.map(print).join(" ")})`
  }
  if (typeof form === "object" && !form) {
    return null
  }
  switch (typeof form.valueOf()) {
    case "string":
      return `"${form.valueOf()}"`
    case "symbol":
      return Symbol.keyFor(form.valueOf())
    default:
      return `${form.valueOf()}`
  }
}

module.exports = print
