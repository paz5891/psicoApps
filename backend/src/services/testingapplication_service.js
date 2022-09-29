const uuid = require('uuid')

const StorageTestApp = require('../storage/testingapplication_storage')
const CaseInitialStage = require('../models/caseinitial.model')
const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();

const ServiceTestingApplication = {}

ServiceTestingApplication.create = async (DataTesting, IDCaseInitial) => {
    let testAppData = new CaseInitialStage()
    testAppData = DataTesting;

    testAppData.uuidTestingApplication = uuid.v4()
    testAppData.testingApplicationFile = entities.decode(testAppData.testingApplicationFile);
    testAppData.uuidCaseInitialStage = IDCaseInitial;

    return await StorageTestApp.create(testAppData)
}

ServiceTestingApplication.update = async (DataUpdate, UUID, uuidUserFromToken) => {
    let testAppData = new CaseInitialStage()
    testAppData = DataUpdate;

    testAppData.testingApplicationFile = entities.decode(testAppData.testingApplicationFile);

    return await StorageTestApp.update(testAppData, UUID, uuidUserFromToken)
}

ServiceTestingApplication.getall = async (rol) => {

    let query
    if (rol == 'admin') {
        query = `SELECT * FROM PAC_TestingApplication;`

    } else {

    }
    return await StorageTestApp.getall(query)
}

ServiceTestingApplication.testType = async () => {
    return await StorageTestApp.testType()
}

ServiceTestingApplication.gettestingapplication = async (uuid, uuidUserFromToken, rol) => {

    let query = `
    SELECT 
    ta.uuid AS uuidTestingApplication, 
    tt.uuid AS uuidTestType, 
    tt.name AS nameTestType, 
    tt.r_description AS r_descriptionTestType, 
    ta.testingApplication,
    ta.testingApplicationFile
        FROM PAC_TestingApplication ta
        INNER JOIN PAC_TestType tt ON tt.uuid = ta.uuidTestType
        INNER JOIN PAC_CaseInitialStage ci ON ci.uuid = ta.uuidCaseInitialStage
        INNER JOIN PAC_Case c ON ci.uuid = c.uuid `;
    let values;

    if (rol == 'admin') {
        query += `
        WHERE ci.uuid = ? `

        values = [uuid]

    } else {
        query += `
        WHERE c.uuidAssignedUser = ?
        AND ci.uuid = ?`

        values = [uuidUserFromToken, uuid]
    }

    return await StorageTestApp.gettestingapplication(query, values)
}

ServiceTestingApplication.getsingletestingapplication = async (uuidCase, uuidTestingApplication, uuidUserFromToken, rol) => {

    let query = `
    SELECT 
    ta.uuid AS uuidTestingApplication, 
    tt.uuid AS uuidTestType, 
    tt.name AS nameTestType, 
    tt.r_description AS r_descriptionTestType, 
    ta.testingApplication,
    ta.testingApplicationFile
        FROM PAC_TestingApplication ta
        INNER JOIN PAC_TestType tt ON tt.uuid = ta.uuidTestType
        INNER JOIN PAC_CaseInitialStage ci ON ci.uuid = ta.uuidCaseInitialStage
        INNER JOIN PAC_Case c ON ci.uuid = c.uuid `;
    let values;

    if (rol == 'admin') {
        query += `
        WHERE ci.uuid = ?
        AND ta.uuid = ?`

        values = [uuidCase, uuidTestingApplication]

    } else {
        query += `
        WHERE c.uuidAssignedUser = ?
        AND ci.uuid = ?
        AND ta.uuid = ?`

        values = [uuidUserFromToken, uuidCase, uuidTestingApplication]
    }
    return await StorageTestApp.getsingletestingapplication(query, values)
}

module.exports = ServiceTestingApplication;