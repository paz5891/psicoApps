/**
 * @param {string} uuid varchar(36) PK 
 * @param {string} isoName varchar(3) 
 * @param {string} name varchar(50)
 */

class Country {
    constructor(
        uuid,
        isoName,
        name
    ) {
        this.uuid = uuid,
            this.isoName = isoName,
            this.name = name
    }
}

module.exports = Country;