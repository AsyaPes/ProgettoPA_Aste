
import { User } from '../models/user-model';
import { Sequelize } from 'sequelize';
import { UserNotFoundError } from '../shared/errors';
import { Singleton } from "../connection/Singleton";
import { SuccessEnum, getObj } from '../factory/Success';

const sequelize: Sequelize = Singleton.getConnection();
/**
 * Funzione DecreaseToken
 * 
 * Aggiorna ill wallet dell'utente
 */
export  function DecreaseToken ( user_id: any, auction_id:any, bet:any ) : void{
    User.decrement({token: bet}, {where: {fkuser_id: user_id, fkauction_id: auction_id  }}).then(arr=>{
        console.log("Ha puntato "+ bet);
         });
};

/**
 * Funzione showALLUser
 * 
 * Restituisce l'elenco di tutti gli utenti
 */
export const showALLUser = async(req: any, res: any) => {
    return User.findAll({}).then(arr=>{
        res.json(arr);
    });
};

/**
 * Funzione showONEUser
 * 
 * L'utente può visualizzare i suoi dati
 * 
 * @param user_id id dell'utente
 * @param res risposta da parte del sistema
 */
export function showONEUser(user_id: any, res: any) {
    User.findAll({where:{user_id: user_id}}).then(arr=>{
        if(!(arr.length === 0)){
            res.json(arr);
        }
        else {
            throw new UserNotFoundError();
        }
    });
};


/**
 * Funzione chargingAdmin
 * 
 * Consente di ricaricare il credito di un utenda da parte dell'utente Admin
 * 
 * @param user_id id dell'utente
 * @param token quantità di token da ricaricare
 * @param res risposta da parte del sistema
 */
export function chargingAdmin ( user_id: string, user: string, token: number, res: any ): void{
    User.increment({token: token}, {where: {user_id: user}}).then(arr => {
        const succ = getObj(SuccessEnum.chargingAdmin).getObj();
        res.json({"Effettuata ricarica di token": token});
    });
};

/**
 * Funzione showToken
 * s
 * Permetto all'utente di visualizzare il proprio portafoglio
 * 
 * @param user_id id dell'utente
 * @param res risposta da parte del sistema
 */
export function showToken(user_id:string,res:any){
    User.findAll( {attributes: ['token'],
       where: {user_id: user_id}}).then(arr=>{
                   res.json(arr);
    });
};

/**
 * Funzione Win
 * 
 * Mostra le aste vinte e/o perse di uno specifico user entro un range temporale
 * 
 * @param user_id id dell'utente
 * @param datestart data di inizio
 * @param datefinish data di fine
 * @param res risposta da parte del sistema
 */
export function Win (user_id: string,  datestart: Date, datefinish:Date, res: any): void {
    let ar=[]
        let r: any;
        let l: any;
         r =  sequelize.query(
             "SELECT win, datetimestart,datetimefinish, FKAuction_id FROM (auction JOIN enter ON auction.auction_id = enter.FKauction_id)JOIN user ON user.user_id=enter.FKUser_id WHERE datetimestart>$datestart AND datetimefinish<$datefinish AND user_id=$user_id AND win=1 AND status=1",
             {bind: {user_id:user_id, datestart:datestart, datefinish:datefinish}
            }
           ).then(arr2=>{
            ar[0]={"Aste vinte": arr2}
           });

            l =  sequelize.query(
                "SELECT win, datetimestart,datetimefinish, FKAuction_id FROM (auction JOIN enter ON auction.auction_id = enter.FKauction_id)JOIN user ON user.user_id=enter.FKUser_id WHERE datetimestart>$datestart AND datetimefinish<$datefinish AND user_id=$user_id AND win=0 AND status=1",
                {bind: {user_id:user_id, datestart:datestart, datefinish:datefinish}}
              ).then(arr1=>{
            ar[1]={"Aste perse": arr1}
             res.json(ar);
         
 });
};

/**
 * Funzione WinNOData
 * 
 * Mostra le aste vinte e/o perse relativo a uno'utente
 * 
 * @param user_id id dell'utente
 * @param res risposta da parte del sistema
 */
export function WinNOData (user_id: string, res: any): void {
    let ar=[]
        let r: any;
        let l: any;
        r =  sequelize.query(
             "SELECT win, FKAuction_id FROM (auction JOIN enter ON auction.auction_id = enter.FKauction_id)JOIN user ON user.user_id=enter.FKUser_id WHERE user_id=$user_id AND win=1 AND status=1",
             {bind: {user_id:user_id}
            }
           ).then(arr2=>{
            ar[0]={"Aste vinte": arr2}
           });

        l =  sequelize.query(
            "SELECT win, FKAuction_id FROM (auction JOIN enter ON auction.auction_id = enter.FKauction_id)JOIN user ON user.user_id=enter.FKUser_id WHERE user_id=$user_id AND win=0 AND status=1",
            {bind: {user_id:user_id}}
            ).then(arr1=>{
        ar[1]={"Aste perse": arr1}
            res.json(ar);
        
 });
};

/**
 * Funzione checkUserExistance
 * 
 * Permette di verificare l'esistenza di un utente a partire dal suo id
 * 
 * @param user_id id dell'utente
 * @param res risposta da parte del sistema
 * @returns 
 */
 export async function checkUser ( user_id: string, res: any): Promise<boolean> {
    let result: any
    await User.findByPk(user_id).then( arr => {
    result= arr
    })
    return result;
}

export async function checkCrator ( fkcreator_id: string, res: any): Promise<boolean> {
    let result: any
    await User.findAll({attributes: ["user_id"], where: {user_id: fkcreator_id}}).then( arr => {
    result= arr
    })
    return result;
}
/**
 * Funzione checkToken  
 * 
 * Controlla che l'utente abbia token sufficienti per effettuare la puntata
 * 
 * @param user_id id dell'utente
 * @param bet puntata
 * @param res risposta da parte del sistema
 */
export async function checkToken ( user_id: string, bet: number, res: any): Promise<boolean> {
    let result: any
    await User.findAll({where: {user_id: user_id}}).then( arr => {
        if ((arr[0].getDataValue("token"))>bet){
            result=true;
        }
        else {
            result = false;
        }
    });
    return result;
};


/**
 * Funzione checkRole
 * 
 * Controlla il ruolo di un utente
 * @param user_id id dell'utente
 * @param res risposta da parte del sistema
 * @returns 
 */
 export async function checkRole(user_id: string, res: any): Promise<number>{
    let result
    await User.findAll({where:{user_id:user_id}}).then(arr=>{
        const role=(arr[0].getDataValue("role"))
        const bip="bip_creator";
        const par="bip_partecipant";
        const admin="admin";
            if (role===par){
                result=0;
            }else if(role===bip){
                result=1;
            }else if(role==admin){
                result=2;
            }
    });
    return result;
};

/**
 * Funzione checkRole2
 * 
 * Funzione utilizzata per controllare il ruolo del fkcreator, ovvero l' utente 
 * che vuole creare una nuova asta
 *  
 * @param fkcreator_id id del creator 
 * @param res risposta da parte dell'utente
 * @returns 
 */
export async function checkRole2(fkcreator_id: string, res: any): Promise<number>{
    let result
    await User.findAll({where:{user_id:fkcreator_id}}).then(arr=>{
        const role=(arr[0].getDataValue("role"))
        const bip="bip_creator";
        const par="bip_partecipant";
        const admin="admin";
            if (role===par){
                result=0;
            }else if(role===bip){
                result=1;
            }else if(role==admin){
                result=2;
            }
    });
    return result;
};
