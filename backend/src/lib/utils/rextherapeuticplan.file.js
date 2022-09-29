const rexTherapeuticPlanFiles = {}

rexTherapeuticPlanFiles.filesTherapeuticPlan = [
    { name: 'aspectToWorkFile', maxCount: 1 },
    { name: 'objetivesFile', maxCount: 1 },
    { name: 'goalsFile', maxCount: 1 },
    { name: 'focusFile', maxCount: 1 },
    { name: 'techniquesFile', maxCount: 1 },
]

rexTherapeuticPlanFiles.fieldsForQuery = [
    'uuid',
    'uuidCaseIntermediateStage', 
    'aspectToWork',
    'aspectToWorkFile',
    'objetives', 
    'objetivesFile',
    'goals',
    'goalsFile',
    'focus',
    'focusFile',
    'techniques',
    'techniquesFile'
]


module.exports = rexTherapeuticPlanFiles;