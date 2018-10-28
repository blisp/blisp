const { deepEqual, equal } = require("assert")
const { char, unexpected } = require("@tbdscript/core/parser")

describe(__filename, () => {
  describeModule("@tbdscript/core/parser/sequence", (sequence) => {
    describeCombinator(char, "a", (a) => {
      describeCombinator(char, "b", (b) => {
        function reduce(acc, result) {
          return (acc || "") + String.fromCharCode(result)
        }
        describeCombinator(sequence, a, b, "", reduce, (parser) => {
          describeTest(parser, "abc", 0, "cok", (result, pos) => {
            itReadsString("ab", (char) => equal(result, char))
            itEndsAtPosition(2, (end) => equal(pos, end))
          })
          describeTest(parser, "abc", 1, "eerr", (result, pos) => {
            itErrors(unexpected(1, "a", "b"), (error) =>
              deepEqual(result, error)
            )
            itEndsAtPosition(1, (end) => equal(pos, end))
          })
        })
      })
    })
  })
})
