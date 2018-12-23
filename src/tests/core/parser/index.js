const { fail } = require("assert")

global.describeModule = function describeModule(mod, cb) {
  describe(mod, () => {
    cb(require(mod))
  })
}

