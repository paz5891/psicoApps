const bcrypt = require('bcryptjs');
const pool = require('../lib/database/database');
const Cases = require('../models/ncase.model');


const storageCase = {}

storageCase.create = async (dataCase) => {
    let cases = new Cases()
    cases = dataCase;

    return new Promise((resolve, reject) => {
        pool.query('CALL newcase (?,?,?,?,?,?,?,?,?)', [
            cases.uuid, cases.caseNumber, cases.uuidAssignedUser, cases.uuidOwnerUser, cases.uuidPersonPatient,
            cases.creationDate, cases.uuidStage, cases.reasonForConsultation, cases.desisted
        ], (err, results, fields) => {
            if (err) {
                if (err.errno) {
                    reject(err.errno)
                }
                reject(err)
            }

            if (results) {
                if (results.length > 0) {
                    reject(results[0][0].Code)
                }
            }

            resolve(cases.uuid)

        })
    })
}

storageCase.filter = (query) => {

    return new Promise((resolve, reject) => {
        pool.query(query, (err, results, fields) => {
            if (err) {
                reject({
                    code: err.errno,
                    err: err
                })
            }

            if (results == undefined || results.length == 0) {
                reject({
                    code: 404
                })
            }

            resolve(results)
        })
    })
}

storageCase.update = async (upCase) => {
    let updata = new Cases()
    updata = upCase;
    updata.desisted = 0

    return new Promise((resolve, reject) => {
        pool.query(`CALL updatecase(?,?,?,?,?,?)`, [
            updata.uuid, updata.uuidAssignedUser, updata.uuidOwnerUser,
            updata.uuidPersonPatient, updata.reasonForConsultation,
            updata.desisted], (err, results, fields) => {
                if (err) {
                    reject({
                        code: err.errno,
                        err: err
                    })
                }

                if (results) {

                    if (results.length != 0) {
                        if (results[0][0].Code) {
                            reject({ code: results[0][0].Code })
                        }

                        if (results[0][0]._rows == 0) {
                            reject({ code: 404 })
                        }
                    }
                }
                resolve(updata.uuid)
            })
    })
}

storageCase.get = async (idFromTokenUser) => {

    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM gridcase WHERE uuidAssignedUser=?;', [idFromTokenUser], (err, results, fields) => {

            if (err) {
                reject(err)
            }

            if (results) {
                if (results.length == 0) {
                    reject(404)
                }
            }
            resolve(results);
        })
    })
}

storageCase.getManyByFilter = async (query, values) => {
    return new Promise((resolve, reject) => {
        pool.query(query, values, (err, results, fields) => {

            if (err) {
                reject(err)
            }

            if (results) {
                if (results.length == 0) {
                    reject(404)
                }
            }

            resolve(results)
        })
    })
}

storageCase.getid = async (uuid, UserInfo) => {
    if (UserInfo.rol === "admin") {
        return new Promise((resolve, reject) => {
            pool.query(`SELECT * FROM gridcase WHERE uuidCase = ?;`, [uuid],
                (err, results, fields) => {
                    if (err) {
                        reject(err)
                    }

                    if (results == undefined || results.length == 0) {
                        reject(404)
                    }

                    resolve(results)
                })
        })
    } else {
        return new Promise((resolve, reject) => {
            pool.query(`SELECT * FROM gridcase WHERE uuidCase = ? AND uuidAssignedUser=?;`, [uuid, UserInfo.id],
                (err, results, fields) => {
                    if (err) {
                        reject(err)
                    }

                    if (results == undefined || results.length == 0) {
                        reject(404)
                    }

                    resolve(results)
                })
        })
    }

}

storageCase.getstage = async () => {

    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM PAC_Stage;', [], (err, results, fields) => {

            if (err) {
                reject(err)
            }
            resolve(results);
        })
    })
}

storageCase.getpersonuser = async (active, retired) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT p.uuid, p.firstName, p.secondName, p.lastName, p.secondlastName, p.active,p.retired 
        FROM PAS_PersonUser pu
        INNER JOIN PAS_Person p ON p.uuid = pu.uuid
        INNER JOIN PAS_Role pr ON p.uuidRole = pr.uuid
        WHERE p.uuid = pu.uuid AND pr.name = 'member' AND p.active=? AND p.retired=?; `, [active, retired], (err, results, fields) => {

            if (err) {
                reject(err)
            }

            resolve(results);
        })
    })
}

storageCase.getpersonpatient = async () => {
    return new Promise((resolve, reject) => {
        pool.query(`
        SELECT p.id, p.uuid, ppa.patientNumber FROM PAS_Person p
        INNER JOIN PAS_PersonPatient ppa ON p.uuid = ppa.uuid
        WHERE p.uuid NOT IN (SELECT c.uuidPersonPatient FROM PAC_Case c);`, (err, results, fields) => {

            if (err) {
                reject(err)
            }

            if (results) {
                if (results.length == 0) {
                    reject(404)
                }
            }

            resolve(results);
        })
    })
}

storageCase.getCasesPatient = async (uuid) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM PAC_Case WHERE uuidPersonPatient = ?;`, [uuid],
            (err, results, fields) => {
                if (err) {
                    reject(err)
                }

                if (results == undefined || results.length == 0) {
                    reject(404)
                }

                resolve(results)
            })
    })
}


/** Desistimiento de un caso por id de caso y id de usuario */
storageCase.desistmentCase = async (uuidCase, uuidUserFromToken) => {
    return new Promise((resolve, reject) => {
        pool.query(`
        UPDATE PAC_Case 
            SET desisted = 1
        WHERE uuid = ?
        AND uuidAssignedUser = ?;`, [uuidCase, uuidUserFromToken], (err, results) => {
            if (err) {
                reject({
                    code: err.errno,
                    err: err
                })
            }

            if (results) {
                if (results.affectedRows == 0) {
                    reject({
                        code: 404
                    })
                }
            }

            resolve(uuidCase)
        })
    })
}

/** Para negar un desistimiento de caso */
storageCase.deniedDesistmentCase = async (uuidCase) => {
    return new Promise((resolve, reject) => {
        pool.query(`
        UPDATE PAC_Case 
            SET desisted = 0
        WHERE uuid = ?`, [uuidCase], (err, results) => {
            if (err) {
                reject({
                    code: err.errno,
                    err: err
                })
            }

            if (results) {
                if (results.affectedRows == 0) {
                    reject({
                        code: 404
                    })
                }
            }

            resolve(uuidCase)
        })
    })
}

/** Selecciona los datos del usuario dueño del caso */
storageCase.getDataUserCase = async (uuidCase) => {
    return new Promise((resolve, reject) => {
        pool.query(`
        SELECT 
        ca.caseNumber,
        ca.uuidStage,
        ca.uuidAssignedUser,
        pau.email,
        pau.firstName,
        pau.lastName
        FROM PAC_Case ca
        JOIN PAS_Person pau ON pau.uuid = ca.uuidAssignedUser
        WHERE ca.uuid = ?;`, [uuidCase], (err, results) => {
            if (err) {
                reject({
                    code: err.errno
                })
            }

            if (results) {
                if (results.length == 0) {
                    reject({
                        code: 404
                    })
                }
            }

            resolve(results[0])
        })
    })
}

module.exports = storageCase;