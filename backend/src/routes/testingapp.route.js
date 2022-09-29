const Router = require('express').Router()
const testappController = require('../controllers/testingapplication_controller')
const { uploadFileS3, uploadFile } = require('../middlewares/uploadfile')

Router.get('/all', testappController.getAll)
Router.post('/:uuid', uploadFileS3.single('testingApplicationFile'), uploadFile, testappController.create )
Router.put('/:uuid', uploadFileS3.single('testingApplicationFile'),  uploadFile, testappController.update)

Router.get('/testtypes', testappController.testType)
Router.get('/:uuid', testappController.gettestingapplication)
Router.get('/:uuidcase/:uuidtestingapplication', testappController.getsingletestingapplication)

module.exports = Router;