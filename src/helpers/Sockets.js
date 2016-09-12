import Socket from "socket.io-client"

const socket = Socket.connect("http://localhost:3333")
  
socket.on("connect", function (data) {
  console.log("connected", data)
})

socket.on("global", function(data) {
  console.log("global", data)
})

socket.on("user_channel", function(data) {
  console.log("user_channel", data)
})