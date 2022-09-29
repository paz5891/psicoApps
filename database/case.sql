/*SP para crear un nuevo caso*/

DROP PROCEDURE IF EXISTS newcase;

delimiter $ 
CREATE PROCEDURE `newcase` (
    in _uuid varchar(36),
    in _caseNumber varchar(25),
    in _uuidAssignedUser varchar(36),
    in _uuidOwnerUser varchar(36),
    in _uuidPersonPatient varchar(36),
    in _creationDate datetime,
    in _uuidStage varchar(36),
    in _reasonForConsultation varchar(1000),
    in _desisted tinyint(1)
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
    PAC_Case (
        uuid,
        caseNumber,
        uuidAssignedUser,
        uuidOwnerUser,
        uuidPersonPatient,
        creationDate,
        uuidStage,
        reasonForConsultation,
        desisted
    )
VALUES
    (
        _uuid,
        _caseNumber,
        _uuidAssignedUser,
        _uuidOwnerUser,
        _uuidPersonPatient,
        _creationDate,
        "9863f673-97f0-4141-a43a-9f3e51960ab1",
        _reasonForConsultation,
        _desisted
    );

--
INSERT INTO
    PAC_CaseInitialStage(uuid)
VALUES
    (_uuid);

COMMIT;

END $ 

/*SP para actualizar un caso*/

DROP PROCEDURE updatecase;
delimiter $ 
CREATE DEFINER=`root`@`%` PROCEDURE `updatecase`(
    in _uuid varchar(36),
    in _uuidAssignedUser varchar(36),
    in _uuidOwnerUser varchar(36),
    in _uuidPersonPatient varchar(36),
    in _reasonForConsultation varchar(1000),
    in _desisted tinyint(1)
)
BEGIN DECLARE EXIT HANDLER FOR SQLEXCEPTION BEGIN SHOW ERRORS
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

UPDATE
    PAC_Case
SET
    uuidAssignedUser = _uuidAssignedUser,
    uuidOwnerUser = _uuidOwnerUser,
    uuidPersonPatient = _uuidPersonPatient,
    reasonForConsultation = _reasonForConsultation,
    desisted = _desisted
WHERE
    uuid = _uuid;
    SELECT ROW_COUNT() AS _rows;
COMMIT;

END $ ----------

/*INSERT a la tabla PAC_Diagnosed Problem*/

INSERT INTO PAC_DiagnosedProblems VALUES (
_uuid,
_uuidCaseDiagnosticStage,
_uuidDSM5,
_descriptionOfProblem,
_descriptionOfProblemFile
);

///
Grid casos por paciente
CREATE 
    ALGORITHM = UNDEFINED 
    DEFINER = `root`@`%` 
    SQL SECURITY DEFINER
VIEW `gridcase` AS
    SELECT 
        `ca`.`uuid` AS `uuidCase`,
        `ca`.`caseNumber` AS `caseNumber`,
        `ca`.`uuidAssignedUser` AS `uuidAssignedUser`,
        `pau`.`id` AS `idAssignedUser`,
        `pau`.`firstName` AS `nameAssignedUser`,
        `pau`.`lastName` AS `lastNameUser`,
        `ca`.`uuidOwnerUser` AS `uuidOwnerUser`,
        `own`.`id` AS `idOwnerUser`,
        `ca`.`uuidPersonPatient` AS `uuidPersonPatient`,
        `pep`.`id` AS `idPersonPatient`,
        `ca`.`creationDate` AS `creationDate`,
        `ca`.`uuidStage` AS `uuidStage`,
        `ca`.`reasonForConsultation` AS `reasonForConsultation`,
        `ca`.`desisted` AS `desisted`
    FROM
        (((`PAC_Case` `ca`
        JOIN `PAS_Person` `pau` ON ((`pau`.`uuid` = `ca`.`uuidAssignedUser`)))
        JOIN `PAS_Person` `own` ON ((`own`.`uuid` = `ca`.`uuidOwnerUser`)))
        JOIN `PAS_Person` `pep` ON ((`pep`.`uuid` = `ca`.`uuidPersonPatient`)))