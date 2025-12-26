'use strict';

const { Conversation } = models;

const create = async (data) => {
    return Conversation.create(data);
};

const get = async (query) => {
    return Conversation.findOne(query);
};

module.exports = {
    create,
    get,
};
