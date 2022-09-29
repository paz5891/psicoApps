CREATE DEFINER=`root`@`%` PROCEDURE `changeStagecaseToDiagnostic`(
    in _uuidStage VARCHAR(36),
    in _uuidCase VARCHAR(36),
    in _uuidAssignedUser VARCHAR(36)
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
    uuidStage = _uuidStage
WHERE
    uuid = _uuidCase
    AND uuidAssignedUser = _uuidAssignedUser;

--
--
INSERT INTO
    PAC_CaseDiagnosticStage(uuid)
VALUES
    (_uuidCase);
COMMIT;
END