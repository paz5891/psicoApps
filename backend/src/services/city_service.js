const uuid = require('uuid');
const StorageCity = require('../storage/city_storage');
const city = require('../models/city.model');

const ServiceCity = {}

ServiceCity.create = async(data) => {
    var info = new city()
    info = data

    info.uuid = uuid.v4()

    console.log(data);
    return await StorageCity.create(info);
}

ServiceCity.update = async(updata, uuid) => {
    var citydata = new city()
    citydata = updata
    citydata.uuid = uuid


    return await StorageCity.update(citydata)
}

ServiceCity.getall = async() => {
    return await StorageCity.getall()
}

ServiceCity.getsingle = async(uuid) => {
    return await StorageCity.getsingle(uuid)
}
module.exports = ServiceCity;