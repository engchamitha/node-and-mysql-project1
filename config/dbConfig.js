const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

let instance = null;

class dbService {

    constructor() {
        this.connection = mysql.createConnection({
            host: process.env.DATABASE_HOST,
            user: process.env.DATABASE_USERNAME,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE,
            port: process.env.DATABASE_PORT
        });

        this.connection.connect(err => {
            if (err) {
                console.log('Connection error:', err.sqlMessage);
            } else {
                console.log('Connected to MySQL database\n');
            }
        })
    }

    static getDbServiceInstant() {

        if(!instance){
            instance = new dbService();
        }

        return instance;
    };

    getConnection(){
        return this.connection
    }

}
module.exports = dbService

