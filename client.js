const net = require('net')
const { LDJClient } = require('./ldj-client')

const { PORT } = process.env

if (!PORT) {
  throw new Error('env variable `PORT` must be specified')
}

const netClient = net.connect({
  port: PORT
})

const ldjClient = LDJClient.connect(netClient)

ldjClient.on('message', (data) => {
  console.log('data: ', data)
})