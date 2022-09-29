const rexIntermediateFiles = {}

rexIntermediateFiles.filesCaseIntermediate = [
    { name: 'therapeuticPlanFile', maxCount: 1 }
]

rexIntermediateFiles.fieldsForQuery = [
    'uuid',
    'therapeuticPlan',
    'therapeuticPlanFile'
]


module.exports = rexIntermediateFiles;