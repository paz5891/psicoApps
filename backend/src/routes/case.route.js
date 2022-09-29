const router = require('express').Router()
const { filter, getManyByFilter } = require('../controllers/case_controller')
const casestageController = require('../controllers/casestage_controller')
const stageHistoryController = require('../controllers/casestagehistory_controller')
const { uploadFileS3, uploadFile } = require('../middlewares/uploadfile')
const CRUDcase = require('../controllers/case_controller')
const CommentController = require('../controllers/casecomments_controller')
const { Admin } = require('../middlewares/middle.admin')
const { rexCase } = require('../lib/utils/rex')
const casecomentaryController = require('../controllers/casecomments_controller')

// Filtro de casos
router.get('/filter/:filter/:order?*', filter)
router.get("/byfilter", getManyByFilter)

// Solicitudes de metodos crud de casos
router.post('/', rexCase, Admin, CRUDcase.create)
router.put('/:id', rexCase, Admin, CRUDcase.update)
router.get('/', CRUDcase.get)
router.get('/viewcase/:uuid', CRUDcase.getid)

// Solicitudes de validación de estados
router.get('/stage/allstages', CRUDcase.getstage)
router.get('/stage/:uuidcase', casestageController.getStageCase)

/**Solicitudes de entidades asociados al caso */
router.get('/personpatient', CRUDcase.getpersonpatient)
router.get('/case/casespatient/:uuid', CRUDcase.getCasesPatient)

/** Verificación de fases */
router.post('/verifyinitialstage/:uuidcase', casestageController.changeCaseStageToDagnostic)
router.all('/verifydiagnostic/:uuidcase', casestageController.changeCaseStageToIntermediate)
router.all('/verifyintermediate/:uuidcase', casestageController.caseIntermediateIsOk)
// router.all('/verifyintermediate/:uuidcase', )

/** Auditoria para cambio de fases */
router.post('/stagehistory/:uuidcase', uploadFileS3.single('attachment'), uploadFile, stageHistoryController.create)

router.put('/desistment/:uuidcase', CRUDcase.desistmentCase)
router.put('/desistment/confirm/:uuidcase', Admin, CRUDcase.aprovedDesistmentCase)

/** Comentarios del caso para la etapa de seguimiento */
router.get('/:uuidcase/comments', CommentController.getAll)
router.get('/comments/:uuidcomment', CommentController.getOne)
router.put('/comments/:uuidcomment', uploadFileS3.single('attachment'), uploadFile, CommentController.update)

module.exports = router;
