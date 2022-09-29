const { query } = require("express-validator");
const pool = require("../lib/database/database");
const StorageCaseInitial = {}

StorageCaseInitial.update = async (Query, Values, NameFile) => {
    return new Promise((resolve, reject) => {
        pool.query(Query, Values, (err, results, fields) => {
            if (err) {
                reject(err)
            }

            console.log(results)
            if (results) {
                if (results.affectedRows < 1) {
                    reject({
                        error: 404,
                        fileToDelete: Values[0]
                    })
                }
            }

            resolve({
                results: Values[0],
                fileToDelete: NameFile

            })
        })
    })
}

StorageCaseInitial.getAll = async () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM PAC_CaseInitialStage;', (err, results, fields) => {
            if (err) reject(err);

            resolve(results)
        })
    })
}


StorageCaseInitial.getOnly = async (Query, Values) => {
    return new Promise((resolve, reject) => {
        pool.query(Query, Values, (err, results, fields) => {
            if (err) reject(err);

            if (results) {
                if (results.length == 0) {
                    reject(404)
                }
            }

            resolve(results)
        })
    })
}

StorageCaseInitial.extractFieldFile = async (Query, values, NameFile) => {

    return new Promise((resolve, reject) => {
        pool.query(Query, [values[1], values[2]], (err, results, fields) => {
            if (err) {
                reject(err)
            }


            if (results) {
                if (results.length > 0) {
                    let fileFromDB = results[0]
                    resolve(Object.values(fileFromDB)[0])
                }
            }

            reject({
                error: 404,
                fileToDelete: NameFile
            })
        })
    })
}

module.exports = StorageCaseInitial;