const pool = require('../lib/database/database');
const Dsm5 = require('../models/dsm5.model');


const StorageDSM5 = {};

StorageDSM5.create = async(data) => {
    let dsm = new Dsm5()
    dsm = data

    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO PAC_DSM5 VALUES (?, ?, ?)', [
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

StorageDSM5.update = async(updata) => {
    let dsm = new Dsm5()
    dsm = updata

    return new Promise((resolve, reject) => {
        pool.query('UPDATE PAC_DSM5 SET name = ?, r_description = ? WHERE uuid = ?', [
            dsm.name, dsm.r_description, dsm.uuid
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

StorageDSM5.getdsm = async() => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM PAC_DSM5;', (err, results, fields) => {
            if (err) {
                reject(err)
            }

            resolve(results)
        })
    })
}

StorageDSM5.getsingle = async(uuid) => {

    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM PAC_DSM5 WHERE uuid = ?;', [uuid], (err, results, fields) => {
            if (err) reject(err);

            if (results.length == 0) {
                reject(404)
            }

            resolve(results)
        })
    })
}

module.exports = StorageDSM5;