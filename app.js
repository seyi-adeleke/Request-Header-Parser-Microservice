const express = require('express');
const http = require('http');
const logger = require('morgan');
const bodyParser = require('body-parser');
const agent = require('useragent');
const platform = require('platform');


const app = express();

const port = parseInt(process.env.PORT, 10) || 3000;
app.set('port', port);

app.use(logger('dev'));

app.get('/', (req, res) => res.status(200).send({
    message: 'Welcome to Request Header Parser Microservice'
}));

app.get('/api/whoami', (req, res) => {
    const language = req.headers["accept-language"].split(',')[0];
    const client = agent.parse(req.headers['user-agent']);
    const ipaddress = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
    res.status(200).send({
        ipaddress,
        language,
        browser: client.toAgent(),
        software: client.os.toString()
    })
});


app.use('*', (req, res) => {
    res.status(404).send({
        message: "nothings here"
    })
});


const server = http.createServer(app);
server.listen(port);

module.exports = app;