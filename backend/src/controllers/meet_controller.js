const { validationResult } = require('express-validator');
const meetService = require('../services/meet_service')
const respondError = require('./respond');
const dbErrors = require('../lib/utils/database.errors')
const meetController = {}

meetController.create = async (req, res) => {
    let meet = req.body
    let uuidcase = req.params.uuidcase

    const errorsrex = validationResult(req)
    if (!errorsrex.isEmpty()) {
        return res.status(http.StatusBadRequest).json({
            ok: false,
            message: { errorsrex: errorsrex.array() },
            data: []
        });
    }

    try {
        let results = await meetService.create(meet, uuidcase)
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
                    message: "El o los registros asociados no son validos o no existen",
                    data: []
                })
        }

        if (error.code == dbErrors.SIZE_EXCEEDED) {
            return res
                .status(400)
                .json({
                    ok: false,
                    message: "El tamaño del contenido supera lo esperado",
                    data: []
                })
        }


        if (error.code == 1292) {
            return res
                .status(400)
                .json({
                    ok: false,
                    message: "Los tipos de datos no coinciden con lo esperado",
                    data: []
                })

        }

        if (error.code == 1452) {
            return res
                .status(400)
                .json({
                    ok: false,
                    message: "Los datos asociados no coinciden",
                    data: []
                })

        }

        respondError(res, error)
        return
    }
}

meetController.getManyByCase = async (req, res) => {
    let byTherapeutic = req.query.therapeutic
    let byCase = req.query.case

    if (!byTherapeutic && !byCase) {
        return res
            .status(400)
            .json({
                ok: false,
                message: "Unexcpeted query in the request",
                data: []
            })
    }


    try {
        let results;

        if (byCase) {
            results = await meetService.getManyByCase(byCase.split(' ')[0].trim(), req.user.id, req.user.rol)
        } else {
            results = await meetService.getManyByTherapeuticActivity(byTherapeutic.split(' ')[0].trim(), req.user.id, req.user.rol)
        }

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
                    message: "Ningun registro fue encontrado",
                    data: []
                })
        }

        respondError(res, error)
        return
    }
}

meetController.getOnlyByCase = async (req, res) => {
    let uuidcase = req.params.uuidcase
    let uuidmeet = req.params.uuidmeet

    try {
        let results = await meetService.getOnlyByCase(uuidcase, uuidmeet, req.user.id, req.user.rol)
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
                    message: "Ningun registro fue encontrado",
                    data: []
                })
        }

        respondError(res, error)
        return
    }
}

meetController.update = async (req, res) => {
    let meet = req.body
    let uuidmeet = req.params.uuidmeet
    try {
        let results = await meetService.update(meet, uuidmeet, req.user.id)
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
                    message: "El o los registros asociados no son validos o no existen",
                    data: []
                })
        }

        if (error.code == dbErrors.SIZE_EXCEEDED) {
            return res
                .status(400)
                .json({
                    ok: false,
                    message: "El tamaño del contenido supera lo esperado",
                    data: []
                })
        }


        if (error.code == 1292) {
            return res
                .status(400)
                .json({
                    ok: false,
                    message: "Los tipos de datos no coinciden con lo esperado",
                    data: []
                })

        }

        respondError(res, error)
        return
    }
}

meetController.delete = async (req, res) => {
    let uuidmeet = req.params.uuidmeet
    try {
        let results = await meetService.delete(uuidmeet, req.user.id)
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
                    message: "El o los registros asociados no son validos o no existen",
                    data: []
                })
        }

        respondError(res, error)
        return
    }
}
module.exports = meetController