const bcrypt = require('bcryptjs');
const cleanDeep = require('clean-deep');
const pool = require('../lib/database/database');
const Person = require('../models/person.model');



const storagePerson = {}

storagePerson.create = (dataPatient) => {
    let person = new Person()
    person = dataPatient;

    if (person.uuidReligion == '' || person.uuidReligion == undefined) {
        person.uuidReligion = null
    }
    return new Promise((resolve, reject) => {
        pool.query('CALL registerperson (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);',
            [person.uuidPerson, person.id, person.firstName, person.secondName, person.lastName,
            person.secondLastName, person.marriedName, person.bornDate, person.uuidRole, person.dateNameUpdated,
            person.mobilePhone, person.email, person.gender, person.uuidReligion, person.firstNameFather, person.secondNameFather,
            person.lastNameFather, person.secondLastNameFather, person.firstNameMother, person.secondNameMother,
            person.lastNameMother, person.secondLastNameMother, person.firstNameExtra, person.secondNameExtra,
            person.lastNameExtra, person.secondLastNameExtra, person.uuidPersonHistory,
            person.dateEvent, person.comment, person.attachment, person.uuidAddress, person.uuidCity,
            person.addressLine1, person.addressLine2, person.phoneNumber], (err, results, fields) => {
                if (err) {
                    reject(err.errno)
                }

                if (results == undefined) {
                    reject(404)
                }

                if (results) {
                    if (results[0]) {
                        reject(results[0][0].Code);
                    }
                }

                resolve(person.id)
            })
    })
}

storagePerson.get = async (uuid) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM getperson WHERE id = ? and active = 1;', [uuid], (err, results, fields) => {
            if (err) {
                reject(err)
            }

            if (results == undefined || results.length == 0) {
                reject(404)
            }

            resolve(cleanDeep(results[0]))
        })
    })
}

storagePerson.update = async (data) => {
    let person = new Person()
    person = data

    if (person.uuidReligion == '' || person.uuidReligion == undefined) {
        person.uuidReligion = null
    }
    return new Promise((resolve, reject) => {
        pool.query(`CALL updateperson(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,? ,?,?,?,?,?,?,?,?,?,? ,?,?)`,
            [person.uuidPerson, person.id, person.firstName, person.secondName, person.lastName,
            person.secondLastName, person.marriedName, person.bornDate, person.uuidRole, person.dateNameUpdated,
            person.mobilePhone, person.email, person.gender, person.uuidReligion, person.firstNameFather, person.secondNameFather,
            person.lastNameFather, person.secondLastNameFather, person.firstNameMother, person.secondNameMother,
            person.lastNameMother, person.secondLastNameMother, person.firstNameExtra, person.secondNameExtra,
            person.lastNameExtra, person.secondLastNameExtra, person.dateEvent, person.comment, person.attachment,
            person.uuidCity, person.addressLine1, person.addressLine2, person.phoneNumber], (err, results, fields) => {
                if (err) {
                    reject({
                        code: err.errno,
                        err: err,
                        fileToDelete: person.changeFile
                    })
                }

                if (results) {
                    if (results.length > 1) {
                        if (results[0][0]._rows == 0) {
                            reject({
                                code: 404,
                                fileToDelete: person.changeFile
                            })
                        }
                    }
                }

                // console.log(results)
                resolve({
                    id: person.id,
                    fileToDelete: person.changeFile
                })
            })
    })
}

storagePerson.delete = async (id) => {
    return new Promise((resolve, reject) => {
        pool.query('CALL changestateperson(?);', [id], (err, results, fields) => {
            if (err) {
                reject(err)
            }

            if (results) {
                if (results.length > 0) {
                    if (results[0][0].ErrorCode == 200) {
                        resolve(id)
                    } else {
                        reject(results[0][0].ErrorCode)
                    }
                }
            }
        })
    })
}

storagePerson.allPersons = () => {
    return new Promise((resolve, reject) => {
        pool.query(`
    SELECT 
        p.uuid, 
        p.id, 
        p.mobilePhone, 
        p.email, 
        p.active,
        p.gender
    FROM PAS_Person p
    INNER JOIN PAS_PersonHistory ph ON ph.uuidPerson = p.uuid
    WHERE p.active = 1
    ORDER BY ph.dateEvent DESC;;`, (err, results, fields) => {
            if (err) {
                reject(err)
            }
            if (results == undefined || results.length == 0) {
                reject(404)
            }

            resolve(cleanDeep(results))
        })
    })
}

