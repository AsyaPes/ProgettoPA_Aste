
import { User } from '../models/user-model';
import { Model, Sequelize, where } from 'sequelize';
import { getConstantValue, isJsxAttribute } from 'typescript';
import { Json } from 'sequelize/types/utils';

export const showALLUser = async(req: any, res: any) => {
    return User.findAll({}).then(arr=>{
        res.json(arr);
    });
};

export function showONEUser(user_id: any, res: any) {
    User.findAll({where:{user_id: user_id}}).then(arr=>{
        res.json(arr);
    });
};

export function checkUserExistance ( user_id: string, res: any): void {
    let result: any
    User.findByPk(user_id).then( arr => {
        result = 1;
    }).catch( error => {
       result = 0;
    })
    return result;
};

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