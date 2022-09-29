
/**
 * @param {string} uuid varchar(36) PK 
 *  {string} uuidCaseDiagnosticStage varchar(36) 
 * @param {string} uuidDSM5 varchar(36) 
 * @param {string} descriptionOfProblem text 
 * @param {string} descriptionOfProblemFile varchar(500)
 * 
 * @param {string} uuidCaseDiagnosticStage varchar(36) PK
 */

class Diagnosedproblems {
    constructor(
        uuidDiagnosedProblems,
        uuidCaseDiagnosticStage,
        uuidDSM5,
        descriptionOfProblem,
        descriptionOfProblemFile,
        changefile
    ) {
        this.uuidDiagnosedProblems = uuidDiagnosedProblems
        this.uuidDiagnosticStage = uuidCaseDiagnosticStage
        this.uuidDSM5 = uuidDSM5
        this.descriptionOfProblem = descriptionOfProblem
        this.descriptionOfProblemFile = descriptionOfProblemFile
        this.changefile = changefile
    }
}

module.exports = Diagnosedproblems