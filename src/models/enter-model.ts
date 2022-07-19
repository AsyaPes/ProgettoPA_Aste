import { Singleton } from "../connection/Singleton";
import { DataTypes, Model, Sequelize } from 'sequelize';

/**
 * Instanziazione della connessione verso il RDBMS
 */
const sequelize: Sequelize = Singleton.getConnection();
export const Enter = sequelize.define('enter', {
    enter_id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    min_price:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    quote:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    bet: {
        type: DataTypes.INTEGER
    },
    n_rilanci:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    win:{
        type: DataTypes.NUMBER,
        allowNull: false
    },
    betHashed:{
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
}, {
    modelName: 'enter',
    timestamps: false,
    freezeTableName: true
});
