const InputStream = require("@blisp/reader/input-stream")
const { expect } = require("chai")
const loc = require("@blisp/reader/loc")
const { identifier, stringLiteral } = require("@babel/types")

describeModule("@blisp/reader/read", (read) => {
  describe("symbols", () => {
    describeCall(read, new InputStream(" foo"), (read, stream) => {
      it("reads the symbol foo", () => {
        expect(read(stream)).to.eql(
          Object.assign(
            identifier("foo"),
            loc(loc.position(1, 1), loc.position(1, 4), loc.position(1, 0))
          )
        )
      })
    })
  })
  describe("strings", () => {
    describeReadInput(read, '"foo"', (stream) => {
      it('reads "foo"', () => {
        expect(read(stream, '"')).to.eql(
          Object.assign(
            stringLiteral("foo"),
            loc(loc.position(1, 0), loc.position(1, 5), loc.position(1, 0))
          )
        )
      })
    })
  })
  describe("numbers", () => {
    const syntax = (n, length = 1) =>
      Object.assign(
        n,
        loc(loc.position(1, 0), loc.position(1, length), loc.position(1, 0))
      )
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
