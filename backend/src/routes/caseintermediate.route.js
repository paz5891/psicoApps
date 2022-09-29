const Router = require('express').Router()
const handCaseIntermediate = require('../controllers/caseintermediate_controller')

const { uploadFileS3, uploadFile } = require('../middlewares/uploadfile')

/** Crud para la etapa inicial */
Router.post('/intermediate/:uuid', uploadFileS3.single('therapeuticPlanFile'), uploadFile, handCaseIntermediate.create)
Router.get('/intermediate/:uuidcase', handCaseIntermediate.getCaseIntermediate)

/** aplicación del plan terapeutico para la etapa intermedia */
Router.use('/intermediate/therapeuticplan', require('./therapeuticplan.route'))

module.exports = Router;