const InputStream = require("@blisp/reader/input-stream")
const { expect } = require("chai")

describeModule("@blisp/reader/read", (read) => {
  describe("symbols", () => {
    describeCall(read, new InputStream(" foo"), (read, stream) => {
      it("reads the symbol foo", () => {
        expect(read(stream).toString()).to.eql(Symbol("foo").toString())
      })
    })
  })
  describe("strings", () => {
    describeReadInput(read, '"foo"', (stream) => {
      it('reads "foo"', () => {
        expect(read(stream, '"')).to.eql("foo")
      })
    })
  })
  describe("numbers", () => {
    const syntax = (n) => n
    describeReadInput(read, "0", (stream) => {
      itReadsTheNumber(0, (n) => {
        expect(read(stream)).to.eql(syntax(n))
      })
    })
    describeReadInput(read, "1", (stream) => {
      itReadsTheNumber(1, (n) => {
        expect(read(stream)).to.eql(syntax(n))
      })
    })
    describeReadInput(read, "2", (stream) => {
      itReadsTheNumber(2, (n) => {
        expect(read(stream)).to.eql(syntax(n))
      })
    })
    describeReadInput(read, "3", (stream) => {
      itReadsTheNumber(3, (n) => {
        expect(read(stream)).to.eql(syntax(n))
      })
    })
    describeReadInput(read, "4", (stream) => {
      itReadsTheNumber(4, (n) => {
        expect(read(stream)).to.eql(syntax(n))
      })
    })
    describeReadInput(read, "5", (stream) => {
      itReadsTheNumber(5, (n) => {
        expect(read(stream)).to.eql(syntax(n))
      })
    })
    describeReadInput(read, "6", (stream) => {
      itReadsTheNumber(6, (n) => {
        expect(read(stream)).to.eql(syntax(n))
      })
    })
    describeReadInput(read, "7", (stream) => {
      itReadsTheNumber(7, (n) => {
        expect(read(stream)).to.eql(syntax(n))
      })
    })
    describeReadInput(read, "8", (stream) => {
      itReadsTheNumber(8, (n) => {
        expect(read(stream)).to.eql(syntax(n))
      })
    })
    describeReadInput(read, "9", (stream) => {
      itReadsTheNumber(9, (n) => {
        expect(read(stream)).to.eql(syntax(n))
      })
    })
    describeReadInput(read, ".0", (stream) => {
      itReadsTheNumber(0.0, (n) => {
        expect(read(stream)).to.eql(syntax(n, 2))
      })
    })
  })
  // describe("list", () => {})
})
