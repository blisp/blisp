const { identifier } = require("@babel/types")
module.exports = {
  ")": (_, _1, value) => Symbol.for(value),
}
