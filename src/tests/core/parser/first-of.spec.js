const { deepEqual, equal } = require("assert")
const { char, unexpected } = require("@tbdscript/core/parser")

describeModule("@tbdscript/core/parser/first-of", (firstOf) => {
  describeCombinator(char, "a", (a) => {
    describeCombinator(char, "b", (b) => {
      describeCombinator(firstOf, a, b, (parser) => {
        describeTest(parser, "abc", 0, "cok", (result, pos) => {
          itReadsChar("a", (expected) => equal(result, expected))
          itEndsAtPosition(1, (end) => equal(pos, end))
        })
        describeTest(parser, "abc", 1, "cok", (result, pos) => {
          itReadsChar("b", (expected) => equal(result, expected))
          itEndsAtPosition(2, (end) => equal(pos, end))
        })
        describeTest(parser, "abc", 2, "eerr", (result, pos) => {
          itErrors(unexpected(2, "b", "c"), (expected) =>
            deepEqual(result, expected)
          )
          itEndsAtPosition(2, (end) => equal(pos, end))
        })
      })
    })
  })
})
