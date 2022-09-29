const pool = require('../lib/database/database');
const Religion = require('../models/religion.model');


const StorageReligion = {};

StorageReligion.create = async(data) => {
    let dsm = new Religion()
    dsm = data

    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO PAS_Religion VALUES (?, ?, ?)', [
            dsm.uuid, dsm.name, dsm.r_description
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

StorageReligion.update = async(updata) => {
    let religion = new Religion()
    religion = updata

    return new Promise((resolve, reject) => {
        pool.query('UPDATE PAS_Religion SET name = ?, r_description = ? WHERE uuid = ?', [
            religion.name, religion.r_description, religion.uuid
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

StorageReligion.getall = async() => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM PAS_Religion;', (err, results, fields) => {
            if (err) {
                reject(err)
            }

            resolve(results)
        })
    })
}

StorageReligion.getsingle = async(uuid) => {

    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM PAS_Religion WHERE uuid = ?;', [uuid], (err, results, fields) => {
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
                reject(404)
            }

            resolve(results)

        })
    })
}

module.exports = StorageReligion;