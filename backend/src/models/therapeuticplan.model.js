/**
 * Represent a model of therapeuticPlanActivity.
 *
 * @param {string} uuid varchar(36) PK 
 * @param {string} uuidCaseIntermediateStage varchar(36) 
 * @param {string} aspectToWork text 
 * @param {string} objetives text 
 * @param {string} objetivesFile varchar(500) 
 * @param {string} goals text 
 * @param {string} goalsFile varchar(500) 
 * @param {string} focus text 
 * @param {string} focusFile varchar(500) 
 * @param {string} techniques text 
 * @param {string} techniquesFile varchar(500
 * @param {string} aspectToWorkFile varchar(500) 
 */


class TherapeuticPlanActivity{
    constructor(
        uuid,
        uuidCaseIntermediateStage, 
        aspectToWork,
        aspectToWorkFile,
        objetives, 
        objetivesFile,
        goals,
        goalsFile,
        focus,
        focusFile,
        techniques,
        techniquesFile
    ){
        this.uuid = uuid,
        this.uuidCaseIntermediateStage = uuidCaseIntermediateStage,
        this.aspectToWork = aspectToWork,
        this.aspectToWorkFile = aspectToWorkFile,
        this.objetives = objetives,
        this.objetivesFile = objetivesFile,
        this.goals = goals,
        this.goalsFile = goalsFile,
        this.focus = focus,
        this.focusFile = focusFile,
        this.techniques = techniques,
        this.techniquesFile = techniquesFile

    }
}


module.exports = TherapeuticPlanActivity