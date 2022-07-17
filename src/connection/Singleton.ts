require('dotenv').config();
import { Sequelize } from 'sequelize';

/**
 * Classe 'SequelizeSingleton'
 * 
 * Classe che si occupa di assicurare la presenza di una singola istanza di un oggetto durante il 
 * ciclo di vita del servizio. L'oggetto è utilizzato per costruire la connessione al database
 * attraverso la libreria {@link Sequelize}.
 */
export class SequelizeSingleton {
	
    private static instance: SequelizeSingleton;
	private connection: Sequelize;

    private constructor() {
		this.connection = new Sequelize("AuctionDB", "user", "root", {
			host: "dbmysql",
			port: 3306,
			dialect: 'mysql'
		});
	}

	public static getConnection(): Sequelize {
        if (!SequelizeSingleton.instance) {
            this.instance = new SequelizeSingleton();
        }
        return SequelizeSingleton.instance.connection;
    }
}