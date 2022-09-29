const { validationResult } = require('express-validator');
const PersonService = require('../services/person_service')
const errors = require('../lib/utils/database.errors');
const http = require('../lib/utils/status.response')
const { deleteFromS3 } = require('../middlewares/uploadfile')
const Person = require('../models/person.model')
const respondError = require('./respond');
const s3 = require('../middlewares/uploadfile');

const handPerson = {}

handPerson.create = async (req, res) => {
    const errorsrex = validationResult(req)
    if (!errorsrex.isEmpty()) {
        deleteFromS3(req.filename)
        return res.status(http.StatusBadRequest).json({ errorsrex: errorsrex.array() });
    }

    let DataPerson = new Person()
    DataPerson = req.body;
    DataPerson.attachment = req.filename

    try {
        let ress = await PersonService.create(DataPerson)
        return res
            .status(http.StatusCreated)
            .json({
                ok: true,
                message: 'El registro ha sido creado satisfactoriamente',
                data: ress
            })

    } catch (error) {
        deleteFromS3(req.filename)
        if (error == errors.ErrDuplicateRegistry) {
            return res
                .status(http.StatusConflict)
                .json({
                    ok: false,
                    message: "El registro ya existe",
                    data: []
                })
        }

        if (error == errors.ErrForeignKeyViolation) {
            return res
                .status(http.StatusBadRequest)
                .json({
                    ok: false,
                    message: 'El registro asociado no existe!',
                    data: []
                })
        }

        if (error == 1406 || error == '1406') {
            return res
                .status(http.StatusBadRequest)
                .json({
                    ok: false,
                    message: 'La cantidad de caracteres no es correcta',
                    data: []
                })
        }
        respondError(res, error)
        return
    }

}

handPerson.read = async (req, res) => {
    try {
        let result = await PersonService.get(req.params.uuid)

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
                    message: "No existe ningun registro!",
                    data: []
                })
        }

        respondError(res, error)
        return
    }

}

handPerson.update = async (req, res) => {
    const errorsrex = validationResult(req)
    if (!errorsrex.isEmpty()) {
        deleteFromS3(req.filename)
        return res.status(http.StatusBadRequest).json({ errorsrex: errorsrex.array() });
    }

    let person = new Person();
    person = req.body;

    if (req.filename) {
        person.attachment = req.filename
        person.changeFile = person.changeFile
    } else {
        person.attachment = person.changeFile
        person.changeFile = undefined
    }

    let uuid = req.params.id

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
        let results = await PersonService.update(uuid, person)
        deleteFromS3(results.fileToDelete)
        return res
            .status(http.StatusOK)
            .json({
                ok: true,
                message: "El registro ha sido actualizado correctamente",
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


        if (error.code == 1452) {
            return res
                .status(http.StatusBadRequest)
                .json({
                    ok: false,
                    message: "Por favor ingrese un registro asociado correctamente",
                    data: []
                })
        }

        if (error.code == 1406){
            return res
                .status(http.StatusBadRequest)
                .json({
                    ok: false,
                    message: "Su petición ha superado el maximo de caracteres en algun campo",
                    data: []
                }) 
        }

        respondError(res, error)
        return
    }
}

handPerson.deletePerson = async (req, res) => {
    let id = req.params.id
    if (!id) {
        return res
            .status(http.StatusBadRequest)
            .json({
                ok: false,
                message: "Unexpected id in the request",
                data: []
            })
    }

    try {
        let results = await PersonService.delete(req.params.id)
        return res
            .status(http.StatusOK)
            .json({
                ok: true,
                message: "El registro ha sido borrado satisfactoriamente",
                data: results
            })

    } catch (error) {

        if (error == http.StatusConflict) {
            return res
                .status(http.StatusConflict)
                .json({
                    ok: false,
                    message: "El registro no puede ser borrado!, Casos asociados a este registro",
                    data: []
                })
        }

        if (error == 404) {
            return res
                .status(http.StatusNotFound)
                .json({
                    ok: false,
                    message: "Ningun registro encontrado",
                    data: []
                })
        }

        respondError(res, error);
        return
    }
}

handPerson.allPersons = async (req, res) => {
    try {
        let result = await PersonService.allPersons()

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
                    message: "No hay registros!",
                    data: []
                })
        }

        respondError(res, error)
        return
    }
}

handPerson.personwithfulldata = async (req, res) => {

    try {
        let result = await PersonService.personwithfulldata(req.params.id,req.user)

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
                    message: "No hay registros!",
                    data: []
                })
        }

        respondError(res, error)
        return
    }
}


handPerson.religion = async (req, res) => {
    try {
        let results = await PersonService.religion()
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
                    message: "Ningún registro encontrado!",
                    data: []
                })
        }

        respondError(res, error)
        return
    }
}


handPerson.cities = async (req, res) => {
    try {
        let results = await PersonService.cities()
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
                    message: "Ningún registro encontrado!",
                    data: []
                })
        }

        respondError(res, error)
        return
    }
}

handPerson.gridStagePerson = async (req, res) => {
    let stage = req.params.stage
    
    try {

        let results = await PersonService.gridStagePerson(stage,req.user);
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
                    message: "Ningún registro encontrado!",
                    data: []
                })
        }

        respondError(res, error)
        return
    }

}

handPerson.gridWithIDPerson = async (req, res) => {
    let id = req.params.id

    if (!id) {
        return res
            .status(http.StatusBadRequest)
            .json({
                ok: false,
                message: "Unexpected id in the request",
                data: []
            })
    }

    try {
        let results = await PersonService.gridWithIDPerson(id,req.user)
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
                    message: "Ningún registro encontrado!",
                    data: []
                })
        }

        respondError(res, error)
        return
    }
}

handPerson.downloadnAttachmen = async (req, res) => {
    if (req.params.filename) {
        let URL = await s3.getFile(req.params.filename)
        return res
            .status(http.StatusOK)
            .json({
                ok: true,
                url: URL
            })
    }

    return res
        .status(http.StatusBadRequest)
        .json({
            ok: false,
            message: 'El nombre de archivo no fue proporcionado o no existe',
            data: []
        })
}

module.exports = handPerson;