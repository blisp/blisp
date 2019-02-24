const read = require("@blisp/reader/read")
module.exports = function blisp(strings) {
  return read(strings[0])
}
