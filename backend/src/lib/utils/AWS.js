const aws = require('aws-sdk')

const database = require('./env.config')

var S3 = new aws.S3({
    accessKeyId: database.accesskey,
    secretAccessKey: database.secretkey
})

module.exports = S3;