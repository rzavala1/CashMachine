const express = require('express');
const bodyParser = require('body-parser');

const swaggerUi = require('swagger-ui-express');

const config = require('../config.js');
const user = require('./components/user/network');
const account = require('./components/accounts/network');
const app = express();

app.use(bodyParser.json());

const swaggerDoc = require('./swagger.json');


// ROUTER
app.use('/api/user', user);
app.use('/api/account', account);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.listen(config.api.port, () => {
    console.log('Api escuchando en el puerto ', config.api.port);
});