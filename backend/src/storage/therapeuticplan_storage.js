const pool = require("../lib/database/database");
const TherapeuticPlan = require('../models/therapeuticplan.model')

const StorageTherapeuticPlan = {}

StorageTherapeuticPlan.create = async (therapeuticplan, therapeuticfiles) => {

    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO PAC_TherapeuticPlanActivity VALUES (?,?,?,?,?,?,?,?,?,?,?,?)', [
            therapeuticplan.uuid, therapeuticplan.uuidCaseIntermediateStage,
            therapeuticplan.aspectToWork, therapeuticplan.aspectToWorkFile,
            therapeuticplan.objetives, therapeuticplan.objetivesFile,
            therapeuticplan.goals, therapeuticplan.goalsFile,
            therapeuticplan.focus, therapeuticplan.focusFile,
            therapeuticplan.techniques, therapeuticplan.techniquesFile

        ], (err, results, fields) => {
            if (err) {
                if (err.errno) {
                    reject({
                        code: err.errno,
                        fileToDelete: therapeuticfiles
                    })
                }
                reject({
                    err: err,
                    fileToDelete: therapeuticfiles
                })
            }
            resolve(therapeuticplan.uuid)

        })
    })
}


StorageTherapeuticPlan.update = async (Query, Value, uuidCaseinitial, ID, NameFile, idFromTokenUser) => {
    return new Promise((resolve, reject) => {
        pool.query(Query, [Value, uuidCaseinitial, ID], (err, results, fields) => {
            if (err) {
                if (err.errno) {
                    reject({
                        error: err.errno,
                        fileToDelete: Value
                    })
                }

                reject(err)
            }
            if (results) {

                if (results.affectedRows < 1) {
                    reject({
                        error: 404,
                        fileToDelete: Value
                    })
                }

            }
            resolve({
                results: `Actualización satisfactoria`,
                fileToDelete: NameFile
            })
        })
    })
}

StorageTherapeuticPlan.extractFieldFile = async (Query, uuidCaseinitial, ID) => {

    return new Promise((resolve, reject) => {
        pool.query(Query, [uuidCaseinitial, ID], (err, results, fields) => {
            if (err) {
                if (err.errno) {
                    reject(err.errno)
                }
                reject(err)
            }

            if (results) {
                if (results.length == 0) {
                    reject(404)
                }
            }

            resolve(results[0])

        })
    })
}

StorageTherapeuticPlan.getOnlyActivity = async (query, values) => {
    return new Promise((resolve, reject) => {
        pool.query(query, values, (err, results, fields) => {

            if (err) {
                if (err.errno) {
                    reject(err.errno)
                }

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

StorageTherapeuticPlan.getActivities = async (query, values) => {
    return new Promise((resolve, reject) => {
        pool.query(query, values,
            (err, results, fields) => {

                if (err) {
                    if (err.errno) {
                        reject({
                            code: err.errno,
                            error: err
                        })
                    }

                    reject(err)
                }

                if (results) {
                    if (results.length == 0) {
                        reject({
                            code: 404
                        })
                    }
                }
                resolve(results)
            })

    })
}
module.exports = StorageTherapeuticPlan;