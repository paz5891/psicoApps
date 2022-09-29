const router = require('express').Router()
const { rexPerson } = require('../lib/utils/rex')
const { uploadFileS3, uploadFile } = require('../middlewares/uploadfile')
const pController = require('../controllers/person_controller')

router.post('/create', uploadFileS3.single('attachment'), uploadFile, rexPerson, pController.create)
router.put('/:id', uploadFileS3.single('attachment'), uploadFile, rexPerson, pController.update)
router.delete('/:id', pController.deletePerson)

router.get('/', pController.allPersons)
router.get('/:uuid', pController.read)
router.get('/fulldata/:id', pController.personwithfulldata)

router.get('/grid/:stage', pController.gridStagePerson)
router.get('/gridbyid/:id', pController.gridWithIDPerson)

module.exports = router