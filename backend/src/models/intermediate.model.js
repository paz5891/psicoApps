/**
 * Represent a model of CaseIntermediateStage.
 *
 * @param {string} uuid varchar(36) PK 
 * @param {string} therapeuticPlan text 
 * @param {string} therapeuticPlanFile varchar(50 tinyint(1)
 */


 class CaseIntermediateStage{
     constructor(
        uuid, 
        therapeuticPlan,
        therapeuticPlanFile
     ){
         this.uuid = uuid
         this.therapeuticPlan = therapeuticPlan
         this.therapeuticPlanFile = therapeuticPlanFile
     }
 }


 module.exports = CaseIntermediateStage