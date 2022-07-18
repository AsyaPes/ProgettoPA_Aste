import * as ServiceU from '../services/user-services'

export function checkUserExistence(req: any, res: any, next: any) : void {
    ServiceU.checkUser(req.body.user_id, res).then((check) => {
        if(check) next();
        //else next(ErrorEnum.UserNotFound);
    });
}


export function checkToken(req: any, res: any, next: any) : void {
    ServiceU.checkToken(req.body.user_id, req.body.bet, res).then((check) => {
        if(check) next();
        //else next(ErrorEnum.UserNotFound);
    });
}