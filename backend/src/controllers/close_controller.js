const { validationResult } = require('express-validator');
const CloseService = require('../services/close_service')
const http = require('../lib/utils/status.response')
const respondError = require('./respond');

const handCase = {}


handCase.create = async (req, res) => {
    const errorsrex = validationResult(req)
    if (!errorsrex.isEmpty()) {
        return res.status(http.StatusBadRequest).json({ errorsrex: errorsrex.array() });
    }

    try {
        let result = await CloseService.create(req.body, req.params.uuid, req.user.id)
        return res
            .status(http.StatusOK)
            .json({
                ok: true,
                message: "solicitud exitosa",
                data: result
            })
    } catch (error) {

        if (error.code == 404) {
            return res
                .status(404)
                .json({
                    ok: false,
                    message: "El registro no fue encontrado",
                    data: []
                })
        }

        if (error.code == 1452) {
            return res
                .status(400)
                .json({
                    ok: false,
                    message: "Los datos asociados al registro no fueron encontrados",
                    data: []
                })
        }

        if (error.code == 1062) {
            return res
                .status(409)
                .json({
                    ok: false,
                    message: "El registro ya existe",
                    data: []
                })
        }

        respondError(res, error)
        return
    }

}

handCase.update = async (req, res) => {
    const errorsrex = validationResult(req)
    if (!errorsrex.isEmpty()) {
        return res.status(http.StatusBadRequest).json({ errorsrex: errorsrex.array() });
    }

    try {
        let result = await CloseService.update(req.body, req.params.uuid)
        return res
            .status(http.StatusOK)
            .json({
                ok: true,
                message: "solicitud exitosa",
                data: result
            })
    } catch (error) {
        if (error.code == 404) {
            return res
                .status(404)
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

handCase.get = async (req, res) => {
    let uuidCase = req.params.uuid

    try {
        let results = await CloseService.get(uuidCase, req.user.id)
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
                    message: "El registro no fue encontrado",
                    data: []
                })
        }

        respondError(res, error)
        return
    }
}

module.exports = handCase;