const { validationResult } = require('express-validator');
const ServiceTestType = require('../services/testtype_service');
const http = require('../lib/utils/status.response');
const respondError = require('./respond');
const dbErrors = require('../lib/utils/database.errors')

const handTestType = {};

handTestType.create = async(req, res) => {
    const errorsrex = validationResult(req)
    if (!errorsrex.isEmpty()) {
        return res.status(http.StatusBadRequest).json({ errorsrex: errorsrex.array() });
    }
    try {
        let result = await ServiceTestType.create(req.body)
        return res
            .status(http.StatusOK)
            .json({
                ok: true,
                message: "solicitud exitosa"
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

        if (error.code == 409) {
            return res
                .status(409)
                .json({
                    ok: false,
                    message: "No puede crear el mismo tipo de prueba",
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
        respondError(res, error)
        return
    }

}

handTestType.update = async(req, res) => {
    const errorsrex = validationResult(req)
    if (!errorsrex.isEmpty()) {
        return res.status(http.StatusBadRequest).json({ errorsrex: errorsrex.array() });
    }

    try {
        let result = await ServiceTestType.update(req.body, req.params.uuid)
        return res
            .status(http.StatusOK)
            .json({
                ok: true,
                message: "solicitud exitosa",
                data: result
            })
    } catch (error) {
        if (error.error == 404) {
            return res
                .status(404)
                .json({
                    ok: false,
                    message: 'El tipo de prueba no existe',
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

        respondError(res, error.error)
        return
    }

}

handTestType.gettesttype = async(req, res) => {
    try {
        let results = await ServiceTestType.gettesttype()
        return res
            .status(http.StatusOK)
            .json({
                ok: true,
                data: results
            })
    } catch (error) {

        if (error == http.StatusNotFound) {
            return res
                .status(http.StatusNotFound)
                .json({
                    ok: false,
                    message: "No se ha agregado ningún tipo de prueba",
                    data: []
                })
        }

        respondError(res, error)
        return
    }
}

handTestType.getsingle = async(req, res) => {

    try {
        let result = await ServiceTestType.getsingle(req.params.uuid)
        return res
            .status(http.StatusOK)
            .json({
                ok: true,
                data: result
            })

    } catch (error) {

        if (error == http.StatusNotFound) {
            return res
                .status(http.StatusNotFound)
                .json({
                    ok: false,
                    message: "El tipo de prueba no ha sido agregado o no existe"
                })
        }

        if (error.code == 404) {
            return res
                .status(404)
                .json({
                    ok: false,
                    message: "El tipo de prueba que esta buscando no existe",
                    data: []
                })
        }

        respondError(res, error)
        return
    }
}
module.exports = handTestType;