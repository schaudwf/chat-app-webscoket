const http = require("http");
const express = require("express");

const {Server} = require("socket.io");

const path = require("path")

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const replicaApp = process.env.APP_NAME
 
//Socket IO
io.on("connection", (socket) =>{
   socket.on("User-message", (message)=>{
    io.emit("message",message);
   })

})

app.use(express.static(path.resolve("index.html")));

app.get("/", (req,res)=>{
    return res.sendFile(path.join(__dirname, 'index.html'));
    console.log(`Request Served by ${replicaApp}`);
})

server.listen(3000, ()=>{
    console.log(`${replicaApp} Server started at 3000`);
});