const Router = require('express').Router()


Router.use('/persons', require('./person.route'))
Router.use('/religion', require('./religion.route'))
Router.use('/files', require('./files.route'))
Router.use('/cities', require('./city.route'))

Router.use('/cases',
    require('./case.route'),
    require('./caseinitial.route'),
    require('./caseintermediate.route'),
    require('./close.route'),
    require('./meet.route'))

Router.use('/diagnostic', require('./diagnostic'))
Router.use('/users', require('./user.route'))
Router.use('/attachment', require('./files.route'))

Router.use('/disorders', require('./dsm5.route'))
Router.use('/religions', require('./religion.route'))


Router.use('/country', require('./country.route'))
Router.use('/state', require('./state.route'))

module.exports = Router;