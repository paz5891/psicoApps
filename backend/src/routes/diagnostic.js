const router = require('express').Router()
const Diagnostic = require('../controllers/diagnosedproblem_controller')
const { uploadFileS3, uploadFile } = require('../middlewares/uploadfile')
const { rexNewDiagnostic } = require('../lib/utils/rex')

router.get('/', Diagnostic.getAll)
router.post('/:uuid', uploadFileS3.single('descriptionOfProblemFile'), rexNewDiagnostic, uploadFile, Diagnostic.create)
router.put('/:uuid', uploadFileS3.single('descriptionOfProblemFile'), rexNewDiagnostic, uploadFile, Diagnostic.update)

router.get('/disorders', Diagnostic.getdsm)
router.get('/:uuid', Diagnostic.getdiagnosed)
router.get('/single/:uuid', Diagnostic.getsinglediagnosed)
module.exports = router;