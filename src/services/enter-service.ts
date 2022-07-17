import { User } from '../models/user-model';
import { Auction } from '../models/auction-model';
import { Enter } from '../models/enter-model'
import { Model, Sequelize, where } from 'sequelize';
import { Json } from 'sequelize/types/utils';
import { Singleton } from '../connection/Singleton';

export function bet ( user_id: string, auction_id: string, res: any): void {
    Enter.increment({n_rilanci: 1}, {where: {fkuser_id: user_id, fkauction_id: auction_id  }}).then(arr=>{
        res.json(arr);
    });
};

export function showNRilanci ( user_id: string, auction_id: string, res: any): void {
    Enter.findAll({attributes: ['n_rilanci'], where: {fkuser_id: user_id, fkauction_id: auction_id}}).then(arr=>{
        res.json(arr);
    });
};

export function betClose ( user_id: string, auction_id: string, bet: number, res: any): void {
    Enter.update({bet: bet}, {where: {fkuser_id: user_id, fkauction_id: auction_id  }}).then(arr=>{
        res.json(arr);
    });
};

export function betClose1 ( user_id: string, auction_id: string, bet: number, res: any): void {
    Enter.decrement({bet: bet}, {where: {fkuser_id: user_id, fkauction_id: auction_id  }}).then(arr=>{
        res.json(arr);
    });
};

export function showEnter ( user_id: string, auction_id: string, res: any): void {
    Enter.findAll({where: {fkuser_id: user_id, fkauction_id: auction_id  }}).then(arr=>{
        res.json(arr);
    });
}
