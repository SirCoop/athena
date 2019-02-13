import path from 'path';

module.exports = {
    express: {
        port: process.env.port || 3000,
    },
    mongodb_uri: process.env.MONGODB_URI || 'mongodb://localhost/athena',
    webapp: {
        dist: path.join(__dirname, './dist'),
        dev: path.join(__dirname, 'client/src'),
        // testimonies: path.join(__dirname, './assets/testimonies'),
        // writings: path.join(__dirname, './assets/writings')
    }
};