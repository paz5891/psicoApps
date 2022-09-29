const pool = require('../lib/database/database');
const TestType = require('../models/testtype.model');


const StorageTestType = {};

StorageTestType.create = async(data) => {
    let testtype = new TestType()
    testtype = data

    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO PAC_TestType VALUES (?, ?, ?)', [
            testtype.uuid, testtype.name, testtype.r_description
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

StorageTestType.update = async(updata) => {
    let testtype = new TestType()
    testtype = updata

    return new Promise((resolve, reject) => {
        pool.query('UPDATE PAC_TestType SET name = ?, r_description = ? WHERE uuid = ?', [
            testtype.name, testtype.r_description, testtype.uuid
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

StorageTestType.gettesttype = async() => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM PAC_TestType;', (err, results, fields) => {
            if (err) {
                reject(err)
            }

            resolve(results)
        })
    })
}

StorageTestType.getsingle = async(uuid) => {

    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM PAC_TestType WHERE uuid = ?;', [uuid], (err, results, fields) => {
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

module.exports = StorageTestType;