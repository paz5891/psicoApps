const pool = require('../lib/database/database')
const casecomentaryStorage = {}

casecomentaryStorage.getComments = async (query, values) => {
    return new Promise((resolve, reject) => {
        pool.query(query, values, (err, results) => {
            if (err) reject({
                code: err.errno,
                err: err
            })

            if (results) {
                if (results.length == 0) reject({
                    code: 404
                })
            }

            resolve(results)
        })
    })
}


casecomentaryStorage.update = async (comment, attachment, uuidComment, uuidUserFromToken, fileFromDB, rol) => {

    let query;
    if (rol === "admin") {
        query = `
        UPDATE
            PAC_StageCaseHistory sch
            INNER JOIN PAC_Case c ON c.uuid = sch.uuidCase
        SET
            sch.comment = ?,
            sch.attachment = ?
        WHERE
            sch.uuid = ?
            AND sch.uuidPersonUser= ?;`
    } else {
        query = `
    UPDATE
        PAC_StageCaseHistory sch
        INNER JOIN PAC_Case c ON c.uuid = sch.uuidCase
    SET
        sch.comment = ?,
        sch.attachment = ?
    WHERE
        sch.uuid = ?
        AND c.uuidAssignedUser = ?
        AND sch.uuidPersonUser= ?;`
    }


    let attachmentDelete = attachment //Se inicializa el valor con el archivo del cliente

    if (!attachment) attachment = fileFromDB; // Si no tiene nada se cambia el valor del archivo por el de DB

    return new Promise((resolve, reject) => {
        pool.query(query,
            (rol === "admin") ?
                [comment, attachment, uuidComment, uuidUserFromToken]
                :
                [comment, attachment, uuidComment, uuidUserFromToken, uuidUserFromToken]
            , (err, results) => {
                if (err) {
                    reject({
                        code: err.errno,
                        fileToDelete: attachmentDelete,
                        err: err
                    })
                }

                if (results) {
                    if (results.affectedRows == 0) {
                        reject({
                            code: 404,
                            fileToDelete: attachmentDelete
                        })
                    }
                }

                /* si viene el archivo del cliente se modifica 
                   el archivo a borrar por el de base de datos
                */
                if (attachmentDelete) attachmentDelete = fileFromDB;

                resolve({
                    data: {
                        comment: comment,
                        attachment: attachment,
                        uuidcomment: uuidComment
                    },
                    fileToDelete: attachmentDelete
                })
            })
    })
}

casecomentaryStorage.extractFileFromDB = async (uuidcomment, uuidUserFromToken, attachment, rol) => {
    let query;
    if (rol === "admin") {
        query = `
        SELECT
            sch.attachment
        FROM
            PAC_StageCaseHistory sch
            INNER JOIN PAC_Case c ON sch.uuidCase = c.uuid
        WHERE
            sch.uuid = ?
            AND sch.uuidPersonUser = ?;`;
    } else {
        query = `
    SELECT
        sch.attachment
    FROM
        PAC_StageCaseHistory sch
        INNER JOIN PAC_Case c ON sch.uuidCase = c.uuid
    WHERE
        sch.uuid = ?
        AND c.uuidAssignedUser = ?
        AND sch.uuidPersonUser = ?;`;
    }
    return new Promise((resolve, reject) => {
        pool.query(query,
            (rol === "admin") ?
                [uuidcomment, uuidUserFromToken]
                : [uuidcomment, uuidUserFromToken, uuidUserFromToken], (err, results) => {
                    if (err) {
                        reject({
                            code: err.errno,
                            fileToDelete: attachment,
                            err: err
                        })
                    }

                    if (results) {
                        if (results.length == 0) {
                            reject({
                                code: 404,
                                fileToDelete: attachment
                            })
                            return
                        }
                    }

                    resolve(results[0].attachment)
                })
    })
}

module.exports = casecomentaryStorage;