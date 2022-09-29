const rexFiles = {}

rexFiles.filesCaseInitial = [
    { name: 'premorbidPersonalityFile', maxCount: 1 },
    { name: 'currentProblemFile', maxCount: 1 },
    { name: 'healthHistoryFile', maxCount: 1 },
    { name: 'sexualHistoryFile', maxCount: 1 },
    { name: 'growthHistoryFile', maxCount: 1 },
    { name: 'perinatalHistoryFile', maxCount: 1 },
    { name: 'familyHistoryFile', maxCount: 1 },
    { name: 'genogramFile', maxCount: 1 },
    { name: 'schoolHistoryFile', maxCount: 1 },
    { name: 'workHistoryFile', maxCount: 1 },
    { name: 'mentalEvaluationTestFile', maxCount: 1 },
    { name: 'clinicalInterpretationFile', maxCount: 1 },
    { name: 'interpreationOfEvidenceFile', maxCount: 1 },
    { name: 'therapeuticContractFile', maxCount: 1 },
    { name: 'testingApplicationFile', maxCount: 1 }
]

rexFiles.fieldsForQuery = [
    'uuidCaseInitialStage',
    'premorbidPersonality',
    'premorbidPersonalityFile',
    'currentProblem',
    'currentProblemFile',
    'healthHistory',
    'healthHistoryFile',
    'sexualHistory',
    'sexualHistoryFile',
    'growthHistory',
    'growthHistoryFile',
    'perinatalHistory',
    'perinatalHistoryFile',
    'familyHistory',
    'familyHistoryFile',
    'genogramFile',
    'schoolHistory',
    'schoolHistoryFile',
    'workHistory',
    'workHistoryFile',
    'mentalEvaluationTest',
    'mentalEvaluationTestFile',
    'clinicalInterpretation',
    'clinicalInterpretationFile',
    'interpreationOfEvidence',
    'interpreationOfEvidenceFile',
    'therapeuticContract',
    'therapeuticContractFile'
]

module.exports = rexFiles;