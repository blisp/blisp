require("./reader")
global.describeModule = function describeModule(mod, cb) {
  return describe(mod, () => {
    return cb(require(mod))
  })
}

global.describeCall = function describeCall(fn, ...args) {
  const fnArgs = args.slice(0, args.length - 1)
  return describe(`${fn.name}(${fnArgs})`, () => {
    const cb = args[args.length - 1]
    return cb(fn, ...fnArgs)
  })
}
