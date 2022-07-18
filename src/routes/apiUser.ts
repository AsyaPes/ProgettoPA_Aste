import * as ServiceU from '../services/user-services';
import { Router } from 'express';
const apiRouterUser = Router();


/***********************************************************************
                            USER
***********************************************************************/
apiRouterUser.get('/showALLUser', function(req: any, res: any) {    
    ServiceU.showALLUser( req, res);
});

apiRouterUser.get('/showONEUser', function(req: any, res: any) { 
    ServiceU.showONEUser( req.body.user_id, res);
});

apiRouterUser.get('/show-token',function(req:any,res:any){
    ServiceU.showToken(req.body.user_id,res);
});


apiRouterUser.get('/checkRole', function(req: any, res: any) { 
    ServiceU.checkRole(req.body.user_id,res);
});

apiRouterUser.get('/win', function(req: any, res: any) { 
    ServiceU.checkWin(req.body.user_id, req.body.datestart, req.body.datefinish, res);
});

export default apiRouterUser;