const pool = require('../lib/database/database')
const meetingStorage = {}


meetingStorage.create = async (meet) => {
    let query = `
    INSERT INTO
        PAC_Meeting (
            uuid,
            uuidCase,
            uuidTherapeuticPlanActivity,
            title,
            beginDate,
            endDate,
            latitude,
            longitude
        )
        VALUES
            (?, ?, ?, ?, ?, ?, ?, ?);`

    return new Promise((resolve, reject) => {
        pool.query(query, [
            meet.uuid,
            meet.uuidCase,
            meet.uuidTherapeuticPlanActivity,
            meet.title,
            meet.beginDate,
            meet.endDate,
            meet.latitude,
            meet.longitude
        ], (err) => {
            if (err) {
                reject({
                    code: err.errno,
                    err: err
                })
            }

            resolve(meet)

        })
    })
}

meetingStorage.getMeets = async (query, values) => {
    return new Promise((resolve, reject) => {
        pool.query(query, values, (err, results) => {
            if (err) {
                reject({
                    code: err.errno,
                    err: err
                })
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

/** Actualiza un registro de cita de PAC_Meeting */
meetingStorage.update = async (meet, uuidmeet, uuidUserFromToken) => {
    let query = `
    UPDATE
        PAC_Meeting m
        INNER JOIN PAC_Case c ON m.uuidCase = c.uuid
    SET
        m.title = ?,
        m.beginDate = ?,
        m.endDate = ?,
        m.latitude = ?,
        m.longitude = ?
    WHERE
        m.uuid = ?
        AND c.uuidAssignedUser = ?;`

    return new Promise((resolve, reject) => {
        pool.query(query, [
            meet.title,
            meet.beginDate,
            meet.endDate,
            meet.latitude,
            meet.longitude,
            uuidmeet,
            uuidUserFromToken], (err, results) => {
                if (err) {
                    reject({
                        code: err.errno,
                        err: err
                    })
                }

                if (results) {
                    if (results.affectedRows == 0) {
                        reject({
                            code: 404
                        })
                    }
                }

                resolve(meet)
            })
    })
}

/** Borra un registro de cita de PAC_Meeting */
meetingStorage.delete = async (uuidmeet, uuidUserFromToken) => {
    let query = `
    DELETE m
    FROM    
        PAC_Meeting m
        INNER JOIN PAC_Case c ON m.uuidCase = c.uuid
    WHERE
        (
            m.uuid = ?
            AND c.uuidAssignedUser = ?
        );`
    return new Promise((resolve, reject) => {
        pool.query(query, [uuidmeet, uuidUserFromToken], (err, results) => {
            if (err) {
                reject({
                    code: err.errno,
                    err: err
                })
            }

            if (results) {
                if (results.affectedRows == 0) {
                    reject({
                        code: 404
                    })
                }
            }

            resolve(uuidmeet)
        })
    })
}

module.exports = meetingStorage