/**
 * @param {string} uuid varchar(36) PK 
 * @param {string} uuidCountry varchar(3) 
 * @param {string} name varchar(50)
 */

class State {
    constructor(
        uuid,
        uuidCountry,
        name
    ) {
        this.uuid = uuid,
            this.uuidCountry = uuidCountry,
            this.name = name
    }
}

module.exports = State;