function print(form) {
  if (Array.isArray(form)) {
    return `(${form.map(print).join(" ")})`
  }
  if (typeof form === "object" && !form) {
    return "null"
  }
  switch (typeof form) {
    case "string":
      return `"${form}"`
    case "symbol":
      return form
    case "undefined":
      return "undefined"
    default:
      return `${form}`
  }
}

module.exports = print
