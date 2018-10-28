const { deepEqual, equal } = require("assert")
const { unexpected } = require("@tbdscript/core/parser")

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
describe(__filename, () => {
  describeModule("@tbdscript/core/parser/char", (char) => {
    describeCombinator(char, "a", (parser) => {
      describeTest(parser, "abc", 0, "cok", (result, pos) => {
        itReadsChar("a", (char) => equal(result, char))
        itEndsAtPosition(1, (end) => equal(pos, end))
      })
      describeTest(parser, "abc", 1, "eerr", (result, pos) => {
        itErrors(unexpected(1, "a", "b"), (error) => deepEqual(result, error))
        itEndsAtPosition(1, (end) => equal(pos, end))
      })
    })
  })
})
