'use strict'

const app = require('./app');
const http = require('http');
const keys = require('./keys');
const server = http.createServer(app);

server.listen(keys.port, (err, res)=>{
    if (err) {
        throw err;
    } else {
        console.log('Server running on port');
    }
});