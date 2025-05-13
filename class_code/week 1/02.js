import http from "node:http";

const server = http.createServer((req, res)=>{
    console.log(req.url)
    if (req.url == "/") {
        return res.end("Hello from veer")
    }
    else if (req.url == "/about") {
        return res.end("Hello from veer")
    }
    return res.end("Hello from veer")
});

server.listen(8000, ()=>{
    console.log("http://localhost:8000")
})