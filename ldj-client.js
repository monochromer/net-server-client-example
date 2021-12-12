const { EventEmitter } = require('events')

// LDJ - line delimited json
class LDJClient extends EventEmitter {
  static DELIMITER = '\n'

  static connect(stream) {
    return new LDJClient(stream);
  }

  constructor(stream) {
    super()

    let buffer = ''

    stream.on('data', (data) => {
      // buffer += data
      // let boundary = buffer.indexOf(LDJClient.DELIMITER);
      // while (boundary !== -1) {
      //   const input = buffer.slice(0, boundary);
      //   buffer = buffer.slice(boundary + 1);
      //   try {
      //     const parsedData = JSON.parse(input)
      //     this.emit('message', parsedData);
      //   } catch (error) {
      //     console.error('Invalid JSON')
      //   }
      //   boundary = buffer.indexOf(LDJClient.DELIMITER);
      // }
      buffer += data
      const chunks = buffer.split(LDJClient.DELIMITER)
      buffer = chunks.pop()
      for (const chunk of chunks) {
        try {
          const parsedData = JSON.parse(chunk)
          this.emit('message', parsedData);
        } catch (error) {
          console.error('Invalid JSON')
        }
      }
    })
  }
}

module.exports = {
  LDJClient
}