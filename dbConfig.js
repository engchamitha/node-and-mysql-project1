const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

const connection = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DATABASE_PORT
});

connection.connect(err => {
    if (err) {
        console.log('Connection error:', err.sqlMessage);
    } else {
        console.log('Connected to MySQL database\n');
    }
})

let instance = null;
class dbService {
    static getDbServiceInstant() {
        return instance ? instance : new dbService();
    };

    async selectAllUsers() {
        const sql = 'SELECT * FROM `auth`';

        return await new Promise((resolve, reject) => {
            connection.query(sql, (err, rows, fields) => {
                if (err instanceof Error) {
                    reject(err)
                } else {
                    resolve({ rows: rows, fields: fields })
                }
            })
        })
    }

    async selectUserByUsername(input) {
        const sql = 'SELECT * FROM `auth` WHERE `username` = ?';
        const values = [input.username];

        return await new Promise((resolve, reject) => {
            connection.execute(sql, values, (err, rows, fields) => {
                if (err instanceof Error) {
                    reject(err)
                } else {
                    resolve({ rows: rows, fields: fields })
                }
            });
        });
    }

    async insertUser(input) {
        const sql = 'INSERT INTO `auth`(`username`, `password`) VALUES (?, ?)';
        const values = [input.username, input.password];

        return await new Promise((resolve, reject) => {

            connection.execute(sql, values, (err, result, fields) => {
                if (err instanceof Error) {
                    reject(err)
                } else {
                    resolve({ result: result, fields: fields })
                }
            });
        });
    }

    async updateUserById(input) {

        const sql = 'UPDATE `auth` SET `username` = ?, `password` = ? WHERE `userID` = ? LIMIT 1';
        const values = [input.username, input.password, input.userID];

        return await new Promise((resolve, reject) => {

            connection.execute(sql, values, (err, result, fields) => {
                if (err instanceof Error) {
                    reject(err)
                } else {
                    resolve({ result: result, fields: fields })
                }
            });
        });
    }

    async deleteUserById(input) {

        const sql = 'DELETE FROM `auth` WHERE `userID` = ? LIMIT 1';
        const values = [input.userID];

        return await new Promise((resolve, reject) => {

            connection.execute(sql, values, (err, result, fields) => {
                if (err instanceof Error) {
                    reject(err)
                } else {
                    resolve({ result: result, fields: fields })
                }
            });
        });
    }
}
module.exports = { dbService }