import * as express from 'express';
import StatusCodes from 'http-status-codes';
import { CustomError } from './shared/errors';
import { NextFunction, Request, Response } from 'express';
import logger from 'jet-logger';
import apiRouterUser from './routes/apiUser';
import apiRouterAuction from './routes/apiAuction';
import apiRouterEnter from './routes/apiEnter';
import * as ServiceE from './services/enter-service';
import * as Websocket from 'ws';

interface ExtWebSocket extends WebSocket {
    isAlive: boolean;
}
const app = express();

const server=require('http').createServer(app);


const wss:Websocket.Server = new Websocket.Server({server});

function createMessageServer(content:string,max=0):string {
    return JSON.stringify(new MessageServer(content,max));
}

function createMessageClient(bet=0,sender='NS'):string {
    return JSON.stringify(new MessageClient(bet));
}

export class MessageServer{
    constructor(
        public content:string,
        public max: number
    ){}
}

export class MessageClient{
    constructor(
        public bet: number
    ){}
}


wss.getUniqueID= function(){
    var user_id=["4p0KF0xkOi","2Zbo_lX4d5"]
    var MyUser = user_id[Math.floor(Math.random() * user_id.length)];
    return MyUser
}
setTimeout(async() => {

    let result=await ServiceE.GetWinner("7")
    console.log(result)
    
    ServiceE.SetWin((result as any).user_id, "7");
    //ServiceE.DecreaseToken((result as any).user_id,"7",(result as any).bet);

    wss.clients.forEach((client) =>
    {
        client.send(JSON.stringify({"WinnerName":(result as any).email,"Bet":(result as any).bet}));
    });
console.log("terminata");},20000);


wss.on('connection', function connection(ws, req) {
    ws.id = wss.getUniqueID();
            ws.on('message', (msg: any) => {
                const messageC = JSON.parse(msg) as MessageClient;
                const messageS = JSON.parse(msg) as MessageServer;

            ServiceE.SetBet(ws.id,"7",(messageC.bet));
            ws.send(createMessageClient(messageC.bet));
           

            });
        
            ws.send(createMessageServer('Benvenuto'));
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
