const pool = require('../lib/database/database');
const userStorage = {}


userStorage.getCredentials = async (email) => {
    return new Promise((resolve, reject) => {
        pool.query(`
        SELECT pu.uuid, pu.email, r.name AS rol FROM PAS_PersonUser pu
        INNER JOIN PAS_Person p ON p.uuid = pu.uuid
        INNER JOIN PAS_Role r ON r.uuid = p.uuidRole
        WHERE binary pu.email = ? AND p.active = 1;`, [email], (err, results, fields) => {
            if (err) {
                reject(err)
            }
            if (results) {
                if (results.length == 0) {
                    resolve({
                        ok: false,
                        status: 404
                    })
                } else {
                    resolve({
                        ok: true,
                        data: {
                            id: results[0].uuid,
                            email: email,
                            rol: results[0].rol
                        }
                    })

                }
            }

            reject({
                ok: false,
                status: 404
            })
        })
    })
}

userStorage.createUser = async (idPersonFromGoogle, idUser, email, firstname, lastname, uuidRole, activeAccount) => {
    return new Promise((resolve, reject) => {
        pool.query('call createuser(?,?,?,?,?,?,?)',
            [idPersonFromGoogle, idUser, email, firstname, lastname, uuidRole, activeAccount], (err, results, fields) => {
                if (err) reject(err);
                if (results) {
                    if (results[0]) {
                        reject({
                            ok: false,
                            status: results[0][0].Code
                        })
                    }
                }
                resolve({
                    ok: true,
                    data: {
                        id: idPersonFromGoogle,
                        email: email
                    }
                })
            })
    })
}

userStorage.activeAccount = async (state, uuidPerson) => {
    return new Promise((resolve, reject) => {
        pool.query('CALL activeOrDisable(?,?)',
            [uuidPerson,state], (err, results, fields) => {
                if (err) reject(err)

                if (results) {
                    if (results.affectedRows == 0) {
                        reject({
                            ok: false,
                            status: 404,
                            id: uuidPerson
                        })
                    }
                }
                resolve({
                    ok: true,
                    state: state,
                    id: uuidPerson
                })
            })
    })
}

userStorage.getState = async (id) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT p.active, p.email, p.firstName, p.lastName FROM PAS_Person p
                      INNER JOIN PAS_PersonUser pu ON p.uuid = pu.uuid
                      WHERE pu.uuid = ?;`,
            [id], (err, results, fields) => {
                if (err) reject(err)

                if (results) {
                    if (results.length == 0) {
                        reject({
                            ok: false,
                            status: 404,
                            id: id
                        })
                    }
                }

                resolve({
                    ok: true,
                    data: results[0]
                })
            })
    })
}


userStorage.deleteUser = async (id) => {
    return new Promise((resolve, reject) => {
        pool.query(`CALL deleteUser(?)`,
            [id], (err, results, fields) => {
                if (err) reject(err)

                if (results) {
                    if (results.length == 0) {
                        reject({
                            ok: false,
                            status: 404,
                            id: id
                        })
                    }
                }

                resolve({
                    ok: true
                })
            })
    })
}
module.exports = userStorage;