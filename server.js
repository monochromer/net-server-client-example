const net = require('net')
const { setInterval } = require('timers')
const { LDJClient } = require('./ldj-client')

const DEFAULT_PORT = 60300
const { PORT = DEFAULT_PORT } = process.env

net
  .createServer(async (connection) => {
    const intervalId = setInterval(() => {
      connection.write(JSON.stringify({
        type: 'message',
        timestamp: new Date(),
        payload: {}
      }) + LDJClient.DELIMITER)
    }, 3000)

    function close() {
      clearInterval(intervalId)
    }

    connection.on('end', () => {
      console.log('connection is end')
      close()
    })

    connection.on('close', () => {
      console.log('connection is closed')
      close()
    })
  })
  .listen(PORT, () => {
    console.log(`Listenning connection on port ${DEFAULT_PORT}`)
  })