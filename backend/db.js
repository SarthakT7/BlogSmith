const mongoose = require('mongoose');

const connection = () => {
    const connectionParams = {
        useNewURLParser: true,
        useUnifiedTopology: true,
    };

    try{
        mongoose.connect(process.env.DB, connectionParams);
        console.log('Connected to MongoDB');
    }
    catch(err) {
        console.log('Failed to connect to MongoDB');
    }
}

module.exports = connection;