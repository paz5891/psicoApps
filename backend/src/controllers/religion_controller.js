const { validationResult } = require('express-validator');
const ServiceReligion = require('../services/religion_service');
const http = require('../lib/utils/status.response');
const respondError = require('./respond');
const dbErrors = require('../lib/utils/database.errors')

const religion = {};

religion.create = async(req, res) => {
    const errorsrex = validationResult(req)
    if (!errorsrex.isEmpty()) {
        return res.status(http.StatusBadRequest).json({ errorsrex: errorsrex.array() });
    }

    try {
        let result = await ServiceReligion.create(req.body)
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
                    message: "No puede haber dos religiones iguales",
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

religion.update = async(req, res) => {
    const errorsrex = validationResult(req)
    if (!errorsrex.isEmpty()) {
        return res.status(http.StatusBadRequest).json({ errorsrex: errorsrex.array() });
    }

    try {
        let result = await ServiceReligion.update(req.body, req.params.uuid)
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
                    message: 'El trastorno no existe',
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

religion.getall = async(req, res) => {
    try {
        let results = await ServiceReligion.getall()
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
                    message: "No se ha agregado ningún trastorno",
                    data: []
                })
        }

        respondError(res, error)
        return
    }
}

religion.getsingle = async(req, res) => {

    try {
        let result = await ServiceReligion.getsingle(req.params.uuid)
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
                    message: "La religión no ha sido agregada o no existe"
                })
        }

        if (error.code == 404) {
            return res
                .status(404)
                .json({
                    ok: false,
                    message: "El identificador de la religión es incorrecto",
                    data: []
                })
        }

        respondError(res, error)
        return
    }
}
module.exports = religion;