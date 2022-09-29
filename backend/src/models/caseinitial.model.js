/**
 * Represent a initialCaseState;
 *
 * @param {string} uuidCaseInitialStage varchar(36) PK
 * @param {string} premorbidPersonality text
 * @param {string} premorbidPersonalityFile varchar(500) URL file from AWS S3
 * @param {string} currentProblem text
 * @param {string} currentProblemFile varchar(500) URL file from AWS S3
 * @param {string} healthHistory text
 * @param {string} healthHistoryFile varchar(500) URL file from AWS S3
 * @param {string} sexualHistory text
 * @param {string} sexualHistoryFile varchar(500) URL file from AWS S3
 * @param {string} growthHistory text
 * @param {string} growthHistoryFile varchar(500) URL file from AWS S3
 * @param {string} perinatalHistory text
 * @param {string} perinatalHistoryFile varchar(500) URL file from AWS S3
 * @param {string} familyHistory text
 * @param {string} familyHistoryFile varchar(500) URL file from AWS S3
 * @param {string} genogramFile varchar(500)
 * @param {string} schoolHistory text
 * @param {string} schoolHistoryFile varchar(500) URL file from AWS S3
 * @param {string} workHistory text
 * @param {string} workHistoryFile varchar(500) URL file from AWS S3
 * @param {string} mentalEvaluationTest text
 * @param {string} mentalEvaluationTestFile varchar(500) URL file from AWS S3
 * @param {string} clinicalInterpretation text
 * @param {string} clinicalInterpretationFile varchar(500) URL file from AWS S3
 * @param {string} interpreationOfEvidence text
 * @param {string} interpreationOfEvidenceFile varchar(500) URL file from AWS S3
 * @param {string} therapeuticContract text
 * @param {string} therapeuticContractFile varchar(500) URL file from AWS S3
 *
 * @param {string} uuidTestingApplication varchar(36) PK
 * {string} uuidCaseInitialStage varchar(36)
 * @param {string} uuidTestType varchar(36)
 * @param {string} testingApplication text
 * @param {string} testingApplicationFile varchar(500) URL file from AWS S3
 *
 */

class CaseInitialStage {
    constructor(
        uuidCaseInitialStage,
        premorbidPersonality,
        premorbidPersonalityFile,
        currentProblem,
        currentProblemFile,
        healthHistory,
        healthHistoryFile,
        sexualHistory,
        sexualHistoryFile,
        growthHistory,
        growthHistoryFile,
        perinatalHistory,
        perinatalHistoryFile,
        familyHistory,
        familyHistoryFile,
        genogramFile,
        schoolHistory,
        schoolHistoryFile,
        workHistory,
        workHistoryFile,
        mentalEvaluationTest,
        mentalEvaluationTestFile,
        clinicalInterpretation,
        clinicalInterpretationFile,
        interpreationOfEvidence,
        interpreationOfEvidenceFile,
        therapeuticContract,
        therapeuticContractFile,
        /** */
        uuidTestingApplication,
        uuidTestType,
        testingApplication,
        testingApplicationFile,
        changefile
    ) {
        this.uuidCaseInitialStage = uuidCaseInitialStage,
            this.premorbidPersonality = premorbidPersonality,
            this.premorbidPersonalityFile = premorbidPersonalityFile,
            this.currentProblem = currentProblem,
            this.currentProblemFile = currentProblemFile,
            this.healthHistory = healthHistory,
            this.healthHistoryFile = healthHistoryFile,
            this.sexualHistory = sexualHistory,
            this.sexualHistoryFile = sexualHistoryFile,
            this.growthHistory = growthHistory,
            this.growthHistoryFile = growthHistoryFile,
            this.perinatalHistory = perinatalHistory,
            this.perinatalHistoryFile = perinatalHistoryFile,
            this.familyHistory = familyHistory,
            this.familyHistoryFile = familyHistoryFile,
            this.genogramFile = genogramFile,
            this.schoolHistory = schoolHistory,
            this.schoolHistoryFile = schoolHistoryFile,
            this.workHistory = workHistory,
            this.workHistoryFile = workHistoryFile,
            this.mentalEvaluationTest = mentalEvaluationTest,
            this.mentalEvaluationTestFile = mentalEvaluationTestFile,
            this.clinicalInterpretation = clinicalInterpretation,
            this.clinicalInterpretationFile = clinicalInterpretationFile,
            this.interpreationOfEvidence = interpreationOfEvidence,
            this.interpreationOfEvidenceFile = interpreationOfEvidenceFile,
            this.therapeuticContract = therapeuticContract,
            this.therapeuticContractFile = therapeuticContractFile,
            
            this.uuidTestingApplication = uuidTestingApplication,
            this.uuidTestType = uuidTestType,
            this.testingApplication = testingApplication,
            this.testingApplicationFile = testingApplicationFile,
            this.changefile = changefile
    }
}

module.exports = CaseInitialStage;