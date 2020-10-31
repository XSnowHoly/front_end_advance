const { fstat } = require('fs')
const http = require('http')
const fs = require('fs')

const server = http.createServer()

server.on('request', (request, response) => {
  fs.readFile('./big_file.txt', (error, data) => {
    if (error) throw error
    response.end(data)
    console.log('done')
  })
})

server.listen(8888)
