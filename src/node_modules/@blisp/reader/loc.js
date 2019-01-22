module.exports = function loc(start, end, trivia) {
  return { loc: { start, end, trivia } }
}

module.exports.position = function position(line, column) {
  return { line, column }
}
