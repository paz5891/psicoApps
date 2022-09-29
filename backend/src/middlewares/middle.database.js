const database = require('../lib/database/database')

async function PingMySQL(req, res, next) {
    database.getConnection((err, connection) => {
        if (err) {
            return res
                .status(408)
                .json({
                    ok: false,
                    message: "Database don't connected",
                    data: []
                })
        }

        connection.ping((err) => {
            if (err) {
                return res
                    .status(408)
                    .json({
                        ok: false,
                        message: "Database don't connected",
                        data: []
                    })
            }
        })

        next()
    })
}

module.exports = PingMySQL;