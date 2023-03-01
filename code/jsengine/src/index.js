const getToken = require('./token');
const parse = require('./parse');

const run = require('./interpreter');

module.exports = {
    getToken,
    parse,
    run,
};