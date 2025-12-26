const mongoose = require('mongoose');
const { Schema } = mongoose;

const fields = {
    status: {
        type: Schema.Types.String,
        enum: ['requested', 'accepted', 'blocked'],
        default: 'requested',
        index: true,
    },
    requestedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        index: true,
    },
    requestedTo: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        index: true,
    },
};

const modelSchema = new Schema(fields, { timestamps: true, versionKey: false });
module.exports = mongoose.model('Conversation', modelSchema);
