/**
 * @param {string} uuid varchar(36) PK 
 * @param {string} name varchar(250) 
 * @param {string} r_description varchar(1000)
 */

class Religion {
    constructor(
        uuid,
        name,
        r_description
    ) {
        this.uuid = uuid,
            this.name = name,
            this.r_description = r_description
    }
}

module.exports = Religion;