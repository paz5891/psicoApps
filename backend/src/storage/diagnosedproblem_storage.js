const pool = require('../lib/database/database');
const DiagnosticProblem = require('../models/diagnosedproblem.model')
const StorageDiagnosedProblem = {};


StorageDiagnosedProblem.create = async (DataDiagnostic) => {
    let newDiag = new DiagnosticProblem()
    newDiag = DataDiagnostic;

    return new Promise((resolve, reject) => {
        pool.query(`
    INSERT INTO 
        PAC_DiagnosedProblems (
            uuid, 
            uuidCaseDiagnosticStage, 
            uuidDSM5, 
            descriptionOfProblem, 
            descriptionOfProblemFile
        )
    SELECT ?, ?, ?, ?, ?
    FROM DUAL
    WHERE NOT EXISTS (
        SELECT 1
        FROM PAC_DiagnosedProblems
        WHERE uuidCaseDiagnosticStage = ? AND uuidDSM5 = ?
    )
    LIMIT 1;`, [
            newDiag.uuidDiagnosedProblems,
            newDiag.uuidCaseDiagnosticStage,
            newDiag.uuidDSM5,
            newDiag.descriptionOfProblem,
            newDiag.descriptionOfProblemFile,
            newDiag.uuidCaseDiagnosticStage,
            newDiag.uuidDSM5], (err, results, fields) => {
                if (err) {
                    if (err.errno == 1452) {
                        reject({
                            error: 404,
                            fileToDelete: newDiag.descriptionOfProblemFile
                        })
                    }

                    reject({
                        error: err,
                        fileToDelete: newDiag.descriptionOfProblemFile
                    })
                }

                if (results) {
                    if (results.affectedRows == 0) {
                        reject({
                            error: 409,
                            fileToDelete: newDiag.descriptionOfProblemFile
                        })
                    }
                }

                resolve(newDiag)
            })
    })
}

StorageDiagnosedProblem.update = async (UpData, UUID) => {
    let update = new DiagnosticProblem()
    update = UpData;

    return new Promise((resolve, reject) => {
        pool.query(`UPDATE PAC_DiagnosedProblems SET uuidCaseDiagnosticStage = ?,  uuidDSM5 = ?,
        descriptionOfProblem = ?, descriptionOfProblemFile = ? WHERE uuid = ? AND uuidCaseDiagnosticStage = ?;`, [UUID, update.uuidDSM5,
            update.descriptionOfProblem, update.descriptionOfProblemFile, update.uuidDiagnosedProblems, UUID], (err, results, fields) => {
                if (err) {
                    reject({
                        error: err,
                        fileToDelete: update.changefile
                    })
                }


                if (results.affectedRows < 1) {
                    reject({
                        error: 404,
                        fileToDelete: update.changefile
                    })
                }

                resolve({
                    data: update,
                    fileToDelete: update.changefile
                })
            })
    })
}

StorageDiagnosedProblem.getNameFile = async (UUID, NameFile) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT descriptionOfProblemFile FROM PAC_DiagnosedProblems WHERE uuid = ?;', [UUID], (err, results, fields) => {
            if (err) {
                reject({
                    error: err,
                    fileToDelete: NameFile
                })
            }


            resolve(results[0])

        })

    })
}

StorageDiagnosedProblem.getall = async () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM PAC_DiagnosedProblems', (err, results, fields) => {
            if (err) {
                reject(err)
            }

            resolve(results)
        })
    })
}

StorageDiagnosedProblem.getdsm = async () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM PAC_DSM5;', (err, results, fields) => {
            if (err) {
                reject(err)
            }

            resolve(results)
        })
    })
}

StorageDiagnosedProblem.getdiagnosed = async (uuid) => {

    return new Promise((resolve, reject) => {
        pool.query(`SELECT ds.uuid, ds.name, ds.r_description, dc.uuid, dc.uuidCaseDiagnosticStage,
        dc.uuidDSM5, dc.descriptionOfProblem, dc.descriptionOfProblemFile  FROM PAC_DSM5 ds
        INNER JOIN PAC_DiagnosedProblems dc
	    ON ds.uuid = dc.uuidDSM5
	    INNER JOIN PAC_CaseDiagnosticStage cd
	    ON dc.uuidCaseDiagnosticStage = cd.uuid
        WHERE cd.uuid = ?;`, [uuid], (err, results, fields) => {
            if (err) reject(err);

            if (results.length == 0) {
                reject(404)
            }

            resolve(results)
        })
    })
}

StorageDiagnosedProblem.getsinglediagnosed = async (uuid) => {

    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM PAC_DiagnosedProblems WHERE uuid = ?;', [uuid], (err, results, fields) => {
            if (err) reject(err);

            if (results.length == 0) {
                reject(404)
            }

            resolve(results)
        })
    })
}
module.exports = StorageDiagnosedProblem;