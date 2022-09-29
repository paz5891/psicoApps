const Router = require('express').Router()
const handCaseInitial = require('../controllers/caseinitial_controller')
const { uploadFieldsFilesS3, multipleUploadFile } = require('../middlewares/uploadfile')
const {Auth}  = require('../middlewares/auth')
const {Admin} = require('../middlewares/middle.admin')
const { filesCaseInitial } = require('../lib/utils/rex.files')

Router.post('/initial/:uuid', uploadFieldsFilesS3.fields(filesCaseInitial), multipleUploadFile, handCaseInitial.create)
Router.get('/initial', Admin, handCaseInitial.getAll)
Router.get('/initial/:uuid', handCaseInitial.getOnly)

Router.use('/initial/testingapplication', require('./testingapp.route'))
Router.use('/initial/testtype', require('./testtype.route'))

module.exports = Router;