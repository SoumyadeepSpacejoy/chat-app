'use strict';

const { User } = models;
const config = require('../config');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(config.googleClientId);
const jwt = require('jsonwebtoken');

const create = async (token) => {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: config.googleClientId,
    });

    const payload = ticket.getPayload();
    const { email, name, picture, sub } = payload;

    let jwtPayload = null;

    let user = await User.findOne({ email }).lean();
    if (!user) {
        const newUser = await User.create({ email, name, googleAuthId: sub, avatar: picture });
        jwtPayload = { _id: newUser._id, email: newUser.email, avatar: newUser.avatar, name: newUser.name };
    } else {
        if (user.avatar !== picture) {
            user.avatar = picture;
            await User.Save();
        }
        jwtPayload = { _id: user._id, email: user.email, avatar: picture, name: user.name };
    }

    const jwtToken = jwt.sign(jwtPayload, config.jwtSecret, { expiresIn: '30d' });
    return { jwtToken, jwtPayload };
};

const decodeToken = async (token) => {
    return jwt.verify(token, config.jwtSecret);
};

const get = async (query) => {
    return User.findOne(query).lean();
};

const getAll = async (_id, limit, skip) => {
    return User.find({ _id: { $ne: _id } })
        .select('-googleAuthId')
        .skip(Number(skip))
        .limit(Number(limit))
        .lean();
};

const bypass = async (email) => {
    const user = await User.findOne({ email }).select('-googleAuthId').lean();
    if (!user) {
        return Promise.reject(new Error('no email found'));
    }

    return jwt.sign(user, config.jwtSecret, { expiresIn: '10d' });
};

module.exports = {
    create,
    decodeToken,
    get,
    getAll,
    bypass,
};
