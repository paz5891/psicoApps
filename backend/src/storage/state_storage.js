const pool = require('../lib/database/database');
const State = require('../models/state.model');

const StorageState = {}

StorageState.create = async(data) => {
    let cont = new State()
    cont = data

    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO PAA_State VALUES (?, ?, ?)', [
            cont.uuid, cont.uuidCountry, cont.name
        ], (err, results, fields) => {
            if (err) {
                if (err.errno) {
                    reject({
                        code: err.errno,
                        err: err
                    })
                }
                reject(err)
            };

            resolve(results)

        })
    })
}

StorageState.update = async(data) => {
    let cont = new State()
    cont = data

    return new Promise((resolve, reject) => {
        pool.query('UPDATE PAA_State SET  uuidCountry = ?, name = ? WHERE uuid = ?', [
            cont.uuidCountry, cont.name, cont.uuid
        ], (err, results, fields) => {
            if (err) {
                if (err.errno) {
                    reject({
                        code: err.errno,
                        err: err
                    })
                }
                reject(err)
            }
            if (results) {
                if (results.affectedRows == 0) {
                    reject({
                        error: 404
                    })
                }

            }
            resolve(results)

        })
    })
}


StorageState.getall = async() => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM PAA_State;', (err, results, fields) => {
            if (err) {
                reject(err)
            }

            resolve(results)
        })
    })
}

StorageState.getsingle = async(uuid) => {

    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM PAA_State WHERE uuid = ?;', [uuid], (err, results, fields) => {
            if (err) {
                if (err.errno) {
                    reject({
                        code: err.errno,
                        err: err
                    })
                }
                reject(err)
            };

            if (results.length == 0) {
                reject({
                    code: 404
                })
            }

            resolve(results)
        })
    })
}

module.exports = StorageState;