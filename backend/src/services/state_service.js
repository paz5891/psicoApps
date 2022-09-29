const uuid = require('uuid');
const StorageState = require('../storage/state_storage');
const state = require('../models/state.model');

const ServiceState = {}

ServiceState.create = async(data) => {
    var info = new state()
    info = data

    info.uuid = uuid.v4()

    return await StorageState.create(info);
}

ServiceState.update = async(updata, uuid) => {
    var statedata = new state()
    statedata = updata
    statedata.uuid = uuid

    console.log(statedata);
    return await StorageState.update(statedata)
}

ServiceState.getall = async() => {
    return await StorageState.getall()
}

ServiceState.getsingle = async(uuid) => {
    return await StorageState.getsingle(uuid)
}
module.exports = ServiceState;