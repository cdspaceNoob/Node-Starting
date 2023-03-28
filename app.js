const http = require('http');

// 요청이 들어올 떄마다 Node에 의해 createServer의 콜백 함수가 호출된다.
// createServer는 http.Server 객체를 반환한다.
const server = http.createServer((request, response) => {
    console.log(request.headers, request.url, request.method);
    process.exit();
});

// 첫 번째 인자로 포트 번호를 받는다. 두 번째 인자로는 서버가 실행되었을 때의 콜백 함수를 받는다.
server.listen(3000);