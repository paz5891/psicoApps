const pool = require('../lib/database/database');
const CaseInitialStage = require('../models/caseinitial.model')
const StorageTestingApplication = {};

StorageTestingApplication.create = async (DataTesting) => {
    let testApp = new CaseInitialStage()
    testApp = DataTesting;

    return new Promise((resolve, reject) => {
        
        pool.query(`INSERT INTO PAC_TestingApplication 
                    (uuid, uuidCaseInitialStage, uuidTestType, testingApplication, testingApplicationFile) 
                    VALUES (?,?,?,?,?);`, [testApp.uuidTestingApplication, testApp.uuidCaseInitialStage,
                    testApp.uuidTestType, testApp.testingApplication, testApp.testingApplicationFile], (err, results, fields) => {
                        if (err) {
                            if (err.errno == 1452) {
                                reject({
                                    error: 404,
                                    fileToDelete: testApp.testingApplicationFile
                                })
                            }
        
                            reject({
                                error: err,
                                fileToDelete: testApp.testingApplicationFile
                            })
                        }
        
                        if (results) {
                            if (results.affectedRows == 0) {
                                reject({
                                    error: 409,
                                    fileToDelete: testApp.testingApplicationFile
                                })
                            }
                        }
        
                        resolve(testApp)
                    })
            })
        }


        StorageTestingApplication.update = async (UpData, UUID, uuidUserFromToken) => {
            let testApp = new CaseInitialStage()
            testApp = UpData;
        console.log(testApp)
        console.log(UUID)
            return new Promise((resolve, reject) => {
                pool.query(`UPDATE PAC_TestingApplication ta
                INNER JOIN PAC_TestType tt ON tt.uuid = ta.uuidTestType
                INNER JOIN PAC_CaseInitialStage ci ON ci.uuid = ta.uuidCaseInitialStage
                INNER JOIN PAC_Case c ON ci.uuid = c.uuid
                
                SET ta.uuidTestType = ?, ta.testingApplication = ?, ta.testingApplicationFile = ? 
                WHERE ta.uuid = ? 
                AND ta.uuidCaseInitialStage = ? 
                AND c.uuidAssignedUser = ?;`, 
                [testApp.uuidTestType, testApp.testingApplication, testApp.testingApplicationFile, 
                    testApp.uuidTestingApplication, UUID, uuidUserFromToken], (err, results, fields) => {
                        if (err) {
                            reject({
                                error: err,
                                fileToDelete: testApp.changefile
                            })
                        }
        
        
                        if (results.affectedRows < 1) {
                            reject({
                                error: 404,
                                fileToDelete: testApp.changefile
                            })
                        }
        
                        resolve({
                            data: testApp,
                            fileToDelete: testApp.changefile
                        })
                    })
            })
        }


        StorageTestingApplication.getall = async (query) => {
            return new Promise((resolve, reject) => {
                pool.query(query, (err, results, fields) => {
                    if (err) {
                        reject(err)
                    }
        
                    resolve(results)
                })
            })
        }


        StorageTestingApplication.gettestingapplication = async (query, values) => {

            return new Promise((resolve, reject) => {
                pool.query(query, values, (err, results, fields) => {
        
                        if (err) {
                            if (err.errno) {
                                reject({
                                    code: err.errno,
                                    error: err
                                })
                            }
        
                            reject(err)
                        }
        
                        if (results) {
                            if (results.length == 0) {
                                reject({
                                    code: 404
                                })
                            }
                        }
                        resolve(results)
                    })
        
            })
        }


StorageTestingApplication.testType = async () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM PAC_TestType;', (err, results, fields) => {
            if(err){
                reject(err)
            }

            resolve(results)
        })
    })
}

StorageTestingApplication.getsingletestingapplication = async (query, values) => {

    return new Promise((resolve, reject) => {
        pool.query(query, values, (err, results, fields) => {

            if (err) {
                if (err.errno) {
                    reject(err.errno)
                }

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

module.exports = StorageTestingApplication;