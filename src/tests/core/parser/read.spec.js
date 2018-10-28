const { equal, deepEqual } = require("assert")
const unexpectedEof = require("@tbdscript/core/parser/unexpected-eof")

describe(__filename, () => {
  describeModule("@tbdscript/core/parser/read", (read) => {
    describeTest(read, "abc", 0, "cok", (result, pos) => {
      itReadsChar("a", (char) => equal(result, char))
      itEndsAtPosition(1, (end) => equal(pos, end))
    })
    describeTest(read, "abc", 3, "cok", (result, pos) => {
      itReadsChar("EOF", (char) => equal(result, char))
      itEndsAtPosition(4, (end) => equal(pos, end))
    })
    describeTest(read, "abc", 4, "eerr", (result, pos) => {
      itErrors(unexpectedEof(4), (error) => {
        deepEqual(result, error)
      })
      itEndsAtPosition(4, (end) => equal(pos, end))
    })
  })
})
