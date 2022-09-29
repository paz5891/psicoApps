const http = require('../lib/utils/status.response')
const { deleteFromS3 } = require('../middlewares/uploadfile')
const respondError = require('./respond');
const CaseIntermediateService = require('../services/caseintermediate_service')

const handCaseIntermediate = {}

handCaseIntermediate.create = async (req, res) => {
    let DataQuery ={};
    let uuid = req.params.uuid

    if (uuid == undefined || uuid == null) {
        return res
            .status(http.StatusBadRequest)
            .json({
                ok: false,
                message: "Unexpected uuid in the request",
                data:[]
            })
    }
    if (req.file == undefined || req.file == null) {
        DataQuery = req.body

    } else {
        DataQuery.therapeuticPlanFile = req.file.key
    }

    try {
        let results = await CaseIntermediateService.generateQueryInsert(DataQuery, uuid)
        deleteFromS3(results.fileToDelete)
        return res
            .status(http.StatusOK)
            .json({
                ok: true,
                data: results.results
            })

    } catch (error) {
        deleteFromS3(error.fileToDelete)
        if (error.code == 404) {
            return res
                .status(http.StatusBadRequest)
                .json({
                    ok: false,
                    message: 'Ningun registro encontrado!',
                    data:[]
                })
        }

        if (error.code == 1452) {
            return res
                .status(http.StatusBadRequest)
                .json({
                    ok: false,
                    message: 'Los datos asociados no son correctos',
                    data:[]
                })
        }

        respondError(res, error)
        return
    }

}

handCaseIntermediate.update = async (req, res) => {
    let DataQuery ={};
    let uuid = req.params.uuid

    if (uuid == undefined || uuid == null) {
        return res
            .status(http.StatusBadRequest)
            .json({
                ok: false,
                message: "Unexpected uuid in the request",
                data:[]
            })
    }
    if (req.file == undefined || req.file == null) {
        DataQuery = req.body

    } else {
        // DataQuery = req.file
        DataQuery.therapeuticPlanFile = req.file.key
    }

    try {
        let results = await CaseIntermediateService.generateQuery(DataQuery, uuid)
        deleteFromS3(results.fileToDelete)
        return res
            .status(http.StatusOK)
            .json({
                ok: true,
                data: results.results
            })

    } catch (error) {
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

        if (error == 401) {
            return res
                .status(http.StatusBadRequest)
                .json({
                    ok: false,
                    message: error.errmessage,
                    data:[]

                })
        }

        respondError(res, error)
        return
    }

}


handCaseIntermediate.getCaseIntermediate = async (req, res) => {
    try {
        let results = await CaseIntermediateService.getCaseIntermediate(req.params.uuidcase)
        return res
        .status(http.StatusOK)
        .json({
            ok: true, 
            data: results
        })

    } catch (error) {
        if (error == 404) {
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


module.exports = handCaseIntermediate;