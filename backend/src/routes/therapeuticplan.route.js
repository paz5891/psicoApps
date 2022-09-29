const Router = require('express').Router()
const handTherapeuticplan = require('../controllers/therapeuticplan_controller')
const { uploadFieldsFilesS3, manyUploadFile, multipleUploadFile } = require('../middlewares/uploadfile')
const { filesTherapeuticPlan } = require('../lib/utils/rextherapeuticplan.file')
const { rexTherapeuticPlan } = require('../lib/utils/rex')


Router.post('/:uuid', uploadFieldsFilesS3.fields(filesTherapeuticPlan), rexTherapeuticPlan, manyUploadFile, handTherapeuticplan.create)
Router.put('/:uuidCaseinitial/:uuid', uploadFieldsFilesS3.fields(filesTherapeuticPlan), multipleUploadFile, handTherapeuticplan.update)

Router.get('/:uuidcase/:uuidactivity', handTherapeuticplan.getOnlyActivity)
Router.get('/:uuidcase', handTherapeuticplan.getActivities)
module.exports = Router;