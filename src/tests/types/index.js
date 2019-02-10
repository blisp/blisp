global.itCompilesTo = function itCompilesTo(syntax, cb) {
  return it(`compiles to a ${syntax.type} node`, () => cb(syntax))
}
