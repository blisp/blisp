const InputStream = require("@blisp/reader/input-stream")
const { expect } = require("chai")
const { callExpression, identifier, nullLiteral } = require("@babel/types")
const loc = require("@blisp/reader/loc")

describeModule("@blisp/reader/read-list", (readList) => {
  describeCall(readList, new InputStream("(foo"), (readList, stream) => {
    it("throws", () => {
      expect(() => readList(stream, stream.peekChar())).to.throw()
    })
  })
  describeCall(readList, new InputStream("()"), (readList, stream) => {
    it("reads a null literal", () => {
      expect(readList(stream, stream.peekChar())).to.eql(nullLiteral())
    })
  })
  describeCall(readList, new InputStream("(foo)"), (readList, stream) => {
    it("reads (foo)", () => {
      expect(readList(stream, stream.peekChar())).to.eql(
        callExpression(
          {
            ...identifier("foo"),
            ...loc(loc.position(1, 1), loc.position(1, 4), loc.position(1, 1)),
          },
          []
        )
      )
    })
  })
  describeCall(readList, new InputStream("(foo bar)"), (readList, stream) => {
    it("reads (foo bar)", () => {
      expect(readList(stream, stream.peekChar())).to.eql(
        callExpression(
          {
            ...identifier("foo"),
            ...loc(loc.position(1, 1), loc.position(1, 4), loc.position(1, 1)),
          },
          [
            {
              ...identifier("bar"),
              ...loc(
                loc.position(1, 5),
                loc.position(1, 8),
                loc.position(1, 4)
              ),
            },
          ]
        )
      )
    })
  })
  describeCall(
    readList,
    new InputStream("(foo (bar baz))"),
    (readList, stream) => {
      it("reads (foo (bar baz))", () => {
        expect(readList(stream, stream.peekChar())).to.eql(
          callExpression(
            {
              ...identifier("foo"),
              ...loc(
                loc.position(1, 1),
                loc.position(1, 4),
                loc.position(1, 1)
              ),
            },
            [
              {
                ...callExpression(
                  {
                    ...identifier("bar"),
                    ...loc(
                      loc.position(1, 6),
                      loc.position(1, 9),
                      loc.position(1, 6)
                    ),
                  },
                  [
                    {
                      ...identifier("baz"),
                      ...loc(
                        loc.position(1, 10),
                        loc.position(1, 13),
                        loc.position(1, 9)
                      ),
                    },
                  ]
                ),
                ...loc(
                  loc.position(1, 5),
                  loc.position(1, 14),
                  loc.position(1, 4)
                ),
              },
            ]
          )
        )
      })
    }
  )
})
