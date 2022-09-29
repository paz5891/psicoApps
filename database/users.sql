

CREATE DEFINER=`root`@`%` PROCEDURE `createuser`(
    in _uuidPerson VARCHAR(36),
    in _idPerson VARCHAR(36),
    in _email VARCHAR(320),
    in _firstname VARCHAR(320),
    in _lastname VARCHAR(320),
    in _uuidRole VARCHAR(36),
    in _activeAccount tinyint(1)
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

INSERT INTO
    PAS_Person(
        uuid,
        id,
        uuidRole,
        firstName,
        lastName,
        email,
        active,
        retired
    )
VALUES
    (
        _uuidPerson,
        _idPerson,
        _uuidRole,
        _firstname,
        _lastname,
        _email,
        _activeAccount,
        0
    );

INSERT INTO
    PAS_PersonUser(uuid, email)
VALUES
    (_uuidPerson, _email);

COMMIT;

END