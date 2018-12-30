const InputStream = require("@blisp/reader/input-stream")
require("./reader")
global.describeModule = function describeModule(mod, cb) {
  return describe(mod, () => {
    return cb(require(mod))
  })
}

global.describeReadInput = function describeReadInput(read, input, cb) {
  return describe(`${read.name}("${input}")`, () => cb(new InputStream(input)))
}

global.describeCall = function describeCall(fn, ...args) {
  const fnArgs = args.slice(0, args.length - 1)
  return describe(`${fn.name}(${fnArgs})`, () => {
    const cb = args[args.length - 1]
    return cb(fn, ...fnArgs)
  })
}

global.itReadsTheNumber = function itReadsTheNumber(n, cb) {
  return it(`reads the number ${n}`, () => cb(n))
}

global.itReadsTheString = function itReadsTheString(s, cb) {
  return it(`reads the string ${s}`, () => cb(s.slice(1, s.length - 1)))
}
