const mongoose = require('mongoose');
const schemas = require('./Schemas');

const connect = async (uri) => {
    try {
        await mongoose.connect(uri);
        console.log('MongoDB connected... 🔥');
        return mongoose;
    } catch (e) {
        console.log('MongoDB error', e);
        return Promise.reject(new Error('Unable to connect DB'));
    }
};

const init = () => {
    console.log('Schemas loaded... 😴');
    return schemas;
};

module.exports = {
    connect,
    init,
};
