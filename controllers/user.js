'use strict';

const { userModel } = require('../models');

const signUp = async (req, res) => {
    try {
        const { token } = req.body;
        const { jwtToken, jwtPayload } = await userModel.create(token);
        return res.json({ token: jwtToken, payload: jwtPayload });
    } catch (e) {
        return res.status(400).json({ message: e.message });
    }
};

const getUser = async (req, res) => {
    try {
        const { user } = req;
        const data = await userModel.get({ _id: user._id });
        return res.status(200).json(data);
    } catch (e) {
        return res.status(400).json({ message: e.message });
    }
};

const bypassLogin = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).json({ message: 'email is required!' });
        const token = await userModel.bypass(email);
        return res.status(200).json({ token });
    } catch (e) {
        return res.status(400).json({ message: e.message });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const { limit, skip } = req.query;
        const { _id } = req.user;
        const data = await userModel.getAll(_id, limit, skip);
        return res.status(200).json(data);
    } catch (e) {
        return res.status(400).json({ message: e.message });
    }
};

module.exports = {
    signUp,
    getUser,
    getAllUsers,
    bypassLogin,
};
