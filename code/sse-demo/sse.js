const http = require('http')
const fs = require('fs')

// Create a server
const server = http.createServer()

// 监听路由
server.on('request', (req, res) => {
    console.log('request', req.url)
    if (req.url === '/sse') {
        // Set CORS headers
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

        // Set SSE headers
        res.setHeader('Content-Type', 'text/event-stream')
        res.setHeader('Cache-Control', 'no-cache')

        // Send a ping approx every 2 seconds
        res.write("retry: 10000\n\n");
        res.write("event: connecttime\n\n");
        res.write("data: " + (new Date()) + "\n");
        res.write("data: " + (new Date()) + "\n\n");

        // 模拟收到消息推送给客户端
        interval = setInterval(function () {
            res.write("data: " + (new Date()) + "\n\n");
        }, 5000);
    }
    if (req.url === '/index.html' || req.url === '/') {
        // 如果是html文件，返回html文件
        res.setHeader('Content-Type', 'text/html')
        const html = fs.readFileSync('./public/index.html');
        res.end(html)
    }
})

// Listen
server.listen(3000, () => {
    console.log('Server started on port 3000')
})