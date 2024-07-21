const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const server = app.listen(process.env.EXPRESS_SERVER_PORT, process.env.EXPRESS_SERVER_HOST, () => {
    console.log(`Express server is listening\nHOST: ${server.address().address}\nPORT: ${server.address().port}\n`)
});

const dbConfig = require('./dbConfig')
const db = dbConfig.dbService.getDbServiceInstant()

db.selectAllUsers()
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.log(error);
    })

db.selectUserByUsername({ username: 'Rohan' })
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.log(error);
    })


db.insertUser({ username: 'Malee', password: 'test' })
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.log(error);
    })

db.updateUserById({ userID: 19, username: 'Avi', password: 'test3' })
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.log(error);
    })

db.deleteUserById({ userID: 21 })
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.log(error);
    })
