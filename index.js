'use strict'

const app = require('./app');
const http = require('http');
const keys = require('./keys');
const server = http.createServer(app);

server.listen(process.env.PORT || keys.port, (err) => {
    if (err) {
        throw err;
    } else {
        console.log('Server running on port: ' + keys.port);
        require('./database/connection');
    }
});