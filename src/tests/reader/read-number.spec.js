const { expect } = require("chai")
describeModule("@blisp/reader/number/read-number", (readNumber) => {
  describe("decimal", () => {
    describe("integer", () => {
      describeReadInput(readNumber, "0", (stream) => {
        itReadsTheNumber(Number(stream.input), (n) => {
          expect(readNumber(stream, stream.peekChar())).to.eql(n)
        })
      })
      describeReadInput(readNumber, "1", (stream) => {
        itReadsTheNumber(Number(stream.input), (n) => {
          expect(readNumber(stream, stream.peekChar())).to.eql(n)
        })
      })
      describeReadInput(readNumber, "10", (stream) => {
        itReadsTheNumber(Number(stream.input), (n) => {
          expect(readNumber(stream, stream.peekChar())).to.eql(n)
        })
      })
      describeReadInput(readNumber, "100", (stream) => {
        itReadsTheNumber(Number(stream.input), (n) => {
          expect(readNumber(stream, stream.peekChar())).to.eql(n)
        })
      })
      describeReadInput(readNumber, "01", (stream) => {
        it("throws an invalid syntax error", () => {
          // TODO: Verify error
          expect(() => readNumber(stream, stream.peekChar())).to.throw()
        })
      })
    })
    describe("decimal", () => {
      describeReadInput(readNumber, "1.1", (stream) => {
        itReadsTheNumber(Number(stream.input), (n) => {
          expect(readNumber(stream, stream.peekChar())).to.eql(n)
        })
      })
      describeReadInput(readNumber, "1.1e1", (stream) => {
        itReadsTheNumber(Number(stream.input), (n) => {
          expect(readNumber(stream, stream.peekChar())).to.eql(n)
        })
      })
      describeReadInput(readNumber, "1.01", (stream) => {
        itReadsTheNumber(Number(stream.input), (n) => {
          expect(readNumber(stream, stream.peekChar())).to.eql(n)
        })
      })
    })
    describe("exponent", () => {
      describeReadInput(readNumber, "1e1", (stream) => {
        itReadsTheNumber(Number(stream.input), (n) => {
          expect(readNumber(stream, stream.peekChar())).to.eql(n)
        })
      })
      describeReadInput(readNumber, "1e+1", (stream) => {
        itReadsTheNumber(Number(stream.input), (n) => {
          expect(readNumber(stream, stream.peekChar())).to.eql(n)
        })
      })
      describeReadInput(readNumber, "1e-1", (stream) => {
        itReadsTheNumber(Number(stream.input), (n) => {
          expect(readNumber(stream, stream.peekChar())).to.eql(n)
        })
      })
    })
  })
  describe("binary", () => {
    describeReadInput(readNumber, "0b0", (stream) => {
      itReadsTheNumber(Number(stream.input), (n) => {
        expect(readNumber(stream, stream.peekChar())).to.eql(n)
      })
    })
    describeReadInput(readNumber, "0b1", (stream) => {
      itReadsTheNumber(Number(stream.input), (n) => {
        expect(readNumber(stream, stream.peekChar())).to.eql(n)
      })
    })
    describeReadInput(readNumber, "0b10", (stream) => {
      itReadsTheNumber(Number(stream.input), (n) => {
        expect(readNumber(stream, stream.peekChar())).to.eql(n)
      })
    })
    describeReadInput(readNumber, "0b3", (stream) => {
      it("throws", () => {
        expect(() => readNumber(stream, stream.peekChar())).to.throw()
      })
    })
  })
  describe("octal", () => {
    describeReadInput(readNumber, "0o0", (stream) => {
      itReadsTheNumber(Number(stream.input), (n) => {
        expect(readNumber(stream, stream.peekChar())).to.eql(n)
      })
    })
    describeReadInput(readNumber, "0o1", (stream) => {
      itReadsTheNumber(Number(stream.input), (n) => {
        expect(readNumber(stream, stream.peekChar())).to.eql(n)
      })
    })
    describeReadInput(readNumber, "0o10", (stream) => {
      itReadsTheNumber(Number(stream.input), (n) => {
        expect(readNumber(stream, stream.peekChar())).to.eql(n)
      })
    })
    describeReadInput(readNumber, "0o9", (stream) => {
      it("throws", () => {
        expect(() => readNumber(stream, stream.peekChar())).to.throw()
      })
    })
  })
  describe("hex", () => {
    describeReadInput(readNumber, "0x0", (stream) => {
      itReadsTheNumber(Number(stream.input), (n) => {
        expect(readNumber(stream, stream.peekChar())).to.eql(n)
      })
    })
    describeReadInput(readNumber, "0x1", (stream) => {
      itReadsTheNumber(Number(stream.input), (n) => {
        expect(readNumber(stream, stream.peekChar())).to.eql(n)
      })
    })
    describeReadInput(readNumber, "0x10", (stream) => {
      itReadsTheNumber(Number(stream.input), (n) => {
        expect(readNumber(stream, stream.peekChar())).to.eql(n)
      })
    })
    describeReadInput(readNumber, "0xa", (stream) => {
      itReadsTheNumber(Number(stream.input), (n) => {
        expect(readNumber(stream, stream.peekChar())).to.eql(n)
      })
    })
    describeReadInput(readNumber, "0xf", (stream) => {
      itReadsTheNumber(Number(stream.input), (n) => {
        expect(readNumber(stream, stream.peekChar())).to.eql(n)
      })
    })
    describeReadInput(readNumber, "0xA", (stream) => {
      itReadsTheNumber(Number(stream.input), (n) => {
        expect(readNumber(stream, stream.peekChar())).to.eql(n)
      })
    })
    describeReadInput(readNumber, "0xF", (stream) => {
      itReadsTheNumber(Number(stream.input), (n) => {
        expect(readNumber(stream, stream.peekChar())).to.eql(n)
      })
    })
    describeReadInput(readNumber, "0xg", (stream) => {
      it("throws", () => {
        expect(() => readNumber(stream, stream.peekChar())).to.throw()
      })
    })
  })
})
