const pool = require("../lib/database/database");
const StorageCaseIntermediate = {}

StorageCaseIntermediate.create = async (Query, Value, uuid) => {
    return new Promise((resolve, reject) => {
        pool.query(Query, [uuid, Value], (err, results, fields) => {

            if (err) {
                if (err.errno) {
                    reject({
                        code: err.errno,
                        fileToDelete: Value
                    })
                }

                reject({
                    err: err,
                    fileToDelete: Value
                })
            }

            resolve({
                results: `Creación satisfactoria`,
                fileToDelete: Value
            })
        })
    })
}



StorageCaseIntermediate.getuuid = async (uuid) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT COUNT(uuid) AS exist FROM PAC_CaseIntermediateStage WHERE uuid = ?', [uuid], (err, results, fields) => {

            if (err) {
                reject(err)
            }

            if (results) {
                if (results.length == 0) {
                    reject(404)
                }
            }

            resolve(results)
        })
    })
}

StorageCaseIntermediate.extractFieldFile = async (Query, NameFile, ID) => {
    return new Promise((resolve, reject) => {
        pool.query(Query, [ID], (err, results, fields) => {
            if (err) {
                reject(err)
            }
            console.log(err)
            if (results.length > 0) {
                let fileFromDB = results[0]
                resolve(Object.values(fileFromDB)[0])
            }
            reject({
                error: 404,
                fileToDelete: NameFile
            })

        })
    })
}

StorageCaseIntermediate.update = async (Query, Value, ID, NameFile) => {

    return new Promise((resolve, reject) => {
        pool.query(Query, [Value, ID], (err, results, fields) => {
            if (err) {
                reject(err)
            }
            if (results.affectedRows < 1) {
                reject({
                    error: 404,
                    fileToDelete: Value
                })
            }
            resolve({
                results: `Actualización satisfactoria`,
                fileToDelete: NameFile
            })
        })
    })
}


StorageCaseIntermediate.getCaseIntermediate = async (uuidcase) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM PAC_CaseIntermediateStage WHERE uuid = ?;',
            [uuidcase],
            (err, results, fields) => {

                if (err) {
                    reject(err)
                }
                
                if (results) {
                    if (results.length == 0) {
                        reject(404)
                    }
                }

                resolve(results)
            })

    })
}


module.exports = StorageCaseIntermediate;