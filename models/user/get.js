module.exports = (db, state, userId) => {
    return new Promise((resolve, reject) => {
        const stmt = db.prepare('SELECT * FROM users WHERE id = ?');
        stmt.get(userId, (err, row) => {
            if(err) {
                reject({
                    code: state.SQL_ERROR,

                })
            }
        });
        stmt.finalize();
    });
};
