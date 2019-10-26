'use strict'


const mongoose = require('mongoose');
const keys = require('../keys');

mongoose.Promise= global.Promise;
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set( 'useUnifiedTopology', true);

mongoose.connect(keys.mongo_connection, { useNewUrlParser: true }).then(db => console.log('Connected to database: ' + db.connection.db.databaseName)).catch(err => console.log(err));
