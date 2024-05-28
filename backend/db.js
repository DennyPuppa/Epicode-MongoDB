const mongoose = require('mongoose');

const dbName = 'test';

const start = async () => {
    try {

        //connection string
        await mongoose.connect(process.env.MONGO_DB + dbName);
        console.log('Database connesso con successo');
        

    } catch (err) {
        console.error(err)
    }
}

module.exports = start;