/**
 * @param uuid varchar(36) PK 
 * @param uuidCase varchar(36) 
 * @param uuidTherapeuticPlanActivity varchar(36) 
 * @param title varchar(100) 
 * @param beginDate datetime 
 * @param endDate datetime 
 * @param latitude varchar(15) 
 * @param longitude
 */

class Meeting {

    constructor(
        uuid,
        uuidCase,
        uuidTherapeuticPlanActivity,
        title,
        beginDate,
        endDate,
        latitude,
        longitude
    ) {
        this.uuid = uuid
        this.uuidCase = uuidCase
        this.uuidTherapeuticPlanActivity = uuidTherapeuticPlanActivity
        this.title = title
        this.beginDate = beginDate
        this.endDate = endDate
        this.latitude = latitude
        this.longitude = longitude
    }
}

module.exports = Meeting;