const { validationResult } = require('express-validator');
const http = require('../lib/utils/status.response')
const { deleteFromS3 } = require('../middlewares/uploadfile')
const deleteManyS3 = require('../middlewares/delete.awss3')
const TherapeuticPlanService = require('../services/therapeuticplan_service')
const dberrors = require('../lib/utils/database.errors')
const respondError = require('./respond');

const handTherapeuticplan = {}

handTherapeuticplan.create = async (req, res) => {

    let therapeuticbody = JSON.parse(JSON.stringify(req.body))
    let therapeuticfiles = req.datafiles
    let uuidCase = req.params.uuid
  

    const errorsrex = validationResult(req)
    if (!errorsrex.isEmpty()) {
        deleteManyS3(therapeuticfiles)
        return res.status(http.StatusBadRequest).json({
            ok: false,
            message: { errorsrex: errorsrex.array() },
            data: []
        });
    }

    if (uuidCase == undefined || uuidCase == null) {
        return res
            .status(http.StatusBadRequest)
            .json({
                ok: false,
                message: "Unexpected uuid in the request",
                data: []
            })
    }

    try {
        let results = await TherapeuticPlanService.generateQuery(therapeuticbody, therapeuticfiles, uuidCase)
        return res
            .status(http.StatusOK)
            .json({
                ok: true,
                data: results
            })

    } catch (error) {
        deleteManyS3(error.fileToDelete)

        if (error.code == dberrors.ErrForeignKeyViolation) {
            return res
                .status(http.StatusBadRequest)
                .json({
                    ok: false,
                    message: "Su solicitud está incompleta o los datos asociados son incorrectos",
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

handTherapeuticplan.update = async (req, res) => {
    let DataQuery;
    let uuid = req.params.uuid
    let uuidCaseinitial = req.params.uuidCaseinitial

    if (uuidCaseinitial == undefined || uuidCaseinitial == null || uuid == undefined || uuid == null) {
        return res
            .status(http.StatusBadRequest)
            .json({
                ok: false,
                message: "Unexpected uuid in the request",
                data: []
            })
    }

    if (req.datafiles == undefined || req.datafiles == null) {
        DataQuery = req.body
    } else {
        DataQuery = req.datafiles
    }

    if (Object.entries(DataQuery).length === 0) {
        return res
            .status(http.StatusBadRequest)
            .json({
                ok: false,
                message: "El formato enviado es incorrecto o su request está vacía",
                data: []
            })
    }

    try {
        let results = await TherapeuticPlanService.update(DataQuery, uuidCaseinitial, req.user.id, uuid)

        deleteFromS3(results.fileToDelete)
        return res
            .status(http.StatusOK)
            .json({
                ok: true,
                data: results.results
            })
    } catch (error) {
        console.log(error.fileToDelete)
        deleteFromS3(error.fileToDelete)

        if (error == 404) {
            return res
                .status(http.StatusBadRequest)
                .json({
                    ok: false,
                    message: 'Ningun registro encontrado!',
                    data: []
                })
        }


        if (error == dberrors.ErrForeignKeyViolation) {
            return res
                .status(http.StatusBadRequest)
                .json({
                    ok: false,
                    message: "Su solicitud está incompleta o los datos asociados son incorrectos",
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

handTherapeuticplan.getOnlyActivity = async (req, res) => {
    let uuidCase = req.params.uuidcase
    let uuidActivitiy = req.params.uuidactivity

    try {
        let results = await TherapeuticPlanService.getOnlyActivity(uuidCase, uuidActivitiy, req.user.id, req.user.rol)
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

handTherapeuticplan.getActivities = async (req, res) => {
    let uuidCase = req.params.uuidcase

    if (uuidCase == undefined || uuidCase == null) {
        return res
            .status(http.StatusBadRequest)
            .json({
                ok: false,
                message: "Unexpected uuid in the request",
                data: []
            })
    }

    try {
        let results = await TherapeuticPlanService.getActivities(uuidCase, req.user.id, req.user.rol)
        return res
            .status(http.StatusOK)
            .json({
                ok: true,
                data: results
            })

    } catch (error) {
        if (error.code == 404) {
            return res
                .status(http.StatusBadRequest)
                .json({
                    ok: false,
                    message: 'Ningun registro encontrado!',
                    data: []
                })
        }

        respondError(res, error)
        return
    }
}

module.exports = handTherapeuticplan;