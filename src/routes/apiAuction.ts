import * as ServiceA from '../services/auction-service';
import { Router } from 'express';
import * as middleware from '../auth/middleware';

const apiRouterAuction= Router();
       
/*********************************************************
 *                      AUCTION
 ************************************************************/

 apiRouterAuction.post('/create-auction', middleware.authjwt, middleware.UserExistance, middleware.creator, function (req: any, res: any) {    
    ServiceA.createAuction(req.body.auction_id,req.body.title,req.body.fkcreator_id,req.body.type,req.body.datetimestart,req.body.datetimefinish,req.body.status,res);
 });

apiRouterAuction.get('/filter-auction', function(req:any,res:any){
    ServiceA.filterAuction(req.body.status,res);
});

apiRouterAuction.get('/show-all-auction', function(req: any, res: any) {    
    ServiceA.showALLAuction( req, res);
});

apiRouterAuction.get('/closed-auction', middleware.UserExistance, function(req:any,res:any){
    ServiceA.closedAuction(req.body.user_id ,res);
});

apiRouterAuction.get('/open-auction', middleware.UserExistance, function(req:any,res:any){
    ServiceA.openAuction(req.body.user_id ,res);
});

export default apiRouterAuction;