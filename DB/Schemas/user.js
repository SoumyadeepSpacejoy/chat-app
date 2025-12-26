'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;

const fields = {
    name: {
        type: Schema.Types.String,
        required: true,
        index: true,
    },
    email: {
        type: Schema.Types.String,
        required: true,
        index: true,
    },
    googleAuthId: {
        type: Schema.Types.String,
        required: true,
        index: true,
    },
    avatar: {
        type: Schema.Types.String,
        index: true,
    },
};

const modelSchema = new Schema(fields, { timestamps: true, versionKey: false });
module.exports = mongoose.model('User', modelSchema);
