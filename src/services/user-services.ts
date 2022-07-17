
import { User } from '../models/user-model';
import { Model, Sequelize, where } from 'sequelize';
import { getConstantValue, isJsxAttribute } from 'typescript';
import { Json } from 'sequelize/types/utils';

export const showALLUser = async(req: any, res: any) => {
    return User.findAll({}).then(arr=>{
        res.json(arr);
    });
};