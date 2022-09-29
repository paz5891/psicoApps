const S3 = require('../lib/utils/AWS')

function deleteManyFilesS3(files) {
    if (files) {
        let keysFiles = Object.keys(files).map(key => [key, files[key]])
        let fileObjects = []

        // console.log(keysFiles)
        keysFiles.forEach(element => {
            let data = JSON.parse(`{ "Key":"${element[1]}"}`)
            fileObjects.push(data)
        });

        var params = {
            Bucket: "documentspsicoappumg",
            Delete: {
                Objects: fileObjects,
                Quiet: false
            }
        };
        S3.deleteObjects(params, function (err, data) {
            if (err) console.log(err, err.stack); // an error occurred
            // else console.log(data);
        })
    }
}

module.exports = deleteManyFilesS3