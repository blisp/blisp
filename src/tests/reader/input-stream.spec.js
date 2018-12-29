const assert = require("assert")

describeModule("@blisp/reader/input-stream", (InputStream) => {
  const inputStream = new InputStream("foo")
  it("pos is 0", () => {
    assert.equal(inputStream.pos, 0)
  })
  it('input is "foo"', () => {
    assert.equal(inputStream.input, "foo")
  })
  describe("inputStream.peekChar()", () => {
    it('returns "f"', () => {
      assert.equal(inputStream.peekChar(), "f")
    })

    it("pos is 0", () => {
      assert.equal(inputStream.pos, 0)
    })
  })
  describe("InputStream.readChar()", () => {
    it('returns "f"', () => {
      assert.equal(inputStream.readChar(), "f")
    })
    it("pos is 1", () => {
      assert.equal(inputStream.pos, 1)
    })
  })
})
