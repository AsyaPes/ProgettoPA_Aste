import * as express from 'express';

import StatusCodes from 'http-status-codes';
//import 'express-async-errors';
import { CustomError } from './shared/errors';
import { NextFunction, Request, Response } from 'express';
import logger from 'jet-logger';

import apiRouterUser from './routes/apiUser';
import apiRouterAuction from './routes/apiAuction';
import apiRouterEnter from './routes/apiEnter';

logger.info(process.env.KEY);
const Websocket = require('ws');

const app = express();

const server=require('http').createServer(app);
//oppure const server=http.createServer(app)
//wss= new Websocket.Server({server});
const wss= new Websocket.Server({server:server});

wss.on('connection',function connection(ws){
    console.log("A new User connected!")
    ws.send("Welcome New Client!")

    ws.on("message",function incoming(message){
        console.log("received %s", message);
        ws.send("Got your message its:" + message);
    });
});

app.use(express.json());
app.use((err: Error | CustomError, _: Request, res: Response, __: NextFunction) => {
    logger.err(err, true);
    const status = (err instanceof CustomError ? err.HttpStatus : StatusCodes.BAD_REQUEST);
    return res.status(status).json({
        error: err.message,
    });
});

app.use('/api-user', apiRouterUser);
app.use('/api-auction', apiRouterAuction);

app.use('/api-enter',apiRouterEnter);

server.listen(8080 ,()=> console.log("Listening on port 8080"))


//app.listen(8080);
//export default app;
