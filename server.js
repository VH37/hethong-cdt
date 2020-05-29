const path = require('path')

const http = require('http')

const express = require('express')

const socketio = require('socket.io')

const app = express()

const server = http.createServer(app)

const io = socketio(server)

app.use(express.static(path.join(__dirname, 'public')))

app.get('/connect', function (req, res) {
  res.send('hello world')
})




const PORT = 3000 || process.env.PORT

server.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`))

const SerialPort = require('serialport')

SerialPort.list().then(ports => {
  ports.forEach(function(port) {
    console.log(port.path);
    console.log(port.pnpId);
    console.log(port.manufacturer);
  });
});

const Readline = SerialPort.parsers.Readline
const arPort = new SerialPort('COM6', 9600)

const StringDecoder = require('string_decoder').StringDecoder

const decoder = new StringDecoder('utf8')

io.on('connection', (socket) => {
  // Listen for chatMessage
  socket.on('clicked', (msg) => {
    console.log(msg)
  })

  socket.on('dataSend', (msg) => {
    arPort.write(msg, function(err) {
      console.log(err)
    })
  })
})

const parser = arPort.on('data', function (data) {
  let textChunk = decoder.write(data)
  if (textChunk === 's') {
    io.emit('data', { type: 's', quantity: 1 })
  } else if (textChunk === 'm') {
    io.emit('data', { type: 'm', quantity: 1 })
  } else if (textChunk === 't') {
    io.emit('data', { type: 't', quantity: 1 })
  }
})

