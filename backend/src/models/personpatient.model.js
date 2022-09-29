/**
 * Represent a model for person patient
 * 
 * @param {string} uuid varchar(36) PK 
 * @param {string} patientNumber varchar(25) 
 */

class PersonP {
    constructor(
        uuid,
        patientNumber
    ) {
        this.uuid = uuid
        this.patientNumber = patientNumber
    }
}

module.exports = PersonP;