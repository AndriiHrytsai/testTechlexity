const mongoose = require("mongoose");
const { MongoClient, ServerApiVersion } = require('mongodb');

const http = require('http');
const app = require('./app');

require("dotenv").config();

mongoose.Promise = global.Promise;
const server = http.createServer(app);

const PORT = process.env.PORT || 3000;

const session = mongoose.connect(process.env.DB_HOST_REMOTE);
session.then((data) => {
    data.connections[0].name &&
    server.listen(PORT, () => {
        const { port, name } = data.connections[0];
        console.log(
            `Database connection successfully. DB name is "${name}" on port "${port}".`
        );
        console.log(`---- Server running on port [${PORT}] && Environment [${process.env.NODE_ENV}] ----`);
    });
}).catch((error) => {
    console.log("D/B connection Error: ", error);
})

module.exports = mongoose;
