const { validationResult } = require('express-validator');
const CaseService = require('../services/case_service')
const http = require('../lib/utils/status.response')
const respondError = require('./respond');
const dberrors = require('../lib/utils/database.errors')


const handCase = {}

handCase.create = async (req, res) => {
    const errorsrex = validationResult(req)
    if (!errorsrex.isEmpty()) {
        return res.status(http.StatusBadRequest).json({ errorsrex: errorsrex.array() });
    }

    try {
        let result = await CaseService.create(req.body, req.user.id)
        return res
            .status(http.StatusOK)
            .json({
                ok: true,
                data: result
            })
    } catch (error) {
        if (error == 1452) {
            return res
                .status(http.StatusBadRequest)
                .json({
                    ok: false,
                    message: "Su petición está incompleta o los datos asociados son incorrectos",
                    data: []
                })
        }

        if (error == dberrors.SIZE_EXCEEDED) {
            return res
                .status(http.StatusBadRequest)
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

handCase.update = async (req, res) => {
    const errorsrex = validationResult(req)
    if (!errorsrex.isEmpty()) {
        return res.status(http.StatusBadRequest).json({ errorsrex: errorsrex.array() });
    }

    let id = req.params.id
    if (!id) {
        return res
            .status(http.StatusBadRequest)
            .json({
                ok: false,
                message: "Unexcpeted id in the request",
                data: []
            })
    }

    try {
        let result = await CaseService.update(id, req.body, req.user.id)
        return res
            .status(http.StatusOK)
            .json({
                ok: true,
                message: "El registro ha sido actualizado correctamente",
                data: result
            })
    } catch (error) {
        if (error.code == http.StatusNotFound) {
            return res
                .status(http.StatusNotFound)
                .json({
                    ok: false,
                    message: "El registro no ha sido encontrado!",
                    data: []
                })
        }

        if (error.code == dberrors.ErrForeignKeyViolation) {
            return res
                .status(http.StatusBadRequest)
                .json({
                    ok: false,
                    message: "Los datos asociados son incorrectos",
                    data: []
                })
        }

        if (error.code == dberrors.SIZE_EXCEEDED) {
            return res
                .status(http.StatusBadRequest)
                .json({
                    ok: false,
                    message: "El tamaño de los campos no es correcto",
                    data: []
                })
        }

        
        if (error.code == dberrors.NOT_NULL) {
            return res
                .status(http.StatusBadRequest)
                .json({
                    ok: false,
                    message: "Su request está incompleta",
                    data: []
                })
        }

        respondError(res, error)
        return
    }
}

handCase.get = async (req, res) => {
    console.log(req.user)
    try {
        let result = await CaseService.get(req.user.id)
        return res
            .status(http.StatusOK)
            .json({
                ok: true,
                message: "Solicitud exitosa",
                data: result
            })
    } catch (error) {
        if (error == http.StatusNotFound) {
            return res
                .status(http.StatusNotFound)
                .json({
                    ok: false,
                    message: "Ningún registro ha sido encontrado!",
                    data: []
                })
        }

        respondError(w, error)
    }
}

handCase.getid = async (req, res) => {
    let id = req.params.uuid
    if (!id) {
        return res
            .status(http.StatusBadRequest)
            .json({
                ok: false,
                message: "Unexcpeted id in the request",
                data: []
            })
    }
    try {
        let result = await CaseService.getid(id,req.user)

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
                    message: "Verificar que el uuid esté correcto",
                    data: []
                })
        }

        respondError(res, error)
        return
    }

}

handCase.getstage = async (req, res) => {
    try {
        let result = await CaseService.getstage(req.body)
        return res
            .status(http.StatusOK)
            .json({
                ok: true,
                message: "Solicitud exitosa",
                data: result
            })
    } catch (error) {

        respondError(w, error)
    }
}

