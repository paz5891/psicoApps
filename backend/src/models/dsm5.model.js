/**
 * @param {string} uuid varchar(36) PK 
 * @param {string} name varchar(50) 
 * @param {string} r_description varchar(500)
 */

class Dsm {
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

module.exports = Dsm;