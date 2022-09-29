const uuid = require('uuid')
const StorageReligion = require('../storage/religion_storage');
const religion = require('../models/religion.model');

const ServiceReligion = {};

ServiceReligion.create = async (data) => {
    var info = new religion()
    info = data

    info.uuid = uuid.v4()

    return await StorageReligion.create(data);
}

ServiceReligion.update = async (updata, uuid) => {
    var religiondata = new religion()
    religiondata = updata
    religiondata.uuid = uuid


    return await StorageReligion.update(religiondata)
}

ServiceReligion.getall = async () => {
    return await StorageReligion.getall()
}

ServiceReligion.getsingle = async (uuid) => {
    return await StorageReligion.getsingle(uuid)
}

module.exports = ServiceReligion;