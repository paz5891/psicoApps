const uuid = require('uuid')
const moment = require('moment-timezone');
const Case = require('../models/ncase.model')
const nId = require('../lib/utils/uuid_psa')
const storageCase = require('../storage/case_storage')
const storageAssigment = require('../storage/caseassigment_storage')
const notifyMail = require('./notification.mail')

const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();

const CaseService = {}


CaseService.create = async (dataCase, idFromTokenUser) => {
    var cases = new Case()
    cases = dataCase

    cases.reasonForConsultation = entities.decode(dataCase.reasonForConsultation)
    cases.uuid = uuid.v4()
    cases.uuidOwnerUser = idFromTokenUser
    cases.caseNumber = await nId.generate('PAC_Case', 'PSACSE')
    cases.creationDate = new Date()
    cases.desisted = 0

    return await storageCase.create(cases)

}

CaseService.update = async (uuidCase, dataUpd, idFromTokenUser) => {
    console.log(1)
    /** Data para actualizar el caso */
    var update_data = new Case()
    update_data = dataUpd
    update_data.reasonForConsultation = entities.decode(dataUpd.reasonForConsultation)
    update_data.uuid = uuidCase
    update_data.uuidOwnerUser = idFromTokenUser

    /** Datos para registrar el assigmentHistory */
    let dataAssigment = {};
    dataAssigment.uuid = uuid.v4()
    dataAssigment.uuidCase = uuidCase
    dataAssigment.dateEvent = moment().tz("America/Guatemala").format()
    dataAssigment.uuidToPersonUser = update_data.uuidAssignedUser
    dataAssigment.uuidAprovePersonAdmin = idFromTokenUser
    dataAssigment.comment = 'Cambio de estado de asignación de usuario del caso'

    return await storageCase.getDataUserCase(uuidCase)
        .then(async data => {
            dataAssigment.uuidFromPersonUser = data.uuidAssignedUser
            return storageCase.update(update_data)
                .then(async data => {
                    return storageAssigment.createAuditAssigment(dataAssigment, update_data)
                })
        })

}

CaseService.get = async (idFromTokenUser) => {
    return await storageCase.get(idFromTokenUser)
}

CaseService.getid = async (_uuid,UserInfo) => {
    return await storageCase.getid(_uuid,UserInfo)
}

CaseService.getstage = async () => {
    return await storageCase.getstage()
}

CaseService.getpersonuser = async (active,retired) => {
    return await storageCase.getpersonuser(active,retired)
}

CaseService.getpersonpatient = async () => {
    return await storageCase.getpersonpatient()
}

CaseService.filter = async (FilterCase, idFromTokenUser, rol) => {
    let CaseFilter = FilterCase

    var query = `SELECT * FROM grid_casos `

    if (rol == 'admin') {
        /** Casos en general por filtros y orden */

        switch (CaseFilter.filter) {
            case '1':
                if (CaseFilter.order == 1 || CaseFilter.order == 0) {
                    query += `  ORDER BY age ASC;`
                } else {
                    if (CaseFilter.order == 2) {
                        query += ` ORDER BY age DESC;`
                    }
                }

                break;

            case '2':
                if (CaseFilter.order == 1 || CaseFilter.order == 0) {
                    query += ` ORDER BY creationDate ASC;`
                } else {
                    if (CaseFilter.order == 2) {
                        query += ` ORDER BY creationDate DESC;`
                    }
                }
                break;

            case '3':
                query += ` WHERE uuidAssignedUser = NULL; `
                break;

            case '4':
                query += ` WHERE desisted = TRUE; `
                break;

            default:
                query += `;`
                break;
        }


    } else {
        /** Casos por usuario, filtros y orden */
        if (CaseFilter.order < 0 || CaseFilter.order > 2) {
            throw {
                code: 401
            }
        }

        switch (CaseFilter.filter) {
            case '1':
                if (CaseFilter.order == 1 || CaseFilter.order == 0) {
                    query += ` WHERE uuidAssignedUser='${idFromTokenUser}'AND desisted = 0  ORDER BY age ASC;`
                } else {
                    if (CaseFilter.order == 2 || CaseFilter.order == 0) {
                        query += ` WHERE uuidAssignedUser='${idFromTokenUser}'AND desisted = 0 ORDER BY age DESC;`
                    }
                }

                break;

            case '2':
                if (CaseFilter.order == 1 || CaseFilter.order == 0) {
                    query += ` WHERE uuidAssignedUser='${idFromTokenUser}'AND desisted = 0 ORDER BY creationDate ASC;`
                } else {
                    if (CaseFilter.order == 2 || CaseFilter.order == 0) {
                        query += ` WHERE uuidAssignedUser='${idFromTokenUser}'AND desisted = 0 ORDER BY creationDate DESC;`
                    }
                }
                break;

            default:
                query += ` WHERE uuidAssignedUser='${idFromTokenUser}' AND desisted = 0;`
                break;
        }

    }

    /*    todos 0,0
       edad 1, 1 o 2
       fecha 2, 1 o 2
       assigner 3,0
       desisted 4,0 */

    return await storageCase.filter(query)

}

CaseService.getManyByFilter = async (value, uuidUserFromToken, rol) => {

    let query = `
        SELECT * FROM grid_casos WHERE  `
    let values;
    value = '%' + value + '%'

    if (rol == 'admin') {
        query += `
        uuid like ?
        OR caseNumber like ?
        OR CONCAT(firstNamePatient, '', secondPatient, '', lastNamePatient, '', secondNamePatient) like ?;`
        values = [value, value, value]
    } else {
        query += `
    (
        uuid like ?
        AND uuidAssignedUser = ?
    )
    OR (
        caseNumber like ?
        AND uuidAssignedUser = ?
    )
    OR (
        CONCAT(
            firstNamePatient,
            '',
            secondPatient,
            '',
            lastNamePatient,
            '',
            secondNamePatient
        ) like ?
        AND uuidAssignedUser = ?
    );`
        values = [value, uuidUserFromToken, value, uuidUserFromToken, value, uuidUserFromToken]
    }

    return await storageCase.getManyByFilter(query, values)
}

CaseService.getCasesPatient = async (uuid) => {
    return await storageCase.getCasesPatient(uuid)
}


CaseService.desistmentCaseByUser = async (uuidCase, uuidUserFromToken) => {
    return await storageCase.desistmentCase(uuidCase, uuidUserFromToken)
}

CaseService.dessistmentApproved = async (aproved, uuidCase) => {
    return await storageCase.getDataUserCase(uuidCase)
        .then(async data => {

            if (aproved) {
                notifyMail.desistmentIsAproved(data)
                return true
            } else {
                return storageCase.deniedDesistmentCase(uuidCase)
                    .then(() => {
                        notifyMail.deniedDesistmentCase(data)
                        return true
                    })
            }

        })
}
module.exports = CaseService
