const moment = require('moment-timezone');
const uuid = require('uuid')
const StorePerson = require('../storage/person_storage')
const { generate } = require('../lib/utils/uuid_psa')
const Person = require('../models/person.model')

const PersonService = {}

PersonService.create = async (DataPatient) => {
    var person = new Person()
    person = DataPatient
    person.uuidPerson = uuid.v4()
    person.id = await generate('PAS_Person', 'PASP')
    person.uuidRole = 'f773d0e2-6f64-4957-8ad4-179455994849' // Rol de usuario psicólogo
    person.dateNameUpdated = moment().tz("America/Guatemala").format()
    person.uuidPersonHistory = uuid.v4()
    person.dateEvent = moment().tz("America/Guatemala").format()
    person.uuidAddress = uuid.v4()

    return await StorePerson.create(person)
}

PersonService.get = async (_uuid) => {
    return await StorePerson.get(_uuid)
}

PersonService.update = async (_id, Data) => {
    var person = new Person()
    person = Data;
    person.id = _id
    person.dateNameUpdated = moment().tz("America/Guatemala").format()
    person.dateEvent = moment().tz("America/Guatemala").format()

    return await StorePerson.update(person)
}

PersonService.delete = async (_id) => {
    return await StorePerson.delete(_id)
}

PersonService.allPersons = async () => {
    return await StorePerson.allPersons()
}

PersonService.personwithfulldata = async (id,userInfo) => {
    return await StorePerson.onlywithfulldata(id,userInfo)
}

PersonService.religion = async () => {
    return await StorePerson.religion()
}

PersonService.cities = async () => {
    return await StorePerson.cities()
}

PersonService.gridStagePerson = async (stage, userInfo) => {
    return await StorePerson.gridStagePerson(stage, userInfo)
}

PersonService.gridWithIDPerson = async (ID, userInfo) => {
    return await StorePerson.gridWithIDPerson(ID + '%', userInfo)
}
module.exports = PersonService;