import { User } from '../models/user-model';
import { Auction } from '../models/auction-model';
import { Enter } from '../models/enter-model'
import { Model, Sequelize, where } from 'sequelize';
import { Json } from 'sequelize/types/utils';
import { Singleton } from '../connection/Singleton';

/**
 * Funzione bet
 * 
 * Questa funzione permette al giocatore di effettuare una puntata per una specifica Asta Aperta 
 * 
 * @param user_id id dell'utente
 * @param auction_id id dell'asta
 * @param res risposta da parte del sistema
 */
export function bet ( user_id: string, auction_id: string, res: any): void {
    Enter.increment({n_rilanci: 1}, {where: {fkuser_id: user_id, fkauction_id: auction_id  }}).then(arr=>{
        res.json(arr);
    });
};

/**
 * Funzione showNRilanci
 * 
 * Dato un utente, la funzione permette di visualizzare il numero totale dei rilanci effettuati 
 * in una specifica asta 
 *  
 * @param user_id id dell'utente
 * @param auction_id id dell'asta
 * @param res risposta da parte del sistema
 */
export function showNRilanci ( user_id: string, auction_id: string, res: any): void {
    Enter.findAll({attributes: ['n_rilanci'], where: {fkuser_id: user_id, fkauction_id: auction_id}}).then(arr=>{
        res.json(arr);
    });
};

/**
 * Funzione betClose
 * 
 * Permette al giocatore di effettuare una puntata per una specifica Asta in busta chiusa
 * 
 * @param user_id id dell'utente
 * @param auction_id id dell'asta
 * @param bet puntata
 * @param res risposta da parte del sistema
 */
export function betClose ( user_id: string, auction_id: string, bet: number, res: any): void {
    Enter.update({bet: bet}, {where: {fkuser_id: user_id, fkauction_id: auction_id  }}).then(arr=>{
        res.json(arr);
    });
};
