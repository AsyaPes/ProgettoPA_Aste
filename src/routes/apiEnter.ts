import * as ServiceE from '../services/enter-service';
import { Router } from 'express';
import authJwt from '../auth/auth-jwt';


const apiRouterEnter= Router();

apiRouterEnter.use(authJwt.checkHeader);                
apiRouterEnter.use(authJwt.checkPayloadHeader); 
apiRouterEnter.use(authJwt.checkToken);                     
apiRouterEnter.use(authJwt.verifyKey);                      
apiRouterEnter.use(authJwt.logErrors);                      
apiRouterEnter.use(authJwt.errorHandler);  

/*********************************************************
 *                  ENTER
 ************************************************************/

 apiRouterEnter.get('/bet', function(req: any, res: any) {    
    ServiceE.bet(req.body.user_id, req.body.auction_id, res);
});

apiRouterEnter.get('/show-rilanci', function(req: any, res: any) {    
    ServiceE.showNRilanci(req.body.user_id, req.body.auction_id, res);
});

apiRouterEnter.post('/bet-close', function(req: any, res: any) {    
    ServiceE.betClose(req.body.user_id, req.body.auction_id, req.body.bet, res);
});

export default apiRouterEnter;