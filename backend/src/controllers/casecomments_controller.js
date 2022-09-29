const casecomentaryService = require('../services/casecomments_service')
const { deleteFromS3 } = require('../middlewares/uploadfile')
const dberrors = require('../lib/utils/database.errors')
const respondError = require('./respond')
const casecomentaryController = {}

casecomentaryController.getAll = async (req, res) => {
    let uuidcase = req.params.uuidcase
    try {
        let results = await casecomentaryService.getAll(uuidcase, req.user.id, req.user.rol)
        return res
            .status(200)
            .json({
                ok: true,
                data: results
            })
    } catch (error) {
        if (error.code == 404) {
            return res
                .status(404)
                .json({
                    ok: false,
                    message: "Ningun registro ha sido encontrado",
                    data: []
                })
        }

        respondError(res, error)
        return
    }
}

casecomentaryController.getOne = async (req, res) => {
    let uuidcomment = req.params.uuidcomment
    try {
        let results = await casecomentaryService.getOne(uuidcomment, req.user.id, req.user.rol)
        return res
            .status(200)
            .json({
                ok: true,
                data: results
            })
    } catch (error) {
        if (error.code == 404) {
            return res
                .status(404)
                .json({
                    ok: false,
                    message: "Ningun registro ha sido encontrado",
                    data: []
                })
        }

        respondError(res, error)
        return
    }
}

casecomentaryController.update = async (req, res) => {
    let uuidcomment = req.params.uuidcomment
    let data = {}
    data.comment = req.body.comment
    data.attachment = req.filename

    if (!data.comment && !data.attachment) {
        return res
            .status(400)
            .json({
                ok: false,
                message: 'Su request está incompleta',
                data: []
            })
    }
    try {
        let results = await casecomentaryService.update(uuidcomment, req.user.id, data,req.user.rol)
        deleteFromS3(results.fileToDelete)
        return res
            .status(200)
            .json({
                ok: true,
                data: results.data
            })
    } catch (error) {
        deleteFromS3(error.fileToDelete)
        if (error.code == 404) {
            return res
                .status(404)
                .json({
                    ok: false,
                    message: "Ningun registro ha sido encontrado",
                    data: []
                })
        }

        if (error.code == dberrors.ErrForeignKeyViolation) {
            return res
                .status(400)
                .json({
                    ok: false,
                    message: "Los datos asociados son incorrectos",
                    data: []
                })
        }

        if (error.code == dberrors.SIZE_EXCEEDED) {
            return res
                .status(400)
                .json({
                    ok: false,
                    message: "El tamaño de los campos no es correcto",
                    data: []
                })
        }

        respondError(res, error)
        return
    }
}



module.exports = casecomentaryController;