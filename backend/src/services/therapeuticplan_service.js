const StorageTherapeuticPlan = require('../storage/therapeuticplan_storage');
const uuid = require('uuid')
const TherapeuticPlan = require('../models/therapeuticplan.model')

const { fieldsForQuery } = require('../lib/utils/rextherapeuticplan.file')

const TherapeuticPlanService = {}

TherapeuticPlanService.generateQuery = async (therapeuticbody, therapeuticfiles, uuidCase) => {
    var therapeuticplan = new TherapeuticPlan()

    if (therapeuticfiles == null || therapeuticfiles == undefined) {
        therapeuticplan.aspectToWorkFile = null
        therapeuticplan.objetivesFile = null
        therapeuticplan.goalsFile = null
        therapeuticplan.focusFile = null
        therapeuticplan.techniquesFile = null
    } else {
        therapeuticplan.aspectToWorkFile = therapeuticfiles.aspectToWorkFile || null
        therapeuticplan.objetivesFile = therapeuticfiles.objetivesFile || null
        therapeuticplan.goalsFile = therapeuticfiles.goalsFile || null
        therapeuticplan.focusFile = therapeuticfiles.focusFile || null
        therapeuticplan.techniquesFile = therapeuticfiles.techniquesFile || null
    }

    therapeuticplan.uuid = uuid.v4()
    therapeuticplan.uuidCaseIntermediateStage = uuidCase
    therapeuticplan.aspectToWork = therapeuticbody.aspectToWork
    therapeuticplan.objetives = therapeuticbody.objetives
    therapeuticplan.goals = therapeuticbody.goals
    therapeuticplan.focus = therapeuticbody.focus
    therapeuticplan.techniques = therapeuticbody.techniques



    return await StorageTherapeuticPlan.create(therapeuticplan, therapeuticfiles)
}



TherapeuticPlanService.update = async (DataForQuery, uuidCaseIntermediateStage, idFromTokenUser, id) => {

    console.log(DataForQuery)
    var Query = `UPDATE `
    var QuerySelect = `SELECT `
    var value;

    for (var key in DataForQuery) {

        if (fieldsForQuery.includes(`${key}`)) {
            value = DataForQuery[key]
            Query += ` PAC_TherapeuticPlanActivity SET ${key.split(" ")[0].trim()} = ? WHERE uuidCaseIntermediateStage = ? AND uuid = ?;`
            QuerySelect += ` ${key.split(" ")[0].trim()} FROM PAC_TherapeuticPlanActivity WHERE uuidCaseIntermediateStage = ? AND uuid = ?;`
        } else {
            return new Promise((resolve, reject) => reject({
                error: 401,
                errmessage: `El campo: ${key} es desconocido`,
                fileToDelete: DataForQuery[key]
            }))
        }

        break;
    }

    return await StorageTherapeuticPlan.extractFieldFile(QuerySelect, uuidCaseIntermediateStage, id)
        .then((NameFile) => {
            return StorageTherapeuticPlan.update(Query, value, uuidCaseIntermediateStage, id, NameFile, idFromTokenUser)
        })
        .catch(err => {
            return new Promise((resolve, reject) => reject(err))
        })
}


TherapeuticPlanService.getOnlyActivity = async (uuidCase, uuidTerapeuticPlan, uuidUserFromToken, rol) => {
    let query = `
    SELECT 
        tpa.uuid,
        tpa.aspectToWork,
        tpa.aspectToWorkFile,
        tpa.objetives,
        tpa.objetivesFile,
        tpa.goals,
        tpa.goalsFile,
        tpa.focus,
        tpa.focusFile,
        tpa.techniques,
        tpa.techniquesFile
    FROM PAC_TherapeuticPlanActivity tpa
    INNER JOIN PAC_CaseIntermediateStage cis ON cis.uuid = tpa.uuidCaseIntermediateStage
    INNER JOIN PAC_Case c ON cis.uuid = c.uuid`

    let values;

    if (rol == 'admin') {
        query += `
        WHERE cis.uuid = ?
        AND tpa.uuid = ?`

        values = [uuidCase, uuidTerapeuticPlan]

    } else {
        query += `
        WHERE c.uuidAssignedUser = ?
        AND cis.uuid = ?
        AND tpa.uuid = ?`

        values = [uuidUserFromToken, uuidCase, uuidTerapeuticPlan]
    }
    return await StorageTherapeuticPlan.getOnlyActivity(query, values)
}

TherapeuticPlanService.getActivities = async (uuidCase, idUserFromToken, rol) => {
    let query = `
        SELECT 
            tpa.uuid,
            tpa.aspectToWork,
            tpa.aspectToWorkFile,
            tpa.objetives,
            tpa.objetivesFile,
            tpa.goals,
            tpa.goalsFile,
            tpa.focus,
            tpa.focusFile,
            tpa.techniques,
            tpa.techniquesFile
        FROM PAC_TherapeuticPlanActivity tpa
        INNER JOIN PAC_CaseIntermediateStage cis ON cis.uuid = tpa.uuidCaseIntermediateStage
        INNER JOIN PAC_Case c ON cis.uuid = c.uuid `;
    let values;

    if (rol == 'admin') {
        query += ` WHERE cis.uuid = ?;`
        values = [uuidCase]
    } else {
        query += ` WHERE cis.uuid = ? AND c.uuidAssignedUser = ?;`
        values = [uuidCase, idUserFromToken]
    }

    return await StorageTherapeuticPlan.getActivities(query, values)
}


module.exports = TherapeuticPlanService;