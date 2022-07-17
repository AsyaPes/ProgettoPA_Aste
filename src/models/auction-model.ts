import { SequelizeSingleton } from "../singleton/sequelize";
import { DataTypes, Model, Sequelize } from 'sequelize';

/**
 * Instanziazione della connessione verso il RDBMS
 */
const sequelize: Sequelize = SequelizeSingleton.getConnection();
export const Auction = sequelize.define('auction', {
    auction_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    fkcreator_id: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    type: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    datetimestart: {
        type: DataTypes.JSON,
        allowNull: false,
    },
    datetimefinish: {
        type: DataTypes.JSON,
        allowNull: false
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    modelName: 'auction',
    timestamps: false,
    freezeTableName: true

});
