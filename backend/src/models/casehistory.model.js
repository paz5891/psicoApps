/**
 * 
 * @param uuid varchar(36) PK 
 * @param uuidCase varchar(36) 
 * @param uuidStage varchar(36) 
 * @param dateEvent datetime 
 * @param uuidPersonUser varchar(36) 
 * @param comment varchar(1000) 
 * @param attachment varchar(500)
 * 
 * 
 */

class CaseStageHistory {
    constructor(
        uuid,
        uuidCase,
        uuidStage,
        dateEvent,
        uuidPersonUser,
        comment,
        attachment,
    ) {
        this.uuid = uuid
        this.uuidCase = uuidCase
        this.uuidStage = uuidStage
        this.dateEvent = dateEvent
        this.uuidPersonUser = uuidPersonUser
        this.comment = comment
        this.attachment = attachment
    }
}

module.exports = CaseStageHistory;