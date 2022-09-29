/**
 * Represent a model of stages on a case
 * 
 * @param {string} uuid varchar(36) PK 
 * @param {string} closeDate datetime
 * @param {string} conclusion text
 * @param {string} recommendation text
 */

class CloseStage {
    constructor(
        uuid,
        closeDate,
        conclusion,
        recommendation
    ) {
        this.uuid = uuid
        this.closeDate = closeDate
        this.conclusion = conclusion
        this.recommendation = recommendation
    }
}

module.exports = CloseStage;
