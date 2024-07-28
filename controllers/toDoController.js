const dbService = require('../config/dbConfig').getDbServiceInstant()
const connection = dbService.getConnection()

const selectAllToDo = async (req, res) => {

    const sql = 'SELECT * FROM `todo`';

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

const selectToDoById = async (req, res) => {

    const sql = 'SELECT * FROM `todo` WHERE `todoid` = ?'
    const values = [req.body.todoid];

    try {
        await new Promise((resolve, reject) => {

            connection.execute(sql, values, (err, rows, fields) => {
                if (err instanceof Error) {
                    reject(err)
                } else {
                    resolve(res.status(200).json(rows))
                }
            });
        })
    } catch (error) {
        res.status(500).json({ error: error })
    }
}

const insertToDo = async (req, res) => {

    const sql = 'INSERT INTO `todo`(`title`, `description`, `status`) VALUES (?, ?, ?)';
    const values = [req.body.title, req.body.description, req.body.status];

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


const updateToDoById = async (req, res) => {

    const sql = 'UPDATE `todo` SET `title` = ?, `description` = ?, `status` = ?  WHERE `todoid` = ? LIMIT 1';
    const values = [req.body.title, req.body.description, req.body.status, req.body.todoid];

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


const deleteToDoById = async (req, res) => {

    const sql = 'DELETE FROM `todo` WHERE `todoid` = ? LIMIT 1';
    const values = [req.body.todoid];

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
    selectAllToDo,
    selectToDoById,
    insertToDo,
    updateToDoById,
    deleteToDoById
}