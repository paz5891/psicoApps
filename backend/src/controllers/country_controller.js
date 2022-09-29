const { validationResult } = require('express-validator');
const ServiceCountry = require('../services/country_service');
const http = require('../lib/utils/status.response');
const respondError = require('./respond');
const dbErrors = require('../lib/utils/database.errors');
const StorageCountry = require('../storage/country_storage');

const contCountry = {};

contCountry.create = async(req, res) => {
    const errorsrex = validationResult(req)
    if (!errorsrex.isEmpty()) {
        return res.status(http.StatusBadRequest).json({ errorsrex: errorsrex.array() });
    }

    try {
        let result = await ServiceCountry.create(req.body)
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

contCountry.update = async(req, res) => {
    const errorsrex = validationResult(req)
    if (!errorsrex.isEmpty()) {
        return res.status(http.StatusBadRequest).json({ errorsrex: errorsrex.array() });
    }
    console.log(req.params.uuid);
    try {
        let result = await ServiceCountry.update(req.body, req.params.uuid)
        return res
            .status(http.StatusOK)
            .json({
                ok: true,
                message: "La edición ha sido exitosa",
                data: result
            })
    } catch (error) {
        if (error.error == 404) {
            return res
                .status(404)
                .json({
                    ok: false,
                    message: 'El país que está tratando de editar no existe',
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

contCountry.getall = async(req, res) => {
    try {
        let results = await StorageCountry.getall()
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
                    message: "No se ha agregado ningún país",
                    data: []
                })
        }

        respondError(res, error)
        return
    }
}

contCountry.getsingle = async(req, res) => {

    try {
        let result = await ServiceCountry.getsingle(req.params.id)
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
                    message: "No hay ningún país registrado"
                })
        }

        if (error.code == 404) {
            return res
                .status(404)
                .json({
                    ok: false,
                    message: "El codigo del país es incorrecto",
                    data: []
                })
        }

        respondError(res, error)
        return
    }
}

module.exports = contCountry;