const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRoutes = require('./routes/userRoutes');
app.use('/api/auth', userRoutes);

const server = app.listen(process.env.EXPRESS_SERVER_PORT, process.env.EXPRESS_SERVER_HOST, () => {
    console.log(`Express server is listening\nHOST: ${server.address().address}\nPORT: ${server.address().port}\n`)
});

