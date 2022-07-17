import { User } from '../models/user-model';
import { Auction } from '../models/auction-model';
import { Model, Sequelize, where } from 'sequelize';
import { Json } from 'sequelize/types/utils';
import { Singleton } from '../connection/Singleton';

const sequelize: Sequelize = Singleton.getConnection();

export function showALLAuction(req: any, res: any) {
    Auction.findAll({}).then(arr=>{
        console.log(arr);
        res.json(arr);
    });
};

export function filterAuction(status:number,res:any):void{
    Auction.findAll({where:{status: status}}).then(arr=>{
        res.json(arr);
    });
};

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

export function closedAuction(user_id:string,res:any):void{
    User.findAll({where:{user_id: user_id}}).then(arr=>{
        Auction.findAll({where:{ status:1}}).then(arr2=>{
            res.json(arr2);
            });
    });
};

export function openAuction(user_id:string,res:any):void  {
    let rilanci: any;
     rilanci =  sequelize.query(
         "SELECT n_rilanci, auction_id FROM (auction JOIN enter ON auction.auction_id = enter.FKauction_id)JOIN user ON user.user_id=enter.FKUser_id WHERE status=1 AND user_id=$user_id",
         {bind: {user_id:user_id}}
       ).then(arr2=>{
         res.json(arr2);
     });
};


