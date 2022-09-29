const { body } = require('express-validator');
const rex = {}
rex.rexPerson = [
    body('firstName').not().isEmpty().trim().escape(),
    body('lastName').not().isEmpty().trim().escape(),
    body('bornDate').not().isEmpty().trim().escape(),
    body('mobilePhone').isLength({ max: 15 }),
    body('addressLine1').not().isEmpty().trim().escape(),
    body('gender').not().isEmpty().trim().escape().isLength(1)
]


rex.rexCase = [
    body('uuidAssignedUser').not().isEmpty().escape(),
    body('uuidPersonPatient').not().isEmpty().escape(),
    body('reasonForConsultation').not().isEmpty().escape()
]

rex.rexClose = [
    body('conclusion').not().isEmpty().escape(),
    body('recommendation').not().isEmpty().escape()
]

rex.rexUpCase = [
    body('uuidAssignedUser').not().isEmpty().escape(),
    body('uuidPersonPatient').not().isEmpty().escape(),
    body('reasonForConsultation').not().isEmpty().escape(),
    body('desisted').not().isEmpty().escape(),
]

rex.rexNewDiagnostic = [
    body('uuidDSM5').not().isEmpty().escape(),
    body('descriptionOfProblem').not().isEmpty().escape()
]

rex.rexUserAuth = [
    body('email').not().isEmpty().escape(),
    body('googleId').not().isEmpty().escape(),
    body('name').not().isEmpty().escape()
]

rex.rexDSM = [
    body('name').not().isEmpty().escape(),
    body('r_description').not().isEmpty().escape()
]

rex.rexTestType = [
    body('name').not().isEmpty().escape(),
    body('r_description').not().isEmpty().escape()
]
rex.rexTherapeuticPlan = [
    body('aspectToWork').not().isEmpty().escape()
]

rex.rexCountry = [
    body('isoName').not().isEmpty().escape(),
    body('name').not().isEmpty().escape()
]

rex.rexState = [
    body('uuidCountry').not().isEmpty().escape(),
    body('name').not().isEmpty().escape()
]

rex.rexCity = [
    body('uuidState').not().isEmpty().escape(),
    body('name').not().isEmpty().escape()
]

rex.rexMeet = [
    body('title').not().isEmpty().escape().isLength({max: 100}),
    body('beginDate').not().isEmpty().escape(),
    body('endDate').not().isEmpty().escape()
]

module.exports = rex;