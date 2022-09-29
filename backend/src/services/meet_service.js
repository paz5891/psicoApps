const uuidv4 = require('uuid')
const Meet = require('../models/meeting.model')
const meetStorage = require('../storage/meet_storage')
const meetService = {}

meetService.create = async (meet, uuidcase) => {
    let meeting = new Meet()
    meeting = meet
    meeting.uuidCase = uuidcase
    meeting.uuid = uuidv4.v4()


    return await meetStorage.create(meeting)
}

/** Devuelve todos los meets por caso */
meetService.getManyByCase = async (uuidcase, uuidUserFromToken, rol) => {
    let query = `
    SELECT 
        m.uuidCase,
        m.uuid, 
        m.title, 
        m.beginDate, 
        m.endDate, 
        m.latitude, 
        m.longitude 
    FROM PAC_Meeting m
    INNER JOIN PAC_Case c ON c.uuid = m.uuidCase `
    let values;

    if (rol == 'admin') {
        query += `
        WHERE c.uuid = ?
        AND m.uuidTherapeuticPlanActivity IS NULL`
        values = [uuidcase]
    } else {
        query += `
        WHERE c.uuid = ?
        AND c.uuidAssignedUser = ?
        AND m.uuidTherapeuticPlanActivity IS NULL`
        values = [uuidcase, uuidUserFromToken]
    }
    query += ` ORDER BY m.beginDate DESC;`;

    return await meetStorage.getMeets(query, values)
}

/** Obtener todos los meets por actividad del plan terapeutico */
meetService.getManyByTherapeuticActivity = async (uuidTherapeuticPlanActivity, uuidUserFromToken, rol) => {
    let query = `
    SELECT 
        m.uuidCase,
        m.uuid, 
        m.title, 
        m.beginDate, 
        m.endDate, 
        m.latitude, 
        m.longitude 
    FROM PAC_Meeting m
    INNER JOIN PAC_TherapeuticPlanActivity tpa ON m.uuidTherapeuticPlanActivity = tpa.uuid
    INNER JOIN PAC_Case c ON c.uuid = m.uuidCase `
    let values;

    if (rol == 'admin') {
        query += `
    WHERE m.uuidTherapeuticPlanActivity = ?
    ORDER BY m.beginDate ASC;`
        values = [uuidTherapeuticPlanActivity]
    } else {
        query += `
    WHERE m.uuidTherapeuticPlanActivity = ?
    AND c.uuidAssignedUser = ?
    ORDER BY m.beginDate ASC;`
        values = [uuidTherapeuticPlanActivity, uuidUserFromToken]
    }


    return await meetStorage.getMeets(query, values)
}

/** Devuelve un meet por caso */
meetService.getOnlyByCase = async (uuidcase, uuidmeet, uuidUserFromToken, rol) => {
    let query = `
    SELECT
        m.uuidCase, 
        m.uuid, 
        m.title, 
        m.beginDate, 
        m.endDate, 
        m.latitude, 
        m.longitude 
    FROM PAC_Meeting m
    INNER JOIN PAC_Case c ON c.uuid = m.uuidCase `

    let values;

    if (rol == 'admin') {
        query += `
        WHERE c.uuid = ?
        AND m.uuid = ?`
        values = [uuidcase, uuidmeet]
    } else {
        query += `
        WHERE c.uuid = ?
        AND m.uuid = ?
        AND c.uuidAssignedUser = ?`
        values = [uuidcase, uuidmeet, uuidUserFromToken]
    }

    query += `ORDER BY m.beginDate ASC;`;

    return await meetStorage.getMeets(query, values)
}

meetService.update = async (meet, uuidmeet, uuidUserFromToken) => {
    let dataMeet = new Meet()
    dataMeet = meet

    return await meetStorage.update(dataMeet, uuidmeet, uuidUserFromToken)
}

meetService.delete = async (uuidmeet, uuidUserFromToken) => {
    return await meetStorage.delete(uuidmeet, uuidUserFromToken)
}

module.exports = meetService;