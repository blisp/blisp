require("./types")
const InputStream = require("@blisp/reader/input-stream")
const print = require("@blisp/printer/print")
const { numericLiteral, stringLiteral } = require("@babel/types")
const read = require("@blisp/reader/read")
const chai = require("chai")
chai.use(require("chai-exclude"))

global.describeModule = function describeModule(mod, cb) {
  return describe(mod, () => {
    return cb(require(mod))
  })
}

global.describeInput = function describeInput(input, cb) {
  return describe(input, () => cb(input))
}

global.describeReadInput = function describeReadInput(read, input, cb) {
  return describe(`${read.name}("${input}")`, () => cb(new InputStream(input)))
}

global.describeSyntax = function describeSyntax(syntax, cb) {
  return describe(print(syntax), () => cb(syntax))
}

global.describePrintInput = function describePrintInput(input, cb) {
  return describe(`(print '${input})`, () => cb(input))
}

global.describeCall = function describeCall(fn, ...args) {
  const fnArgs = args.slice(0, args.length - 1)
  return describe(`${fn.name}(${fnArgs})`, () => {
    const cb = args[args.length - 1]
    return cb(fn, ...fnArgs)
  })
}

global.describeForm = function describeForm(str, cb) {
  return describe(str, () => cb(read(str)))
}

global.itReadsTheNumber = function itReadsTheNumber(n, cb) {
  return it(`reads the number ${n}`, () => cb(n))
}

global.itReadsTheString = function itReadsTheString(s, cb) {
  return it(`reads the string ${s}`, () => cb(s.slice(1, s.length - 1)))
}
