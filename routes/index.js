'use strict';

const user = require('./user');

module.exports = (app) => {
    user(app);
    app.get('/', async (req, res) => {
        return res.status(200).json({ health: 'Jhakkas!' });
    });
    console.log('route added');
};
