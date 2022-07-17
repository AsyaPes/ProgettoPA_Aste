
import { User } from '../models/user-model';
import { Model, Sequelize, where } from 'sequelize';
import { getConstantValue, isJsxAttribute } from 'typescript';
import { Json } from 'sequelize/types/utils';

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
        res.json(arr);
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
export function checkUserExistance ( user_id: string, res: any): void {
    let result: any
    User.findByPk(user_id).then( arr => {
        result = 1;
    }).catch( error => {
       result = 0;
    })
    return result;
};

/**
 * Funzione checkToken  
 * 
 * Controlla che l'utente abbia token sufficienti per effettuare la puntata
 * 
 * @param user_id id dell'utente
 * @param bet puntata
 * @param res risposta da parte del sistema
 */
export function checkToken ( user_id: string, bet: number, res: any): void {
    let result: any
    User.findAll({where: {user_id: user_id}}).then( arr => {
        if ((arr[0].getDataValue("token"))>bet){
            result = 1;
            res.json(result)
        }
        else {
            result = 0
            res.send("error")
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
export function chargingAdmin ( user_id: string, token: number, res: any ): void{
    User.update({token: token}, {where: {user_id: user_id}}).then(arr => {
        res.json(arr);
    });
};

/**
 * Funzione showToken
 * 
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
 * Funzione checkRole
 * 
 * Controlla il ruolo di un utente
 * @param user_id id dell'utente
 * @param res risposta da parte del sistema
 * @returns 
 */
export function checkRole(user_id: string, res: any){
    let result
    User.findAll({where:{user_id:user_id}}).then(arr=>{
        const role=(arr[0].getDataValue("role"))
        const bip="bip_creator";
        const par="bip_partecipant";
        const admin="admin";
            if (role===par){
                result=0;
                res.json(role);
            }else if(role===bip){
                result=1;
                res.json(role);
            }else if(role==admin){
                result=2;
                res.json(role);
            }
    });
    return(result);
};
