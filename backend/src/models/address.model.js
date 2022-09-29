const HistoryPerson = require('./history.model')
/**
 * @param {string} uuidAddress varchar(36) PK 
 * @param {string} uuidPerson varchar(36) 
 * @param {string} uuidMeeting varchar(36) 
 * @param {string} uuidCity varchar(36) 
 * @param {string} addressLine1 varchar(100) 
 * @param {string} addressLine2 varchar(100) 
 * @param {string} phoneNumber varchar(15)
 */

class Address extends HistoryPerson{

    constructor(
        uuidAddress,
        uuidPerson,
        uuidMeeting,
        uuidCity,
        addressLine1,
        addressLine2,
        phoneNumber
    ) {
        super();
        this.uuidAddress = uuidAddress
        this.uuidPerson = uuidPerson
        this.uuidMeeting = uuidMeeting
        this.uuidCity = uuidCity
        this.addressLine1 = addressLine1
        this.addressLine2 = addressLine2
        this.phoneNumber = phoneNumber
    }
    
}

module.exports = Address;