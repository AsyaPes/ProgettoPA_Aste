import { User } from '../models/user-model';
import { Auction } from '../models/auction-model';
import { Model, Sequelize, where } from 'sequelize';
import { Json } from 'sequelize/types/utils';
import { Singleton } from '../connection/Singleton';

const sequelize: Sequelize = Singleton.getConnection();

/**
 * Funzione showALLAuction
 * 
 * Permette di mostrare tutte le aste 
 * 
 * @param req 
 * @param res 
 */
export function showALLAuction(req: any, res: any) {
    Auction.findAll({}).then(arr=>{
        console.log(arr);
        res.json(arr);
    });
};

/**
 * Funzione filterAuction
 * 
 * Mostra le aste filtrandole per il loro stato (terminate, attuali, future)
 * 
 * @param status stato dell'asta
 * @param res risposta da parte del sistema
 */
export function filterAuction(status: number, res: any): void{
    Auction.findAll({where: {status: status}}).then(arr=>{
        res.json(arr);
    });
};

/**
 * Funzione checkAuctionType
 * 
 * Controlla il tipo di asta (Asta aperta, Asta in busta chiusa e pagamento del prezzo più alto,
 * Asta in busta chiusa e pagamento del secondo prezzo più alto)
 * 
 * @param auction_id id dell'asta
 * @param res risposta da parte del sistema
 * @returns 
 */
export function checkAuctionType ( auction_id: string, res: any): void {
    let type: any
    Auction.findAll({where: {auction_id: auction_id}}).then(arr => {
        if (arr[0].getDataValue("type")==1) {
            type = 1
            res.json(type);
        }
        else if(arr[0].getDataValue("type")==2) {
            type = 2;
            res.json(type);
        }
        else if((arr[0].getDataValue("type"))==3){
            type=3;
            res.json(type);

        }
    });
    return type;
};

/**
 * Funzione closedAuction
 * 
 * Dato un utente, visualizza lo storico delle aste cui ha partecipato
 * 
 * @param user_id id dell'utente
 * @param res risposta da parte del sistema
 */
export function closedAuction(user_id: string, res: any):void{
    User.findAll({where:{user_id: user_id}}).then(arr=>{
        Auction.findAll({where:{ status:1}}).then(arr2=>{
            res.json(arr2);
            });
    });
};

/**
 * Funzione openAuction
 * 
 * Dato un utente restituisce la lista delle aste attuali con il relativo numero di rilanci
 * 
 * @param user_id  id dell'utente
 * @param res risposta da parte del sistema
 */
export function openAuction(user_id:string,res:any):void  {
    let rilanci: any;
     rilanci =  sequelize.query(
         "SELECT n_rilanci, auction_id FROM (auction JOIN enter ON auction.auction_id = enter.FKauction_id)JOIN user ON user.user_id=enter.FKUser_id WHERE status=1 AND user_id=$user_id",
         {bind: {user_id:user_id}}
       ).then(arr2=>{
         res.json(arr2);
     });
};


