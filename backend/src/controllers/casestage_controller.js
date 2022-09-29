const casestageService = require('../services/casestage_service')
const dberrors = require('../lib/utils/database.errors')
const respondError = require('./respond')
const casestageController = {}


casestageController.changeCaseStageToDagnostic = async (req, res) => {
    let uuidCase = req.params.uuidcase
    let uuidTokenFromUser = req.user.id
    let rol = req.user.rol

    try {
        let results = await casestageService.changeCaseStageToDagnostic(uuidCase, uuidTokenFromUser, rol)
        return res
            .status(200)
            .json({
                ok: true,
                phase: results.no,
                data: results.id
            })
    } catch (error) {
        if (error == http.StatusNotFound) {
            return res
                .status(http.StatusNotFound)
                .json({
                    ok: false,
                    message: "El registro no ha sido encontrado!",
                    data: []
                })
        }

        if (error == dberrors.ErrForeignKeyViolation) {
            return res
                .status(http.StatusBadRequest)
                .json({
                    ok: false,
                    message: "Los datos asociados son incorrectos",
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

/** Verifica la etapa intermedia 
casestageController.changeCaseStageToDagnostic = async (req, res) => {
    let uuidCase = req.params.uuidcase
    let uuidTokenFromUser = req.user.id
    let rol = req.user.rol

    try {
        let results = await casestageService.changeCaseStageToDagnostic(uuidCase, uuidTokenFromUser, rol)
        return res
            .status(200)
            .json({
                ok: true,
                phase: results.no,
                data: results.id
            })
    } catch (error) {
        if (error == http.StatusNotFound) {
            return res
                .status(http.StatusNotFound)
                .json({
                    ok: false,
                    message: "El registro no ha sido encontrado!",
                    data: []
                })
        }

        if (error == dberrors.ErrForeignKeyViolation) {
            return res
                .status(http.StatusBadRequest)
                .json({
                    ok: false,
                    message: "Los datos asociados son incorrectos",
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
*/

/** Verifica la etapa de diagnóstico */
casestageController.changeCaseStageToIntermediate = async (req, res) => {

    let uuidCase = req.params.uuidcase
    let uuidTokenFromUser = req.user.id
    let rol = req.user.rol

    try {
        let results = await casestageService.changeCaseStageToIntermediate(uuidCase, uuidTokenFromUser, rol)
        return res
            .status(200)
            .json({
                ok: true,
                phase: results.no,
                data: results.id
            })
    } catch (error) {
        if (error == http.StatusNotFound) {
            return res
                .status(http.StatusNotFound)
                .json({
                    ok: false,
                    message: "El registro no ha sido encontrado!",
                    data: []
                })
        }

        if (error == dberrors.ErrForeignKeyViolation) {
            return res
                .status(http.StatusBadRequest)
                .json({
                    ok: false,
                    message: "Los datos asociados son incorrectos",
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

/** Verifica la etapa de diagnóstico */
casestageController.caseIntermediateIsOk = async (req, res) => {

    let uuidCase = req.params.uuidcase
    let uuidTokenFromUser = req.user.id

    try {
        let results = await casestageService.caseIntermediateIsOk(uuidCase, uuidTokenFromUser)
        return res
            .status(200)
            .json({
                ok: true,
                phase: results.no,
                data: results.id
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

        respondError(res, error)
        return
    }
}

casestageController.getStageCase = async (req, res) => {
    let uuidcase = req.params.uuidcase
    try {
        let results = await casestageService.getStageCase(uuidcase)
        return res
            .status(200)
            .json({
                ok: true,
                phase: results
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

        respondError(res, error)
        return
    }
}

module.exports = casestageController