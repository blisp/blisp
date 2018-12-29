module.exports = function peekCharCode(stream) {
  return stream.input.charCodeAt(stream.pos)
}
