const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(`${__dirname}/db.sqlite3`);

const auth = require('./auth');
const state = require('./statuses');
const user = require('./user');

module.exports = {
    user: {
        get: (userId) => {
            return new Promise((resolve, reject) => {
                user.get(db, state, userId)
                    .then((result) => {
                        resolve(result);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            });
        },
        add: (data) => {
            return new Promise((resolve, reject) => {
                user.add(db, data)
                    .then(resolve)
                    .catch((err) => {
                        reject(err);
                    });
            });
        },
        update: (data) => {
            return new Promise((resolve, reject) => {
                user.update(db, data)
                    .then(resolve)
                    .catch((err) => {
                        reject(err);
                    });
            });
        },
        delete: (userId) => {
            return new Promise((resolve, reject) => {
                user.delete(db, userId)
                    .then(resolve)
                    .catch((err) => {
                        reject(err);
                    });
            });
        },
    },
    auth: (userId) => {
        return new Promise((resolve, reject) => {
            auth(db, userId)
                .then(resolve)
                .catch((err) => {
                    reject(err);
                });
        });
    },
};
