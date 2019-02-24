const read = require("@blisp/reader/read")
const InputStream = require("@blisp/reader/input-stream")
const compile = require("./compile")
const { readFileSync } = require("fs")

function compileFile(filename) {
  const contents = readFileSync(filename, "utf8")
  const forms = []
  const stream = new InputStream(contents)
  while (!stream.eof()) {
    const form = read(stream)
    if (form) {
      forms.push(form)
    }
  }
  return compile.call(this, [
    Symbol.for("#%file"),
    [Symbol.for("#%program"), forms],
  ])
}

module.exports = compileFile
