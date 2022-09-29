const pool = require('../lib/database/database');
const City = require('../models/city.model');

const StorageCity = {}

StorageCity.create = async(data) => {
    let cont = new City()
    cont = data

    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO PAA_City VALUES (?, ?, ?)', [
            cont.uuid, cont.uuidState, cont.name
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

StorageCity.update = async(data) => {
    let cont = new City()
    cont = data

    return new Promise((resolve, reject) => {
        pool.query('UPDATE PAA_City SET  uuidState = ?, name = ? WHERE uuid = ?', [
            cont.uuidState, cont.name, cont.uuid
        ], (err, results, fields) => {
            if (err) {
                reject(err)
            }
            if (results.affectedRows < 1) {
                reject({
                    error: 404
                })
            }
            resolve()

        })
    })
}


StorageCity.getall = async() => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM PAA_City;', (err, results, fields) => {
            if (err) {
                reject(err)
            }

            resolve(results)
        })
    })
}

StorageCity.getsingle = async(uuid) => {

    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM PAA_City WHERE uuid = ?;', [uuid], (err, results, fields) => {
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

module.exports = StorageCity;