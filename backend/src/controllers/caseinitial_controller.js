const http = require('../lib/utils/status.response')
const { deleteFromS3 } = require('../middlewares/uploadfile')
const respondError = require('./respond');
const CaseInitialService = require('../services/caseinitial_service')

const handCaseInitial = {}

handCaseInitial.create = async (req, res) => {
    let DataQuery;
    let uuidUserFromToken = req.user.id

    let uuid = req.params.uuid
    if (!uuid) {
        return res
            .status(http.StatusBadRequest)
            .json({
                ok: false,
                message: "Unexcpected uuid in the request",
                data: []
            })
    }

    if (req.datafiles == undefined || req.datafiles == null) {
        DataQuery = req.body
    } else {
        DataQuery = req.datafiles
    }

    if (Object.entries(DataQuery).length === 0 ) {
        return res
            .status(http.StatusBadRequest)
            .json({
                ok: false,
                message: "El formato enviado es incorrecto o su request está vacía",
                data: []
            })
    }
    
    try {
        let results = await CaseInitialService.generateQuery(DataQuery, uuid, uuidUserFromToken)
        deleteFromS3(results.fileToDelete)
        return res
            .status(http.StatusOK)
            .json({
                ok: true,
                data: results.results
            })

    } catch (error) {
        deleteFromS3(error.fileToDelete)
        if (error.error == 404) {
            return res
                .status(http.StatusNotFound)
                .json({
                    ok: false,
                    message: "El registro no fue encontrado",
                    data: []
                })
        }

        respondError(res, error)
        return
    }

}

handCaseInitial.getAll = async (req, res) => {
    let rol = req.user.rol
    try {
        let results = await CaseInitialService.getAll()
        return res
            .status(http.StatusOK)
            .json({
                ok: true,
                data: results
            })
    } catch (error) {

        if (error == 404) {
            return res
                .status(http.StatusNotFound)
                .json({
                    ok: false,
                    error: 'Ningún registro encontrado!',
                    data: []
                })
        }

        respondError(res, error)
        return
    }
}

handCaseInitial.getOnly = async (req, res) => {
    let uuidUserFromToken = req.user.id
    let rol = req.user.rol

    let uuid = req.params.uuid
    if (uuid == undefined || uuid == null) {
        return res
            .status(http.StatusBadRequest)
            .json({
                ok: false,
                message: "Unexpected uuid in the request",
                data: []
            })
    }

    try {
        let results = await CaseInitialService.getOnly(uuid, uuidUserFromToken, rol)
        return res
            .status(http.StatusOK)
            .json({
                ok: true,
                data: results
            })
    } catch (error) {

        if (error == 404) {
            return res
                .status(http.StatusNotFound)
                .json({
                    ok: false,
                    error: 'Ningún registro encontrado!',
                    data: []
                })
        }

        respondError(res, error)
        return
    }
}


module.exports = handCaseInitial;