const assert = require("assert")
const InputStream = require("@blisp/reader/input-stream")
const syntax = require("@blisp/reader/syntax")

describeModule("@blisp/reader/read", (read) => {
  describeCall(read, new InputStream(" foo"), (read, stream) => {
    it("reads the symbol foo", () => {
      assert.deepEqual(read(stream), syntax(" ", Symbol.for("foo"), 3))
    })
  })
})
