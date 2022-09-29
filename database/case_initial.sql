SELECT
    cit.uuid as uuidCaseInitial,
    ta.uuid as uuidTestingApplication,
    tt.uuid as uuidTestType
FROM
    PAC_TestingApplication ta
    INNER JOIN PAC_CaseInitialStage cit ON ta.uuidCaseInitialStage = cit.uuid
    INNER JOIN PAC_TestType tt ON ta.uuidTestType = tt.uuid;

-- PROCEDIMIENTO ALMACENADO PARA PODER ARBRIR UN CASO EN PAC_INITIALSTAGE
DROP PROCEDURE registerperson;

delimiter $ CREATE PROCEDURE `registercaseinitial` (
    IN _uuidCaseInitialStage varchar(36),
    IN _premorbidPersonality text,
    IN _premorbidPersonalityFile varchar(500),
    IN _currentProblem text,
    IN _currentProblemFile varchar(500),
    IN _healthHistory text,
    IN _healthHistoryFile varchar(500),
    IN _sexualHistory text,
    IN _sexualHistoryFile varchar(500),
    IN _growthHistory text,
    IN _growthHistoryFile varchar(500),
    IN _perinatalHistory text,
    IN _perinatalHistoryFile varchar(500),
    IN _familyHistory text,
    IN _familyHistoryFile varchar(500),
    IN _genogramFile varchar(500),
    IN _schoolHistory text,
    IN _schoolHistoryFile varchar(500),
    IN _workHistory text,
    IN _workHistoryFile varchar(500),
    IN _mentalEvaluationTest text,
    IN _mentalEvaluationTestFile varchar(500),
    IN _clinicalInterpretation text,
    IN _clinicalInterpretationFile varchar(500),
    IN _interpreationOfEvidence text,
    IN _interpreationOfEvidenceFile varchar(500),
    IN _therapeuticContract text,
    IN _therapeuticContractFile varchar(500),
    --
    IN _uuidTestingApplication varchar(36),
    IN _uuidTestType varchar(36),
    IN _testingApplication text,
    IN _testingApplicationFile varchar(500)
) BEGIN DECLARE EXIT HANDLER FOR SQLEXCEPTION BEGIN SHOW ERRORS
LIMIT
    1;

ROLLBACK;

END;

DECLARE EXIT HANDLER FOR SQLWARNING BEGIN SHOW WARNINGS
LIMIT
    1;

ROLLBACK;

END;

START TRANSACTION;

INSERT INTO
    PAC_CaseInitialStage
VALUES
    (
        _uuidCaseInitialStage,
        _premorbidPersonality,
        _premorbidPersonalityFile,
        _currentProblem,
        _currentProblemFile,
        _healthHistory,
        _healthHistoryFile,
        _sexualHistory,
        _sexualHistoryFile,
        _growthHistory,
        _growthHistoryFile,
        _perinatalHistory,
        _perinatalHistoryFile,
        _familyHistory,
        _familyHistoryFile,
        _genogramFile,
        _schoolHistory,
        _schoolHistoryFile,
        _workHistory,
        _workHistoryFile,
        _mentalEvaluationTest,
        _mentalEvaluationTestFile,
        _clinicalInterpretation,
        _clinicalInterpretationFile,
        _interpreationOfEvidence,
        _interpreationOfEvidenceFile,
        _therapeuticContract,
        _therapeuticContractFile
    );

INSERT INTO
    PAC_TestingApplication
VALUES
    (
        _uuidTestingApplication,
        _uuidCaseInitialStage,
        _uuidTestType,
        _testingApplication,
        _testingApplicationFile
    );

COMMIT;

END $