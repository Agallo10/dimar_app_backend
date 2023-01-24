const express = require('express');
const dbConnection = require('./database/config');
require('dotenv').config();
const app = express();
const cors = require('cors');

app.use(express.json());
//dimar_user
//hvWkOonGm9yGqlpm

//Data base
dbConnection();

//CORS
app.use(cors());

app.use('/api/features', require('./routes/features'));
//app.use('/api/feature', require('./routes/feature'));

app.listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}!`));