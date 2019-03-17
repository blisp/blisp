const { readFileSync } = require("fs")
const { join } = require("path")
const { execSync } = require("child_process")

//
;(async () => {
  const wat = join(__dirname, "main.wat")
  const wasm = join(__dirname, "main.wasm")
  try {
    execSync(`/usr/local/bin/wat2wasm ${wat} -o ${wasm}`)
  } catch (error) {
    console.error(error)
    return
  }
  const data = readFileSync(join(__dirname, "main.wasm"))
  console.log(data)
  const results = await WebAssembly.instantiate(data)
  console.log(results)
  console.log(results.instance.exports.main(3))
  console.log(new Uint8Array(results.instance.exports.memory.buffer, 8, 20))
})()