storagePerson.onlywithfulldata = async (id, userInfo) => {

    if (userInfo.rol === "admin") {
        return new Promise((resolve, reject) => {
            pool.query('SELECT * FROM fulldataperson where id = ? and active = 1;', [id], (err, results, fields) => {
                if (err) {
                    reject(err)
                }

                if (results == undefined || results.length == 0) {
                    reject(404)
                }

                resolve(cleanDeep(results))
            })
        })
    } else {
        return new Promise((resolve, reject) => {
            pool.query('SELECT * FROM fulldatapersonpsychologist where id = ? and active = 1 and desisted = 0 and uuidAssignedUser=?;', [id, userInfo.id], (err, results, fields) => {
                if (err) {
                    reject(err)
                }

                if (results == undefined || results.length == 0) {
                    reject(404)
                }

                resolve(cleanDeep(results))
            })
        })
    }

}

storagePerson.religion = async () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT uuid, name FROM PAS_Religion;', (err, results, fields) => {
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

storagePerson.cities = async () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT uuid, name FROM PAA_City where uuidstate=001;', (err, results, fields) => {
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


storagePerson.gridStagePerson = async (stage, userInfo) => {
    if (userInfo.rol === "admin") {
        return new Promise((resolve, reject) => {
            pool.query(`
            SELECT 
                p.uuid, 
                p.id, 
                p.mobilePhone, 
                p.email, 
                p.active,
                p.gender
            FROM PAS_Person p
            INNER JOIN PAS_PersonHistory ph ON ph.uuidPerson = p.uuid
            WHERE p.active = ?
            ORDER BY ph.dateEvent DESC;`,
                [stage], (err, results, fields) => {
                    if (err) reject(err);
                    if (results == undefined || results.length == 0) {

                        reject(404)
                    }

                    resolve(results)
                })
        })
    } else {
        return new Promise((resolve, reject) => {
            pool.query(`
                SELECT 
                p.uuid, 
                p.id, 
                p.mobilePhone, 
                p.email, 
                p.active,
                p.gender
                FROM PAC_Case AS pc 
                INNER JOIN PAS_Person AS pp ON pc.uuidAssignedUser=pp.uuid
                INNER JOIN PAS_Person AS p ON pc.uuidPersonPatient=p.uuid
                INNER JOIN PAS_PersonHistory ph ON ph.uuidPerson = p.uuid
                WHERE  p.active = 1 AND pc.desisted=0 AND pc.uuidAssignedUser=?
                ORDER BY ph.dateEvent DESC;`,
                [userInfo.id], (err, results, fields) => {
                    if (err) reject(err);

                    if (results == undefined || results.length == 0) {
                        reject(404)
                    }

                    resolve(results)
                })
        })
    }

}

storagePerson.gridWithIDPerson = (ID, userInfo) => {
    console.log("hola");
    if (userInfo.rol === "admin") {
        return new Promise((resolve, reject) => {
            pool.query(`
                    SELECT 
                        p.uuid, 
                        p.id, 
                        p.mobilePhone, 
                        p.email, 
                        p.active,
                        p.gender
                    FROM PAS_Person p
                    WHERE p.id LIKE ? AND p.active = 1`, [ID], (err, results, fields) => {
                if (err) reject(err);

                if (results == undefined || results.length == 0) {
                    reject(404)
                }

                resolve(results)
            })
        })
    } else {
        return new Promise((resolve, reject) => {
            pool.query(`
                SELECT 
                p.uuid, 
                p.id, 
                p.mobilePhone, 
                p.email, 
                p.active,
                p.gender
                FROM PAC_Case AS pc 
                INNER JOIN PAS_Person AS pp ON pc.uuidAssignedUser=pp.uuid
                INNER JOIN PAS_Person AS p ON pc.uuidPersonPatient=p.uuid
                WHERE  p.active = 1 AND pc.desisted=0 AND p.id LIKE ? AND pc.uuidAssignedUser=?;`, [ID, userInfo.id], (err, results, fields) => {
                if (err) reject(err);

                if (results == undefined || results.length == 0) {
                    reject(404)
                }

                resolve(results)
            })
        })
    }
}
module.exports = storagePerson;
