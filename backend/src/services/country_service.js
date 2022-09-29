const uuid = require('uuid')
const StorageCountry = require('../storage/country_storage');
const Country = require('../models/country.model');

const ServiceCountry = {};

ServiceCountry.create = async(data) => {
    var info = new Country()
    info = data

    info.uuid = uuid.v4()

    console.log(data);
    return await StorageCountry.create(data);
}

ServiceCountry.update = async(updata, uuid) => {
    var info = new Country()
    info = updata
    info.uuid = uuid


    return await StorageCountry.update(info)
}

ServiceCountry.getall = async() => {
    return await StorageCountry.getall()
}

ServiceCountry.getsingle = async(id) => {
    return await StorageCountry.getsingle(id)
}

module.exports = ServiceCountry;