'use strict';

const { user } = require('../controllers');
const { authMiddleware } = require('../middlewares');

module.exports = (app) => {
    app.post('/user/signUp', user.signUp);
    app.get('/user/details', authMiddleware.user, user.getUser);
    app.get('/user/getAll', authMiddleware.user, user.getAllUsers);
    app.post('/user/bypass', user.bypassLogin);
};
