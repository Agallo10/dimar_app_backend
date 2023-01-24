const mongoose = require('mongoose');

const dbConnection = async () =>{

    try {

        await mongoose.set("strictQuery", false);
        await mongoose.connect(process.env.DB_CNN);
        console.log('Connected to Database');
    

    } catch (error) {
        console.log(error);
        throw new Error('Error connecting to Database')
    }
}

//const db = mongoose.connect(process.env.DB_);

module.exports = dbConnection
