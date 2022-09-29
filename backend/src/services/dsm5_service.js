const uuid = require('uuid')
const StorageDsm5 = require('../storage/dsm5_storage');
const dsm = require('../models/dsm5.model');

const ServiceDSM5 = {};

ServiceDSM5.create = async (data) => {
    var info = new dsm()
    info = data

    info.uuid = uuid.v4()

    return await StorageDsm5.create(data);
}

ServiceDSM5.update = async (updata, uuid) => {
    var dsmdata = new dsm()
    dsmdata = updata
    dsmdata.uuid = uuid


    return await StorageDsm5.update(dsmdata)
}

ServiceDSM5.getdsm = async () => {
    return await StorageDsm5.getdsm()
}

ServiceDSM5.getsingle = async (uuid) => {
    return await StorageDsm5.getsingle(uuid)
}

module.exports = ServiceDSM5;