const pool = require('../lib/database/database');
const Country = require('../models/country.model');
const StorageState = require('./state_storage');

const StorageCountry = {};

StorageCountry.create = async(data) => {
    let cont = new Country()
    cont = data

    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO PAA_Country VALUES (?, ?, ?)', [
            cont.uuid, cont.isoName, cont.name
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

StorageCountry.update = async(data) => {
    let cont = new Country()
    cont = data

    return new Promise((resolve, reject) => {
        pool.query('UPDATE PAA_Country SET isoName = ?, name = ? WHERE uuid = ?', [
            cont.isoName, cont.name, cont.uuid
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


StorageCountry.getall = async() => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM PAA_Country;', (err, results, fields) => {
            if (err) {
                reject(err)
            }

            resolve(results)
        })
    })
}

StorageCountry.getsingle = async(id) => {

    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM PAA_Country WHERE uuid = ?;', [id], (err, results, fields) => {
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

module.exports = StorageCountry;