const { deepEqual, equal } = require("assert")
const { char, unexpected } = require("@tbdscript/core/parser")

describe(__filename, () => {
  describeModule("@tbdscript/core/parser/many", (many) => {
    describeCombinator(char, "a", (a) => {
      function reduce(acc, result) {
        return (acc || "") + String.fromCharCode(result)
      }
      describeCombinator(many, a, "", reduce, (parser) => {
        describeTest(parser, "abc", 1, "eok", (result, pos) => {
          itReadsString("", (str) => equal(result, str))
          itEndsAtPosition(1, (end) => equal(pos, end))
        })
        describeTest(parser, "abc", 0, "cok", (result, pos) => {
          itReadsString("a", (char) => equal(result, char))
          itEndsAtPosition(1, (end) => equal(pos, end))
        })
        describeTest(parser, "aabc", 0, "cok", (result, pos) => {
          itReadsString("aa", (char) => equal(result, char))
          itEndsAtPosition(2, (end) => equal(pos, end))
        })
        describeTest(parser, "aa", 0, "cok", (result, pos) => {
          itReadsString("aa", (char) => equal(result, char))
          itEndsAtPosition(2, (end) => equal(pos, end))
        })
        describeTest(parser, "aaaaaabaaaa", 0, "cok", (result, pos) => {
          itReadsString("aaaaaa", (char) => equal(result, char))
          itEndsAtPosition(6, (end) => equal(pos, end))
        })
      })
    })
  })
})
