const Module = require("module")
const path = require("path")

const originalResolveFilename = Module._resolveFilename

const targetDir = __dirname

Module._resolveFilename = function(request, _parent) {
  if (request.startsWith("@blisp")) {
    let relativeTarget = ""
    let requestTarget = path.dirname(_parent.filename)
    while (requestTarget !== targetDir) {
      requestTarget = path.dirname(requestTarget)
      relativeTarget += "../"
    }
    return originalResolveFilename.apply(this, [
      request.replace("@blisp", relativeTarget + "src"),
      ...[].slice.call(arguments, 1),
    ])
  }
  return originalResolveFilename.apply(this, arguments)
}

require("./src/register")
