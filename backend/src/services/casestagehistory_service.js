const uuid = require('uuid')
const moment = require('moment-timezone');
const CaseStageHistory = require("../models/casehistory.model");
const StorageStageHistory = require('../storage/casestagehistory_storage')

const StageHistoryService = {}

StageHistoryService.create = async (StageData, uuidCase, uuidUserFromToken, Attachment,userInfo) => {
    let Data = new CaseStageHistory()
    Data = StageData

    Data.uuid = uuid.v4()
    Data.uuidCase = uuidCase
    Data.dateEvent = moment().tz("America/Guatemala").format()
    Data.uuidPersonUser = uuidUserFromToken
    Data.attachment = Attachment

    return await StorageStageHistory.create(Data,userInfo)
}

module.exports = StageHistoryService;