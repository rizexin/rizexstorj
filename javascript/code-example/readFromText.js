import fs from 'fs'
import path from 'path'
import readline from 'readline'

//define __dirname to current directory
const __dirname = path.dirname(new URL(import.meta.url).pathname)

//define source file name
const sourceFile = 'textExample.txt'
//concatenate source path with source file name
const sourcePath = path.join(__dirname, sourceFile)

async function readFileLineByLine(sourcePath) {
  // create a read stream
  const readStream = fs.createReadStream(sourcePath)

  // create readline interface
  const rl = readline.createInterface({
    input: readStream,
    output: process.stdout,
    terminal: false
  })

  // read line by line
  rl.on('line', (line) => {
    const user = line.split('|')[0]
    const pass = line.split('|')[1]
    console.log(`user: ${user} pass: ${pass}`)
  })
}

// call function on async mode
;(async () => {
  await readFileLineByLine(sourcePath)
})()
