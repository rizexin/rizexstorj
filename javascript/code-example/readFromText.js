import fs from 'fs'
import path from 'path'
const __dirname = path.dirname(new URL(import.meta.url).pathname)

const sourceFile = 'textExample.txt'
const sourcePath = path.join(__dirname, sourceFile)

//stream to read from file and write to console using fs.createReadStream

;(async () => {
  fs.createReadStream(sourcePath).pipe(process.stdout)
})()
