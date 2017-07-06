const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(`${__dirname}/db.sqlite3`);

const user = require('./user');

module.exports = {
    user: {
        get: (userId) => {
            return new Promise((resolve, reject) => {
                user.get(db, userId)
                    .then((result) => {
                        resolve(result);
                    })
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
    auth: {

    },
};
