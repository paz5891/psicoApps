const casecomentaryStorage = require('../storage/casecomments_storage')
const casecomentaryService = {}

casecomentaryService.getAll = async (uuidCase, uuidUserFromToken, rol) => {
    let query = `
    SELECT
        sch.uuid,
        sch.uuidStage,
        sch.dateEvent,
        sch.comment,
        sch.attachment
    FROM
        PAC_StageCaseHistory sch
        INNER JOIN PAC_Case c ON sch.uuidCase = c.uuid
    WHERE
        sch.uuidCase = ? `
    let values;

    if (rol == 'admin') {
        query += ` ORDER BY sch.dateEvent DESC;`
        values = [uuidCase]
    } else {
        query += ` 
        AND c.uuidAssignedUser = ?
        ORDER BY sch.dateEvent DESC;`
        values = [uuidCase, uuidUserFromToken]
    }

    return await casecomentaryStorage.getComments(query, values)
}

casecomentaryService.getOne = async (uuidcomment, uuidUserFromToken, rol) => {
    let query = `
    SELECT
        sch.uuid,
        sch.uuidStage,
        sch.dateEvent,
        sch.comment,
        sch.attachment
    FROM
        PAC_StageCaseHistory sch
        INNER JOIN PAC_Case c ON sch.uuidCase = c.uuid
    WHERE
        sch.uuid = ? `
    let values;

    if (rol == 'admin') {
        query += `;`
        values = [uuidcomment]
    } else {
        query += ` AND c.uuidAssignedUser = ?`
        values = [uuidcomment, uuidUserFromToken]
    }

    return await casecomentaryStorage.getComments(query, values)
}

casecomentaryService.update = async (uuidcomment, uuidUserFromToken, data,rol) => {
    return await casecomentaryStorage.extractFileFromDB(uuidcomment, uuidUserFromToken, data.attachment,rol)
        .then(fileFromDb => {
            return casecomentaryStorage.update(data.comment, data.attachment, uuidcomment, uuidUserFromToken, fileFromDb,rol)
        })
}

module.exports = casecomentaryService;