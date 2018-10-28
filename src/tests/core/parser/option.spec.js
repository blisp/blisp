const { equal } = require("assert")

function consumeError(input, pos, _, cerr) {
  return cerr("foo", pos + 1, input)
}

describeModule("@tbdscript/core/parser/option", (option) => {
  describeCombinator(option, consumeError, (parser) => {
    describeTest(parser, "abc", 0, "eerr", (result, pos) => {
      itReadsString("foo", (str) => equal(result, str))
      itEndsAtPosition(0, (end) => equal(pos, end))
    })
  })
})
