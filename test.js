const fs = require('fs');
const WebSocket = require('ws');
const wav = require('wav');

const FILE_PATH = './sample.wav'; // Change this to your actual file path
const WS_URL = 'wss://test.aiiot.center/connection'; // Your actual server

const ws = new WebSocket(WS_URL);

ws.on('open', () => {
  console.log('Connected to server');

  // Send start event to simulate Twilio
  ws.send(JSON.stringify({
    event: 'start',
    start: {
      streamSid: 'testStream',
      callSid: 'testCall',
    }
  }));

  // Stream audio file
  const reader = new wav.Reader();
  reader.on('format', function (format) {
    reader.on('data', function (chunk) {
      ws.send(JSON.stringify({
        event: 'media',
        streamSid: 'testStream',
        media: {
          payload: chunk.toString('base64')
        }
      }));
    });

    reader.on('end', () => {
      ws.send(JSON.stringify({
        event: 'stop',
        streamSid: 'testStream'
      }));
      console.log('Audio stream ended');
    });
  });

  fs.createReadStream(FILE_PATH).pipe(reader);
});

ws.on('message', (msg) => {
  console.log('Received from server:', msg);
});

ws.on('error', (err) => {
  console.error('WebSocket error:', err);
});

ws.on('close', () => {
  console.log('WebSocket closed');
});
