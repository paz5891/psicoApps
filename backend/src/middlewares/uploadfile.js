const multerS3 = require('multer-s3')
const multer = require('multer')
const aws = require('aws-sdk')
const path = require('path')
const uuid = require('uuid')
const { fieldsForQuery } = require('../lib/utils/rextherapeuticplan.file')

const database = require('../lib/utils/env.config')
const s3 = {}
var S3 = new aws.S3({
    accessKeyId: database.accesskey,
    secretAccessKey: database.secretkey
})


s3.uploadFileS3 = multer({
    storage: multerS3({
        s3: S3,
        bucket: 'documentspsicoappumg',
        key: function (req, file, cb) {
            cb(null, uuid.v4() + path.extname(file.originalname))
        }
    })
})

s3.uploadFieldsFilesS3 = multer({
    storage: multerS3({
        s3: S3,
        bucket: 'documentspsicoappumg',
        key: function (req, file, cb) {
            cb(null, uuid.v4() + path.extname(file.originalname))
        }
    })
})

s3.getFile = async (filename) => {
    console.log(filename);
    var params = {
        Bucket: 'documentspsicoappumg',
        Key: filename,
        Expires: 60
    };
    console.log(params);

    var url = S3.getSignedUrl('getObject', params);
    return url;
}


s3.deleteFromS3 = (fileName) => {
    if (fileName == undefined || fileName == '') {
    } else {
        var params = {
            Bucket: 'documentspsicoappumg',
            Key: fileName
        };
        S3.deleteObject(params, (err, data) => {
            if (err) console.log(err, err.stack);
            else console.log('delete', data);
        })
    }
}

s3.uploadFile = (req, res, next) => {
    if (req.file === undefined || req.file === '') {
        next()
    } else {
        req.filename = req.file.key
        next()
    }
}

s3.multipleUploadFile = (req, res, next) => {
    let files = req.files
    console.log(req.files);
    if (files == undefined || Object.keys(files).length === 0) {
        next()
    } else {

        let filesData = JSON.parse(JSON.stringify(req.files))
        let fieldName = Object.keys(filesData)[0]
        let value = `${filesData[`${fieldName}`][0].key}`

        const bodyFiles = `{ "${fieldName}" : "${value}" }`

        req.datafiles = JSON.parse(bodyFiles)
        next()
    }

}

s3.manyUploadFile = (req, res, next) => {
    let files = req.files
    if (files == undefined || Object.keys(files).length === 0) {
        next()
    } else {

        let filesData = JSON.parse(JSON.stringify(req.files))
        let bodyFiles = {

        }

        for (var element in filesData) {
            if (element == 'aspectToWorkFile') {
                bodyFiles.aspectToWorkFile = filesData[element][0].key
            }
            if (element == 'objetivesFile') {
                bodyFiles.objetivesFile = filesData[element][0].key
            }
            if (element == 'goalsFile') {
                bodyFiles.goalsFile = filesData[element][0].key
            }
            if (element == 'focusFile') {
                bodyFiles.focusFile = filesData[element][0].key
            }
            if (element == 'techniquesFile') {
                bodyFiles.techniquesFile = filesData[element][0].key
            }
        }

        req.datafiles = bodyFiles
        next()
    }

}


module.exports = s3