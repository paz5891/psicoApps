const pool = require('../lib/database/database')
const storageAssigment = {}

/** Realiza el registro del cambio de asignación de caso, como historial */
storageAssigment.createAuditAssigment = async (Assigment, dataUpdateCase) => {
    return new Promise((resolve, reject) => {
        pool.query(`
        INSERT INTO
            PAC_CaseAssigmentHistory
        VALUES
            (?,?,?,?,?,?,?);`,
            [
                Assigment.uuid,
                Assigment.uuidCase,
                Assigment.dateEvent,
                Assigment.uuidFromPersonUser,
                Assigment.uuidToPersonUser,
                null,
                Assigment.comment
            ], (err, results) => {
                if (err) {
                    reject({ code: err.errno, err: err })
                }

                resolve(dataUpdateCase)
            })
    })
}

module.exports = storageAssigment;