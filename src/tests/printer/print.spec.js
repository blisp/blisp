const { expect } = require("chai")
const read = require("@blisp/reader/read")

describeModule("@blisp/printer/print", (print) => {
  describePrintInput('(foo "bar" baz 0.0)', (input) => {
    const expected = input.replace("0.0", "0")
    it(`prints ${expected}`, () => {
      expect(print(read(input))).to.eql(expected)
    })
  })
})
