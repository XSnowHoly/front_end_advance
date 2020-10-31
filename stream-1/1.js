const fs = require('fs')
const stream = fs.createWriteStream('./big_file.txt')

for (let index = 0; index < 500000; index++) {
  stream.write(
    `这是第 ${index} 内容，后面一大段内容后面一大段内容后面一大段内容后面一大段内容后面一大段内容 \n`,
  )
}

stream.end()
console.log('done')
