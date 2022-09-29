const router = require('express').Router()
const meet = require('../controllers/meet_controller')
const { rexMeet } = require('../lib/utils/rex')

router.route('/meet/:uuidcase')
    .post(rexMeet, meet.create)

router.get('/meet', meet.getManyByCase)

router.route('/meet/:uuidcase/:uuidmeet')
    .get(meet.getOnlyByCase)

router.route('/meet/:uuidmeet')
    .put(rexMeet, meet.update)
    .delete(meet.delete)
    
module.exports = router;