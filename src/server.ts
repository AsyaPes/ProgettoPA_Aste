import * as express from 'express';
import * as ServiceU from './services/user-services';
import * as ServiceA from './services/auction-service';
import * as ServiceE from './services/enter-service';
import StatusCodes from 'http-status-codes';
//import 'express-async-errors';
import { CustomError } from './shared/errors';
import { NextFunction, Request, Response } from 'express';
import logger from 'jet-logger';
import { ParamMissingError } from './shared/errors';

const app = express();

app.use(express.json());
app.use((err: Error | CustomError, _: Request, res: Response, __: NextFunction) => {
    logger.err(err, true);
    const status = (err instanceof CustomError ? err.HttpStatus : StatusCodes.BAD_REQUEST);
    return res.status(status).json({
        error: err.message,
    });
});

/***********************************************************************
                            USER
***********************************************************************/
app.get('/showALLUser', function(req: any, res: any) {    
    ServiceU.showALLUser( req, res);
});

app.get('/showONEUser', function(req: any, res: any) { 
    ServiceU.showONEUser( req.body.user_id, res);
});

app.get('/show-token',function(req:any,res:any){
    ServiceU.showToken(req.body.user_id,res);
});


app.get('/checkRole', function(req: any, res: any) { 
    ServiceU.checkRole(req.body.user_id,res);
});

app.get('/win', function(req: any, res: any) { 
    ServiceU.checkWin(req.body.user_id, req.body.datestart, req.body.datefinish, res);
});

/*********************************************************
 *                      AUCTION
 ************************************************************/
 app.post('/create-auction',function (req: any, res: any) {    
    ServiceA.createAuction(req.body.auction_id,req.body.title,req.body.fkcreator_id,req.body.type,req.body.datetimestart,req.body.datetimefinish,req.body.status,res);
 });

app.get('/filter-auction',function(req:any,res:any){
    ServiceA.filterAuction(req.body.status,res);
});

app.get('/show-all-auction', function(req: any, res: any) {    
    ServiceA.showALLAuction( req, res);
});

app.get('/check-type', function(req: any, res: any) { 
    ServiceA.checkAuctionType(req.body.auction_id,res);
});

app.get('/closed-auction',function(req:any,res:any){
    ServiceA.closedAuction(req.body.user_id ,res);
});

app.get('/open-auction',function(req:any,res:any){
    ServiceA.openAuction(req.body.user_id ,res);
});

/*********************************************************
 *                  ENTER
 ************************************************************/

app.get('/bet', function(req: any, res: any) {    
    ServiceE.bet(req.body.user_id, req.body.auction_id, res);
});

app.get('/show-rilanci', function(req: any, res: any) {    
    ServiceE.showNRilanci(req.body.user_id, req.body.auction_id, res);
});

app.post('/bet-close', function(req: any, res: any) {    
    ServiceE.betClose(req.body.user_id, req.body.auction_id, req.body.bet, res);
});

app.listen(8080);
//export default app;
