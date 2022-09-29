/**
 * Model from Person User
 * 
 * @param {string} uuid varchar(36) PK 
 * @param {string} userName varchar(320) 
 * @param {string} token text 
 */

class PersonU {
    constructor(
        uuid,
        userName,
        token
    ) {
        this.uuid = uuid
        this.userName = userName
        this.token = token
    }
}

module.exports = PersonU