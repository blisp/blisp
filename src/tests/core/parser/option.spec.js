const { equal } = require("assert")

function consumeError(input, pos, _, cerr) {
  return cerr("foo", pos + 1, input)
}

function emptyError(input, pos, _, cerr) {
  return cerr("foo", pos, input)
}

describeModule("@tbdscript/core/parser/option", (option) => {
  describeCombinator(option, consumeError, (parser) => {
    describeTest(parser, "abc", 0, "eok", (result, pos) => {
      itReadsString("foo", (str) => equal(result, str))
      itEndsAtPosition(0, (end) => equal(pos, end))
    })
  })
  describeCombinator(option, emptyError, (parser) => {
    describeTest(parser, "abc", 0, "eok", (result, pos) => {
      itReadsString("foo", (str) => equal(result, str))
      itEndsAtPosition(0, (end) => equal(pos, end))
    })
  })
})
