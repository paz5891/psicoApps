/**
 * Represent a model of InitialCaseState.
 *
 * @param {string} uuid varchar(36) PK 
 * @param {string} caseNumber varchar(25) 
 * @param {string} uuidAssignedUser varchar(36) 
 * @param {string} uuidOwnerUser varchar(36) 
 * @param {string} uuidPersonPatient varchar(36) 
 * @param {string} creationDate datetime 
 * @param {string} uuidStage varchar(36) 
 * @param {string} reasonForConsultation varchar(1000) 
 * @param {string} desisted tinyint(1)
 */

class Case {

    constructor(
        uuid,
        caseNumber,
        uuidAssignedUser,
        uuidOwnerUser,
        uuidPersonPatient,
        creationDate,
        uuidStage,
        reasonForConsultation,
        desisted
    ) {
        this.uuid = uuid,
        this.caseNumber = caseNumber,
        this.uuidAssignedUser = uuidAssignedUser,
        this.uuidOwnerUser = uuidOwnerUser,
        this.uuidPersonPatient = uuidPersonPatient,
        this.creationDate = creationDate,
        this.uuidStage = uuidStage,
        this.reasonForConsultation = reasonForConsultation,
        this.desisted = desisted
    }
}

module.exports = Case