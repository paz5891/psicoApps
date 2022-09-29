const { validationResult } = require('express-validator');
const ServiceState = require('../services/state_service');
const http = require('../lib/utils/status.response');
const respondError = require('./respond');
const dbErrors = require('../lib/utils/database.errors')

const contState = {};

contState.create = async(req, res) => {
    const errorsrex = validationResult(req)
    if (!errorsrex.isEmpty()) {
        return res.status(http.StatusBadRequest).json({ errorsrex: errorsrex.array() });
    }

    try {
        let result = await ServiceState.create(req.body)
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
                    message: "No puede crear dos trastornos del mismo tipo",
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

contState.update = async(req, res) => {
    const errorsrex = validationResult(req)
    if (!errorsrex.isEmpty()) {
        return res.status(http.StatusBadRequest).json({ errorsrex: errorsrex.array() });
    }

    try {
        let result = await ServiceState.update(req.body, req.params.uuid)
        console.log(req.params.uuid);
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
                    message: 'El departamento no esta registrado',
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

contState.getall = async(req, res) => {
    try {
        let results = await ServiceState.getall()
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
                    message: "No hay departamentos registrados",
                    data: []
                })
        }

        respondError(res, error)
        return
    }
}

contState.getsingle = async(req, res) => {

    try {
        let result = await ServiceState.getsingle(req.params.uuid)
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
                    message: "El departamento que esta buscando no esta registrado"
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

module.exports = contState;