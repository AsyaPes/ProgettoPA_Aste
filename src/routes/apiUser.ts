import * as ServiceU from '../services/user-services';
import { Router } from 'express';
import * as middleware from '../auth/middleware';

const apiRouterUser = Router();
  
/***********************************************************************
                            USER
***********************************************************************/

apiRouterUser.get('/showALLUser', function(req: any, res: any) {    
    ServiceU.showALLUser( req, res);
});

apiRouterUser.get('/showONEUser', middleware.UserExistance , function(req: any, res: any) { 
    ServiceU.showONEUser( req.body.user_id, res);
});

apiRouterUser.get('/show-token', middleware.authjwt, middleware.UserExistance, middleware.partecipant, function(req:any,res:any){
    ServiceU.showToken(req.body.user_id,res);
});

apiRouterUser.get('/win', middleware.authjwt, middleware.UserExistance, middleware.partecipant, function(req: any, res: any) { 
    ServiceU.Win(req.body.user_id, req.body.datestart, req.body.datefinish, res);
});

apiRouterUser.get('/charging', middleware.authjwt, middleware.UserExistance, middleware.admin, function(req: any, res: any) { 
    ServiceU.chargingAdmin(req.body.user_id, req.body.token, res);
});

export default apiRouterUser;