
import { Enter } from '../models/enter-model';
import { Model, QueryTypes, Sequelize, where } from 'sequelize';
import { Singleton } from '../connection/Singleton';
const sequelize: Sequelize = Singleton.getConnection();

/** funzione SetWin
 * Permette di aggiornare il campo win al vincitore dell'asta
 * 
 * @param user_id 
 * @param auction_id 
 */
export function SetWin ( user_id: any, auction_id: string): void {
    Enter.update({win: 1}, {where: {fkuser_id: user_id, fkauction_id: auction_id  }}).then(arr=>{
   console.log("Ha vinto "+ user_id);
    });
};

/** Funzione SetBet
 * 
 * Permette di aggiornare il campo bet dopo l'offerta
 * 
 * @param user_id 
 * @param auction_id 
 * @param bet 
 */
export function SetBet ( user_id: string, auction_id: string, bet:number): void {
    Enter.update({bet: bet}, {where: {fkuser_id: user_id, fkauction_id: auction_id  }}).then(arr=>{
   console.log("Ha puntato "+ bet);
    });
};

/**Funzione GetWinner
 * 
 * Permette di trovare il partecipante che ha fatto la bet più elevata
 * 
 * @param auction_id 
 * @returns 
 */
export async function GetWinner( auction_id: string) {
    
    let result= await sequelize.query(
         "SELECT fkauction_id, email,enter.bet , user_id FROM enter JOIN user ON enter.fkuser_id=user.user_id WHERE fkauction_id="+auction_id,
         {raw:true,
         type:QueryTypes.SELECT}
    
     ) 
     const bets=result.map(item=>(item as any).bet)
     const max=Math.max(...bets)
     return result.filter(item=>(item as any).bet>=max)[0]
};

/**
 * Funzione Rilancio
 * 
 * Questa funzione permette al giocatore di effettuare una puntata per una specifica Asta Chiusa 
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
export function betClose ( user_id: string, auction_id: string, bet: any, res: any): void {
    Enter.update({bet: bet}, {where: {fkuser_id: user_id, fkauction_id: auction_id  }}).then(arr=>{
        Enter.findAll({attributes: ['bet'], where: {fkuser_id: user_id, fkauction_id: auction_id}}).then(arr=>{
            res.json(arr[0]);
            const betValue=arr[0].getDataValue("bet")
            const betHashed = this.betProvider.hashBet(
                betValue,
              );
    Enter.update({betHashed: betHashed}, {where: {fkuser_id: user_id, fkauction_id: auction_id  }})
        });
   
    });
};
