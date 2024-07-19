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

const dbService = require('./dbService')