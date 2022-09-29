const moment = require('moment-timezone');
const Close = require('../models/close.model')
const storageClose = require('../storage/close_storage')
const stages = require('../lib/utils/casestages')
const casestageStorage = require('../storage/casestage_storage')

const CloseService = {}

/** Crea el registro de cierre de caso y actualiza el estado a cerrado */
CloseService.create = async (data, uuidcase, uuidUserFromToken) => {
    console.log(uuidcase, uuidUserFromToken, stages[2])
    var CloseStage = new Close()
    CloseStage = data
    CloseStage.uuid = uuidcase
    CloseStage.closeDate = moment().tz("America/Guatemala").format()

    return await storageClose.allPhasesOk(uuidcase, stages[2], uuidUserFromToken)
        .then(data => {
            return storageClose.create(CloseStage)
                .then(() => {
                    return casestageStorage.updateStageCase(stages[3], uuidcase, uuidUserFromToken)
                })
        })
}

CloseService.update = async (data, uuidcase) => {
    var CloseStage = new Close()
    CloseStage = data
    CloseStage.uuid = uuidcase

    return await storageClose.update(CloseStage)
}

CloseService.get = async (uuidCase, uuidUserFromToken) => {
    return await storageClose.get(uuidCase, uuidUserFromToken)
}

module.exports = CloseService