const { fail } = require("assert")

global.describeModule = function describeModule(mod, cb) {
  describe(mod, () => {
    cb(require(mod))
  })
}

global.describeCombinator = function describeCombinator(combinator, ...args) {
  const combinatorArgs = args.slice(0, args.length - 1)
  args[args.length - 1](
    Object.assign(combinator.apply(combinator, combinatorArgs), {
      description: `${combinator.name}(${combinatorArgs
        .map((arg) => {
          switch (typeof arg) {
            case "string":
              return `"${arg}"`
            default:
              return arg.description || arg.name || arg
          }
        })
        .join(", ")})`,
    })
  )
}

global.describeTest = function describeTest(parser, input, pos, expected, cb) {
  const cok = expected === "cok" ? cb : failCallback("cok")
  const cerr = expected === "cerr" ? cb : failCallback("cerr")
  const eok = expected === "eok" ? cb : failCallback("eok")
  const eerr = expected === "eerr" ? cb : failCallback("eerr")
  describe(`${parser.description ||
    parser.name ||
    "unknownParser"}("${input}", ${pos}, cok, cerr, eok, eerr)`, () =>
    parser(input, pos, cok, cerr, eok, eerr))
}

function failCallback(method) {
  return (result, pos) =>
    it(`doesn't call ${method}`, () => {
      fail(`parser called ${method} with result: ${result} at position: ${pos}`)
    })
}

global.itReadsString = function itReadsString(str, cb) {
  it(`reads string "${str}"`, () => cb(str))
}

global.itReadsChar = function itReadsChar(char, cb) {
  it(`reads charAt "${char}"`, () =>
    cb(char === "EOF" ? -1 : char.charCodeAt(0)))
}

global.itEndsAtPosition = function itEndsAtPosition(pos, cb) {
  it(`ends at pos ${pos}`, () => cb(pos))
}

global.itErrors = function itErrors(error, cb) {
  it(`Errors with ${error}`, () => {
    cb(error)
  })
}
