import * as ServiceE from '../services/enter-service';
import { Router } from 'express';
import * as middleware from '../auth/middleware';


const apiRouterEnter= Router();

/*********************************************************
 *                  ENTER
 ************************************************************/

 apiRouterEnter.post('/bet', middleware.authjwt, middleware.Existance, middleware.partecipant, middleware.check, function(req: any, res: any) {    
    ServiceE.bet(req.body.user_id, req.body.auction_id, res);
});

apiRouterEnter.get('/show-rilanci', function(req: any, res: any) {    
    ServiceE.showNRilanci(req.body.user_id, req.body.auction_id, res);
});

apiRouterEnter.post('/bet-close', middleware.Existance, middleware.partecipant, middleware.check,function(req: any, res: any) {    
    ServiceE.betClose(req.body.user_id, req.body.auction_id, req.body.bet, res);
});

export default apiRouterEnter;