handCase.getpersonuser = async (req, res) => {
    try {
        
        let result = await CaseService.getpersonuser(req.params.active,req.params.retired)
        return res
            .status(http.StatusOK)
            .json({
                ok: true,
                message: "Solicitud exitosa",
                data: result
            })
    } catch (error) {
        respondError(res, error)
        return
    }
}

handCase.getpersonpatient = async (req, res) => {
    try {
        let result = await CaseService.getpersonpatient(req.body)
        return res
            .status(http.StatusOK)
            .json({
                ok: true,
                message: "Solicitud exitosa",
                data: result
            })
    } catch (error) {
        if (error == 404) {
            return res
                .status(http.StatusNotFound)
                .json({
                    ok: false,
                    message: "Ningun registro encontrado",
                    data: []
                })
        }

        respondError(w, err)
        return
    }
}

handCase.filter = async (req, res) => {
    dataFilter = req.params
    try {
        let result = await CaseService.filter(dataFilter, req.user.id, req.user.rol)
        return res
            .status(http.StatusOK)
            .json({
                ok: true,
                message: "Consulta exitosa",
                data: result
            })

    } catch (error) {
        if (error.code == http.StatusNotFound) {
            return res
                .status(http.StatusNotFound)
                .json({
                    ok: false,
                    message: "Registros no encontrados",
                    data: []
                })
        }

        if (error.code == 401) {
            return res
                .status(http.StatusUnauthorized)
                .json({
                    ok: false,
                    message: "Acceso no autorizado",
                    data: []
                })
        }

        respondError(res, error)
        return
    }

}

handCase.getManyByFilter = async (req, res) => {
    let value = req.query

    try {
        let results = await CaseService.getManyByFilter(value.filter, req.user.id, req.user.rol)
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
                    message: "Ningun registro encontrado",
                    data: []
                })
        }

        respondError(res, error)
        return
    }

}

handCase.getCasesPatient = async (req, res) => {
    try {
        let result = await CaseService.getCasesPatient(req.params.uuid)

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
                    message: "Verificar que el uuid esté correcto",
                    data: []
                })
        }

        respondError(res, error)
        return
    }

}

handCase.desistmentCase = async (req, res) => {
    let uuidcase = req.params.uuidcase

    try {
        let results = await CaseService.desistmentCaseByUser(uuidcase, req.user.id)
        return res
            .status(http.StatusOK)
            .json({
                ok: true,
                data: results
            })

    } catch (error) {
        if (error.code == 404) {
            return res
                .status(http.StatusNotFound)
                .json({
                    ok: false,
                    message: "El registro no ha sido encontrado!",
                    data: []
                })
        }

        respondError(res, error)
        return
    }
}

handCase.aprovedDesistmentCase = async (req, res) => {
    let uuidcase = req.params.uuidcase
    let desist = req.query.desist

    try {
        desist = JSON.parse(desist)

    } catch (error) {
        
        // Return a default object, or null based on use case.
        return res.status(400)
            .json({
                ok: false,
                message: "Unexpected json at position 1",
                data: []
            })
    }

    if (typeof desist != 'boolean') {
        return res
            .status(400)
            .json({
                ok: false,
                message: 'El query enviado no es correcto',
                data: []
            })
    }

    try {
        let results = await CaseService.dessistmentApproved(desist, uuidcase)
        return res
            .status(http.StatusOK)
            .json({
                ok: true,
                data: results
            })
    } catch (error) {

        if (error.code == 404) {
            return res
                .status(http.StatusNotFound)
                .json({
                    ok: false,
                    message: "El registro no ha sido encontrado!",
                    data: []
                })
        }

        respondError(res, error)
        return
    }
}

function parseJSONSafely(str) {
    try {
        return JSON.parse(str);
    }
    catch (e) {
        console.err(e);
        // Return a default object, or null based on use case.
        return {
            ok: false,
            message: "Unexpected json at position 1"
        }
    }
}
module.exports = handCase;