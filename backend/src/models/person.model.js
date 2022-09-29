const Attendant = require('./attendant.model')

/**
 * Represent a model of the Person.
 * 
 * @param {string} uuid varchar(36) PK 
 * @param {string} id varchar(20) autogenerate
 * @param {string} firstName text 
 * @param {string} secondName text 
 * @param {string} lastName text 
 * @param {string} secondLastName text 
 * @param {string} marriedName text 
 * @param {Date} bornDate datetime 
 * @param {string} uuidRole varchar(36) 
 * @param {string} dateNameUpdated datetime 
 * @param {string} mobilePhone varchar(15) 
 * @param {string} email varchar(320)
 * @param {string} commentary string
 */

class Person extends Attendant {

    constructor(
        uuidPerson,
        id,
        firstName,
        secondName,
        lastName,
        secondLastName,
        marriedName,
        bornDate,
        uuidRole,
        dateNameUpdated,
        mobilePhone,
        email,
        gender,
        uuidReligion,
        active,
        changeFile
    ) {
        super();
        this.uuid = uuidPerson
        this.id = id
        this.firstName = firstName
        this.secondName = secondName
        this.lastName = lastName
        this.secondLastName = secondLastName
        this.marriedName = marriedName
        this.bornDate = bornDate
        this.uuidRole = uuidRole
        this.dateNameUpdated = dateNameUpdated
        this.mobilePhone = mobilePhone
        this.email = email
        this.gender = gender


        this.uuidReligion = uuidReligion
        this.active = active
        this.changeFile = changeFile
    }
}


module.exports = Person;