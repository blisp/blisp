global.loc = function loc(trivia, start, end) {
  return {
    loc: {
      trivia: { line: 1, column: trivia },
      start: { line: 1, column: start },
      end: { line: 1, column: end },
    },
  }
}
