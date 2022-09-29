const pool = require('../lib/database/database')
const casestageStorage = {}

casestageStorage.existCaseStage = async (query, values, resolveok, resolvefalse) => {

    return new Promise((resolve, reject) => {
        pool.query(query, values, (err, results, fields) => {
            if (err) {
                if (err.errno) {
                    reject({
                        code: err.errno,
                        err: err
                    })
                }

                reject(err)
            }

            console.log(results)
            if (results) {
                if (results.length == 0) {
                    resolve({
                        id: values[0],
                        no: resolvefalse
                    })
                }

                if (results[0]) {
                    if (results[0].count == 0) {
                        resolve({
                            id: values[0],
                            no: resolvefalse
                        })
                    }
                }
            }

            resolve({
                id: values[0],
                no: resolveok
            })
        })
    })
}

casestageStorage.changeCaseStage = async (uuidStage, uuidCase, uuidUserFromToken) => {
    return new Promise((resolve, reject) => {
        pool.query(`CALL changeStagecaseToDiagnostic(?, ?, ?);`,
            [uuidStage, uuidCase, uuidUserFromToken], (err, results, fields) => {
                if (err) {
                    if (err.errno) {
                        reject(err.errno)
                    }
                    reject(err)
                }

                resolve({
                    id: uuidCase,
                    no: 2
                })
            })
    })
}



casestageStorage.caseInitialIsOk = async (uuidInitialStage, uuidUserFromToken) => {
    return new Promise((resolve, reject) => {
        pool.query(`
        SELECT 
            cis.currentProblem, 
            cis.genogramFile, 
            cis.mentalEvaluationTest, 
            cis.mentalEvaluationTestFile,
            cis.clinicalInterpretation, 
            cis.clinicalInterpretationFile,
            cis.interpreationOfEvidence,
            cis.interpreationOfEvidenceFile,
            cis.therapeuticContract,
            cis.therapeuticContractFile
        FROM PAC_CaseInitialStage cis
        INNER JOIN PAC_Case c ON c.uuid = cis.uuid
        WHERE cis.uuid = ?;
        `, [uuidInitialStage, uuidUserFromToken], (err, results, fields) => {

            if (err) {
                console.log(err);
                if (err.errno) {
                    reject(err)
                }
                reject(err)
            }

            if (results) {
                if (results.length == 0) {
                    resolve({
                        id: uuidInitialStage,
                        no: 1
                    })
                }
            }

            resolve(results)

        })
    })
}

casestageStorage.caseDiagnosticIsOk = async (uuidCaseDiagnosticStage) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT COUNT(dp.uuid) AS count FROM PAC_DiagnosedProblems dp
        INNER JOIN PAC_CaseDiagnosticStage ds ON dp.uuidCaseDiagnosticStage = ds.uuid
        INNER JOIN PAC_Case c ON ds.uuid = c.uuid
        WHERE dp.uuidCaseDiagnosticStage = ?;`, [uuidCaseDiagnosticStage], (err, results) => {
            if (err) {
                if (err.errno) {
                    reject({
                        code: err.errno,
                        err: err
                    })
                }

                reject(err)
            }

            console.log(results)

            if (results) {
                if (results.length == 0) {
                    resolve({
                        id: uuidCaseDiagnosticStage,
                        no: 2
                    })
                }

                if (results[0]) {
                    if (results[0].count == 0) {
                        resolve({
                            id: uuidCaseDiagnosticStage,
                            no: 2
                        })
                    }
                }
            }

            resolve({
                data: uuidCaseDiagnosticStage,
                no: 3
            })
        })
    })
}

casestageStorage.caseIntermediateIsOk = (uuidCase, uuidUserFromToken) => {
    let query = `
    SELECT COUNT(tpa.uuid) AS count FROM PAC_TherapeuticPlanActivity tpa
    INNER JOIN PAC_CaseIntermediateStage cis ON tpa.uuidCaseIntermediateStage = cis.uuid
    INNER JOIN PAC_Case c ON cis.uuid = c.uuid
    WHERE c.uuid = ?
    AND c.uuidAssignedUser = ?`

    return new Promise((resolve, reject) => {
        pool.query(query, [uuidCase, uuidUserFromToken], (err, results) => {
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
                if (results.length == 0) {
                    reject({
                        code: 404
                    })
                }

                if (results[0].count == 0) {
                    resolve({
                        id: uuidCase,
                        no: 3
                    })
                }
            }

            resolve({
                id: uuidCase,
                no: 4
            })
        })
    })
}

/** CAMBIA EL ESTADO DEL CASO SEGUN ID DE CASO Y ID DE USUARIO */
casestageStorage.updateStageCase = async (uuidStage, uuidCase, uuidUserFromToken, Phase) => {
    
    let query = `
    UPDATE
        PAC_Case
    SET
        uuidStage = ?
    WHERE
        uuid = ?
        AND uuidAssignedUser = ?;
    `
    return new Promise((resolve, reject) => {
        pool.query(query, [uuidStage, uuidCase, uuidUserFromToken], (err, results) => {
            if (err) {
                if (err.errno) {
                    reject({
                        code: err.errno,
                        err: err
                    })
                    reject(err)
                }
            }

            if (results) {
                if (results.affectedRows == 0) {
                    reject({
                        code: 404
                    })
                }
            }

            resolve({
                no: Phase,
                id: uuidCase

            })
        })
    })
}
module.exports = casestageStorage;