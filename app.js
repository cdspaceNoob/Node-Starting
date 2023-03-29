const http = require('http');
const fs = require('fs');

// 요청이 들어올 떄마다 Node에 의해 createServer의 콜백 함수가 호출된다.
// createServer는 http.Server 객체를 반환한다.
const server = http.createServer((request, response) => {
    const url = request.url;
    if (url === '/') {
        response.write('<html>');
        response.write('<head><title>My First Page</title></head>');
        response.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">send</button></form></body>');
        response.write('</html>');
        return response.end();
    }
    if (url === '/message' && request.method === 'POST') {
        const body = [];
        // 들어오는 모든 data에 대해 실행할 함수를 정의.
        request.on("data", chunk => {
            console.log(chunk);
            body.push(chunk);
        });
        request.on("end", () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split("=")[1];
            const name = parsedBody.split("=")[0];
            console.log(message);
            console.log(name);
            fs.writeFileSync("message.txt", message);
        })

        response.statusCode = 302;
        response.setHeader('Location', '/');
        return response.end();
    }
    response.setHeader('Content-Type', 'text/html');
    response.setHeader('charset', 'utf-8');
});

server.listen(3000);