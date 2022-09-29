/**
 * @param {string} uuid varchar(36) PK 
 * @param {string} uuidState varchar(36) 
 * @param {string} name varchar(50)
 */

class City {
    constructor(
        uuid,
        uuidState,
        name
    ) {
        this.uuid = uuid,
            this.uuidState = uuidState,
            this.name = name
    }
}

module.exports = City;