const ServiceCaseStageH = require('../services/casestagehistory_service')
const { deleteFromS3 } = require('../middlewares/uploadfile')
const dberrors = require('../lib/utils/database.errors')
const respondError = require('./respond')

const CaseStageHistory = {}

CaseStageHistory.create = async (req, res) => {
    let data = req.body
    let attachment = req.filename
    let uuidUserFromToken = req.user.id
    let uuidCase = req.params.uuidcase


    try {
        let results = await ServiceCaseStageH.create(data, uuidCase, uuidUserFromToken, attachment,req.user)        
        return res
            .status(201)
            .json({
                ok: true,
                data: results
            })

    } catch (error) {
        deleteFromS3(error.fileToDelete)

        if (error.code == dberrors.NOT_NULL) {
            return res
                .status(404)
                .json({
                    ok: false,
                    message: 'No se ha encontrado su registro',
                    data: []
                })
        }

        respondError(res, error)
        return
    }

}

module.exports = CaseStageHistory;