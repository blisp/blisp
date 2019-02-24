const assert = require("assert")
const InputStream = require("@blisp/reader/input-stream")
describeModule("@blisp/reader/read-trivia", (readTrivia) => {
  describeCall(readTrivia, new InputStream(""), (readTrivia, stream) => {
    it('reads ""', () => {
      assert(readTrivia, stream, stream.peekChar(), "")
    })
  })
  describeCall(readTrivia, new InputStream("a"), (readTrivia, stream) => {
    it('reads ""', () => {
      assert(readTrivia, stream, stream.peekChar(), "")
    })
  })
  describeCall(readTrivia, new InputStream(" a"), (readTrivia, stream) => {
    it('reads " "', () => {
      assert(readTrivia, stream, stream.peekChar(), " ")
    })
  })
  describeCall(readTrivia, new InputStream("\ta"), (readTrivia, stream) => {
    it('reads "\\t"', () => {
      assert(readTrivia, stream, stream.peekChar(), "\t")
    })
  })
  describeCall(readTrivia, new InputStream("\na"), (readTrivia, stream) => {
    it('reads "\\n"', () => {
      assert(readTrivia, stream, stream.peekChar(), "\n")
    })
  })
  describeCall(readTrivia, new InputStream("\ra"), (readTrivia, stream) => {
    it('reads "\\r"', () => {
      assert(readTrivia, stream, stream.peekChar(), "\r")
    })
  })
})
