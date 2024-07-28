const dbService = require('../config/dbConfig').getDbServiceInstant()
const connection = dbService.getConnection()

const selectAllUsers = async (req, res) => {

    const sql = 'SELECT * FROM `auth`';

    try {
        await new Promise((resolve, reject) => {

            connection.query(sql, (err, rows, fields) => {
                if (err instanceof Error) {
                    reject(err)
                } else {
                    resolve(res.status(200).json(rows))
                }
            })
        })
    } catch (error) {
        res.status(500).json({ error: error })
    }
}

const selectUserByUsername = async (req, res) => {

    const sql = 'SELECT * FROM `auth` WHERE `username` = ?';
    const values = [req.body.username];

    try {
        await new Promise((resolve, reject) => {

            connection.execute(sql, values, (err, rows, fields) => {
                if (err instanceof Error) {
                    reject(err)
                } else {
                    resolve(res.status(200).json(rows))
                }
            })
        })

    } catch (error) {
        res.status(500).json({ error: error })
    }
}

const insertUser = async (req, res) => {

    const sql = 'INSERT INTO `auth`(`username`, `password`) VALUES (?, ?)';
    const values = [req.body.username, req.body.password];

    try {
        await new Promise((resolve, reject) => {

            connection.execute(sql, values, (err, result, fields) => {
                if (err instanceof Error) {
                    reject(err)
                } else {
                    resolve(res.status(200).json(result))
                }
            });
        });

    } catch (error) {
        res.status(500).json({ error: error })
    }

}

const updateUserById = async (req, res) => {

    const sql = 'UPDATE `auth` SET `username` = ?, `password` = ? WHERE `userID` = ? LIMIT 1';
    const values = [req.body.username, req.body.password, req.body.userID];

    try {
        await new Promise((resolve, reject) => {

            connection.execute(sql, values, (err, result, fields) => {
                if (err instanceof Error) {
                    reject(err)
                } else {
                    resolve(res.status(200).json(result))
                }
            });
        });

    } catch (error) {
        res.status(500).json({ error: error })
    }
}

const deleteUserById = async (req, res) => {

    const sql = 'DELETE FROM `auth` WHERE `userID` = ? LIMIT 1';
    const values = [req.body.userID];

    try {
        await new Promise((resolve, reject) => {

            connection.execute(sql, values, (err, result, fields) => {
                if (err instanceof Error) {
                    reject(err)
                } else {
                    resolve(res.status(200).json(result))
                }
            });
        });
    } catch (error) {
        res.status(500).json({ error: error })
    }
}

module.exports = {
    selectAllUsers,
    selectUserByUsername,
    insertUser,
    updateUserById,
    deleteUserById
}