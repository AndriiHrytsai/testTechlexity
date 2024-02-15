const swaggerUi = require("swagger-ui-express");
const express = require('express');
const path = require("path");
const bodyParser = require('body-parser');

const {header, middlewares} = require('./app/helpers/helper');
const router = require('./app/middlewares/router.handler');
const swaggerDocument = require("./swagger.json");

const app = express();


app.use(express.static(path.join(__dirname, 'public')));
app.use(header);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(middlewares.cors);

router.userAPI(app);

app.use(middlewares.notFound);
app.use(middlewares.error);

module.exports = app;
