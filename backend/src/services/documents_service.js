const fs = require('fs').promises

const files = {}

files.deleteFromStorage = (nameFile) => {
    fs.unlink(`./uploads/${nameFile}`)
    .then(()=> console.log('File removed to storage'))
    .catch( err => console.log(err))
}

module.exports = files;