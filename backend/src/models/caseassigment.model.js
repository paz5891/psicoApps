/**
 * @param uuid varchar(36) PK 
 * @param uuidCase varchar(36) 
 * @param dateEvent datetime 
 * @param uuidFromPersonUser varchar(36) 
 * @param uuidToPersonUser varchar(36) 
 * @param uuidAprovePersonAdmin varchar(36) 
 * @param comment varchar(500)
 */

class CaseHistory {
    constructor(
        uuid,
        uuidCase,
        dateEvent,
        uuidFromPersonUser,
        uuidToPersonUser,
        uuidAprovePersonAdmin,
        comment
    ) {
        this.uuid = uuid
        this.uuidCase = uuidCase
        this.dateEvent = dateEvent
        this.uuidFromPersonUser = uuidFromPersonUser
        this.uuidToPersonUser = uuidToPersonUser
        this.uuidAprovePersonAdmin = uuidAprovePersonAdmin
        this.comment = comment
    }
}

module.exports = CaseHistory