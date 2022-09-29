const pool = require('../lib/database/database');


const storageClose = {}

storageClose.create = async (closeStage) => {

    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO PAC_CaseCloseStage VALUES (?, ?, ?, ?)', [
            closeStage.uuid, closeStage.closeDate, closeStage.conclusion, closeStage.recommendation
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
            resolve()

        })
    })
}

storageClose.update = async (closeStage) => {

    return new Promise((resolve, reject) => {
        pool.query(`
        UPDATE PAC_CaseCloseStage SET conclusion = ?, recommendation = ? 
        WHERE uuid = ?`, [
            closeStage.conclusion, closeStage.recommendation, closeStage.uuid
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
                        code: 404
                    })
                }
            }

            resolve()

        })
    })
}

storageClose.get = async (uuidClose, uuidUserFromToken) => {
    let query = `
    SELECT 
        ccs.uuid, 
        ccs.closeDate, 
        ccs.conclusion,
        ccs.recommendation
    FROM PAC_CaseCloseStage ccs
    INNER JOIN PAC_Case c
    WHERE  ccs.uuid = ?
    AND c.uuidAssignedUser = ?;`

    return new Promise((resolve, reject) => {
        pool.query(query, [uuidClose, uuidUserFromToken], (err, results) => {
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
            }

            resolve(results[0])
        })
    })
}

storageClose.allPhasesOk = async (uuidCase, uuidStage, uuidUserFromToken) => {
    return new Promise((resolve, reject) => {
        pool.query(`
        SELECT COUNT(cis.uuid) AS count FROM PAC_CaseIntermediateStage cis
            INNER JOIN PAC_Case c ON cis.uuid = c.uuid
        WHERE c.uuid = ?
        AND c.uuidStage = ?
        AND c.uuidAssignedUser = ?`, [uuidCase, uuidStage, uuidUserFromToken], (err, results) => {
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
                if (results[0].count == 0) {
                    reject({
                        code: 404
                    })
                }
            }

            resolve({
                isOk: true
            })
        })
    })
}
module.exports = storageClose;