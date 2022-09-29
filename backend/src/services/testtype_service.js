const uuid = require('uuid')
const StorageTestType = require('../storage/testtype_storage');
const TestType = require('../models/testtype.model');

const ServiceTestType = {};

ServiceTestType.create = async(data) => {
    var info = new TestType()
    info = data

    info.uuid = uuid.v4()

    return await StorageTestType.create(data);
}

ServiceTestType.update = async(updata, uuid) => {
    var testtypedata = new TestType()
    testtypedata = updata
    testtypedata.uuid = uuid


    return await StorageTestType.update(testtypedata)
}

ServiceTestType.gettesttype = async() => {
    return await StorageTestType.gettesttype()
}

ServiceTestType.getsingle = async(uuid) => {
    return await StorageTestType.getsingle(uuid)
}

module.exports = ServiceTestType;