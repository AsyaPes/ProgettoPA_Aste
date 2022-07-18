import * as ServiceU from '../services/user-services';
import { Router } from 'express';
import authJwt from '../auth/auth-jwt';
const apiRouterUser = Router();

apiRouterUser.use(authJwt.checkHeader);                
apiRouterUser.use(authJwt.checkPayloadHeader); 
apiRouterUser.use(authJwt.checkToken);                     
apiRouterUser.use(authJwt.verifyKey);                      
apiRouterUser.use(authJwt.logErrors);                      
apiRouterUser.use(authJwt.errorHandler);  

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
    ServiceU.Win(req.body.user_id, req.body.datestart, req.body.datefinish, res);
});

export default apiRouterUser;