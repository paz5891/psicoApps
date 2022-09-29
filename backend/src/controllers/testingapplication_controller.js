const { validationResult } = require('express-validator');
const SerTestApp = require('../services/testingapplication_service')
const CaseInitialStage = require('../models/caseinitial.model')
const { deleteFromS3 } = require('../middlewares/uploadfile')
const respondError = require('./respond');
const testingApplication = {}

testingApplication.create = async (req, res) => {
    const errorsrex = validationResult(req)
    if (!errorsrex.isEmpty()) {
        deleteFromS3(req.filename)
        return res.status(http.StatusBadRequest).json({ errorsrex: errorsrex.array() });
    }

    let testAppData = new CaseInitialStage()
    testAppData = req.body
    testAppData.testingApplicationFile = req.filename

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
        let result = await SerTestApp.create(testAppData, uuid)
        
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
                message: "No puede crear dos pruebas del mismo tipo",
                data: []
            })
        }
        respondError(res, error)
        return
    }

}


testingApplication.update = async (req, res) => {
    const errorsrex = validationResult(req)
    if (!errorsrex.isEmpty()) {
        deleteFromS3(req.filename)
        return res.status(http.StatusBadRequest).json({ errorsrex: errorsrex.array() });
    }

    let testAppData = new CaseInitialStage()
    testAppData = req.body

    if (req.filename && testAppData.changefile) {
        testAppData.testingApplicationFile = req.filename
        testAppData.changefile = testAppData.changefile
    } else {
        testAppData.testingApplicationFile = testAppData.changefile
        testAppData.changefile = undefined
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
        let result = await SerTestApp.update(testAppData, uuid, req.user.id)
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

testingApplication.getAll = async (req, res) => {
    try {
        let results = await SerTestApp.getall(req.user.rol)
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


testingApplication.gettestingapplication = async (req, res) => {

    try {
        let result = await SerTestApp.gettestingapplication(req.params.uuid, req.user.id, req.user.rol)

        return res
            .status(http.StatusOK)
            .json({
                ok: true,
                data: result
            })

    } catch (error) {
        
        if(error.code){
            return res
                .status(http.StatusNotFound)
                .json({
                    ok: false,
                    message: "Los datos asociados no existe",
                    data: []
                })
        }

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

testingApplication.testType = async (req, res) => {
    try {
        let result = await SerTestApp.testType()
        
        return res
            .status(200)
            .json({
                ok: true,
                data: result
            })
    } catch (error) {
        respondError(res, error)
        return
    }
}



testingApplication.getsingletestingapplication = async (req, res) => {

    try {
        let result = await SerTestApp.getsingletestingapplication(req.params.uuidcase, req.params.uuidtestingapplication, req.user.id, req.user.rol)

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
module.exports = testingApplication;