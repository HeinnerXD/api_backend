'use strict'

const mongoose = require('mongoose');
const keys = require('../keys');
mongoose.set('useFindAndModify', false);

mongoose.connect(keys.mongo_connection, { useNewUrlParser: true }).then(db => console.log('Connected to database: '+db.connection.db.s.databaseName)).catch(err => console.log(err));