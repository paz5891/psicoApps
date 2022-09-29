const { validationResult } = require('express-validator');
const DiagnosticSer = require('../services/diagnosedproblem_service')
const DiagnosedProblems = require('../models/diagnosedproblem.model')
const { deleteFromS3 } = require('../middlewares/uploadfile')
const respondError = require('./respond');

const handDiagnosedProblem = {}

handDiagnosedProblem.create = async (req, res) => {

    const errorsrex = validationResult(req)
    if (!errorsrex.isEmpty()) {
        deleteFromS3(req.filename)
        return res.status(http.StatusBadRequest).json({ errorsrex: errorsrex.array() });
    }

    let AppData = new DiagnosedProblems()
    AppData = req.body
    AppData.descriptionOfProblemFile = req.filename
    let uuid = req.params.uuid


    if (uuid == undefined || uuid == null) {
        deleteFromS3(req.filename)
        return res
            .status(http.StatusBadRequest)
            .json({
                ok: false,
                message: "Unexpected uuid in the request",
                data: []
            })
    }

    try {
        let result = await DiagnosticSer.create(AppData, uuid)

        return res
            .status(201)
            .json({
                ok: true,
                data: result
            })

    } catch (error) {
        deleteFromS3(error.fileToDelete)

        if (error.error == 404) {
            return res
                .status(404)
                .json({
                    ok: false,
                    message: "El o los registros asociados no son validos o no existen",
                    data: []
                })
        }

        if (error.error == 409){
            return res
            .status(409)
            .json({
                ok: false,
                message: "No puede crear dos diagnosticos del mismo tipo",
                data: []
            })
        }
        respondError(res, error)
        return
    }

}

handDiagnosedProblem.update = async (req, res) => {
    const errorsrex = validationResult(req)
    if (!errorsrex.isEmpty()) {
        deleteFromS3(req.filename)
        return res.status(http.StatusBadRequest).json({ errorsrex: errorsrex.array() });
    }

    let AppData = new DiagnosedProblems()
    AppData = req.body

    if (req.filename && AppData.changefile) {
        AppData.descriptionOfProblemFile = req.filename
        AppData.changefile = AppData.changefile
    } else {
        AppData.descriptionOfProblemFile = AppData.changefile
        AppData.changefile = undefined
    }


    let uuid = req.params.uuid


    if (uuid == undefined || uuid == null) {
        deleteFromS3(req.filename)
        return res
            .status(http.StatusBadRequest)
            .json({
                ok: false,
                message: "Unexpected uuid in the request",
                data: []
            })
    }

    try {
        let result = await DiagnosticSer.update(AppData, uuid)
        deleteFromS3(result.fileToDelete)
        return res
            .status(201)
            .json({
                ok: true,
                data: result.data
            })
    } catch (error) {
        deleteFromS3(error.fileToDelete)
        if (error.error == 404) {
            return res
                .status(404)
                .json({
                    ok: false,
                    message: 'Registro no encontrado!',
                    data: []
                })
        }

        respondError(res, error.error)
        return
    }
}


handDiagnosedProblem.getAll = async (req, res) => {
    try {
        let results = await DiagnosticSer.getall()
        return res
            .status(http.StatusOK)
            .json({
                ok: true,
                data: results
            })
    } catch (error) {
        respondError(res, error)
        return
    }
}

handDiagnosedProblem.getdsm = async (req, res) => {
    try {
        let results = await DiagnosticSer.getdsm()
        return res
            .status(http.StatusOK)
            .json({
                ok: true,
                data: results
            })
    } catch (error) {
        respondError(res, error)
        return
    }
}

handDiagnosedProblem.getdiagnosed = async (req, res) => {

    try {
        let result = await DiagnosticSer.getdiagnosed(req.params.uuid)

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
                    message: "No hay casos relacionados",
                    data: []
                })
        }

        respondError(res, error)
        return
    }
}

handDiagnosedProblem.getsinglediagnosed = async (req, res) => {

    try {
        let result = await DiagnosticSer.getsinglediagnosed(req.params.uuid)

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
                    message: "No hay casos relacionados",
                    data: []
                })
        }

        respondError(res, error)
        return
    }
}

module.exports = handDiagnosedProblem;
