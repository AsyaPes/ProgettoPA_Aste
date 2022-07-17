import * as express from 'express';
import * as ServiceU from './services/user-services'
import * as ServiceA from './services/auction-service'
import * as ServiceE from './services/enter-service'
const app = express();

app.use(express.json());

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

/*********************************************************
 *                  AUCTION
 ************************************************************/

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
