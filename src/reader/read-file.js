const { readFileSync } = require("fs")
const InputStream = require("@blisp/reader/input-stream")
const read = require("@blisp/reader/read")

module.exports = function readFile(filename) {
  const contents = readFileSync(filename, "utf8")
  const stream = new InputStream(contents)
  const forms = []
  const env = {}
  while (!stream.eof()) {
    const form = read.call(env, stream)
    forms.push(form)
  }
  return forms
}
