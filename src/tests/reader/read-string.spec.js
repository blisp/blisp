const { expect } = require("chai")
const InputStream = require("@blisp/reader/input-stream")
describeModule("@blisp/reader/read-string", (readString) => {
  describeCall(readString, new InputStream('"foo"'), (readString, stream) => {
    it('reads "foo"', () => {
      expect(readString(stream, '"')).to.eql("foo")
    })
  })
})
