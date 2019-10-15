import * as http from "http";
import { readFile } from "fs";
import { resolve, relative } from "path";
import * as url from "url";

const server = http.createServer();
const publicDir = resolve(__dirname, 'public')
console.log('public', publicDir);


server.on('request', (request: http.IncomingMessage, response: http.ServerResponse) => {
    const { url: path } = request;
    const { setHeader } = response
    const { pathname } = url.parse(path);
    let filename = pathname.substr(1);
    if (filename === '') {
        filename = 'index.html'
    }
    readFile(resolve(publicDir, filename), (error, data) => {
        if (error) {
            console.log(error);
            if (error.errno === -4058) {
                response.statusCode = 404;
                response.end('404')
            }
        } else {
            response.end(data.toString());
        }

    })
})

server.listen(8888)