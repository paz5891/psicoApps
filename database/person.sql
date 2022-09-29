
-- PROCEDIMIENTO ALMACENADO PARA CREAR EL REGISTRO DE PERSON
DROP PROCEDURE registerperson;
delimiter $ 
CREATE PROCEDURE `registerperson` (
    in _uuidPerson varchar(36),
    in _id varchar(20),
    in _firstName text,
    in _secondName text,
    in _lastName text,
    in _secondLastName text,
    in _marriedName text,
    in _bornDate datetime,
    in _uuidRole varchar(36),
    in _dateNameUpdated datetime,
    in _mobilePhone varchar(15),
    in _email varchar(320),
    --
    in _uuidReligion varchar(36),
    --
    in _firstNameFather text,
    in _secondNameFather text,
    in _lastNameFather text,
    in _secondLastNameFather text,
    in _firstNameMother text,
    in _secondNameMother text,
    in _lastNameMother text,
    in _secondLastNameMother text,
    in _firstNameExtra text,
    in _secondNameExtra text,
    in _lastNameExtra text,
    in _secondLastNameExtra text,
    --
    --
    in _uuidPersonHistory varchar(36),
    -- _in uuidPerson varchar(36) ,
    in _dateEvent datetime,
    in _comment varchar(1000),
    in _attachment varchar(500),
    in _uuidAddress varchar(36),
    --
    -- in uuidPerson,
    in _uuidCity varchar(36),
    in _addressLine1 varchar(100),
    in _addressLine2 varchar(100),
    in _phoneNumber varchar(15)
    
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
    PAS_Person (
        uuid,
        id,
        firstName,
        secondName,
        lastName,
        secondLastName,
        marriedName,
        bornDate,
        uuidReligion,
        uuidRole,
        dateNameUpdated,
        mobilePhone,
        email,
        firstNameFather,
        secondNameFather,
        lastNameFather,
        secondLastNameFather,
        firstNameMother,
        secondNameMother,
        lastNameMother,
        secondLastNameMother,
        firstNameExtra,
        secondNameExtra,
        lastNameExtra,
        secondLastNameExtra,
        active
    )
VALUES
    (
        _uuidPerson,
        _id,
        _firstName,
        _secondName,
        _lastName,
        _secondLastName,
        _marriedName,
        _bornDate,
        _uuidReligion,
        _uuidRole,
        _dateNameUpdated,
        _mobilePhone,
        _email,
        _firstNameFather,
        _secondNameFather,
        _lastNameFather,
        _secondLastNameFather,
        _firstNameMother,
        _secondLastNameMother,
        _lastNameMother,
        _secondLastNameMother,
        _firstNameExtra,
        _secondNameExtra,
        _lastNameExtra,
        _secondLastNameExtra,
        1
    );

INSERT INTO
    PAS_PersonHistory (
        uuid,
        uuidPerson,
        dateEvent,
        comment,
        attachment
    )
VALUES
    (
        _uuidPersonHistory,
        _uuidPerson,
        _dateEvent,
        _comment,
        _attachment
    );

INSERT INTO
    PAA_Address (
        uuid,
        uuidPerson,
        uuidCity,
        addressLine1,
        addressLine2,
        phoneNumber
    )
VALUES
    (
        _uuidAddress,
        _uuidPerson,
        _uuidCity,
        _addressLine1,
        _addressLine2,
        _phoneNumber
    );

COMMIT;

INSERT INTO 
    PAS_PersonPatient
VALUES
    (
        _uuidPerson,
        _uuidPerson
    )

END $ ----------



-- VIEW GETPERSON BY ID
CREATE 
    ALGORITHM = UNDEFINED 
    DEFINER = `root`@`%` 
    SQL SECURITY DEFINER
VIEW `getperson` AS
    SELECT 
        `pe`.`id` AS `id`,
        `pe`.`firstName` AS `firstName`,
        `pe`.`lastName` AS `lastName`,
        `pe`.`mobilePhone` AS `mobilePhone`,
        `pe`.`email` AS `email`,
        `adr`.`addressLine1` AS `addressLine1`,
        `ph`.`attachment` AS `attachment`,
        `ph`.`comment` AS `comment`,
        `pe`.`active` AS `active`
    FROM
        ((`PAS_Person` `pe`
        JOIN `PAA_Address` `adr` ON ((`pe`.`uuid` = `adr`.`uuidPerson`)))
        JOIN `PAS_PersonHistory` `ph` ON ((`pe`.`uuid` = `ph`.`uuidPerson`)))

-- QUERY PARA SABER QUIENES TIENEN CASOS ASIGNADOS
SELECT COUNT(pc.uuidPersonPatient), pc.uuidPersonPatient, p.firstname, p.secondName, p.lastName, p.secondLastName FROM PAC_Case pc
INNER JOIN PAS_PersonPatient pp ON pp.uuid = pc.uuidPersonPatient
INNER JOIN PAS_Person p ON pc.uuidPersonPatient = p.uuid
WHERE p.uuid = 'uuid1'

-- STORE PROCEDURE PARA PONER EN ESTADO DESACTIVADO EL PACIENTE
DROP PROCEDURE changestateperson;
delimiter $
CREATE PROCEDURE `changestateperson` (
    IN _id VARCHAR(20)
)
BEGIN
    DECLARE _count INT;
DECLARE EXIT HANDLER FOR SQLEXCEPTION
 BEGIN
  SHOW ERRORS LIMIT 1;
 ROLLBACK;
 END;
 DECLARE EXIT HANDLER FOR SQLWARNING
 BEGIN
 SHOW WARNINGS LIMIT 1;
 ROLLBACK;
 END;
START TRANSACTION;
    SELECT
        COUNT(pc.uuidPersonPatient) AS COUNT INTO _count
    FROM
        PAC_Case pc
        INNER JOIN PAS_PersonPatient pp ON pp.uuid = pc.uuidPersonPatient
        INNER JOIN PAS_Person p ON pc.uuidPersonPatient = p.uuid
    WHERE id = _id;

    IF _count = 0 THEN
        UPDATE PAS_Person SET active = 0 WHERE id = _id;
        SELECT '200' AS ErrorCode;
    ELSE
		SELECT '409' AS ErrorCode;
	END IF;
COMMIT;
END $

--

-- PROCEDIMIENTO ALMACENADO PARA ACTUALIZAR REGISTRO
DROP PROCEDURE updateperson;

delimiter $ CREATE PROCEDURE `updateperson` (
    in _uuidPerson varchar(36),
    in _id varchar(20),
    in _firstName text,
    in _secondName text,
    in _lastName text,
    in _secondLastName text,
    in _marriedName text,
    in _bornDate datetime,
    in _uuidRole varchar(36),
    in _dateNameUpdated datetime,
    in _mobilePhone varchar(15),
    in _email varchar(320),
    --
    in _uuidReligion varchar(36),
    --
    in _firstNameFather text,
    in _secondNameFather text,
    in _lastNameFather text,
    in _secondLastNameFather text,
    in _firstNameMother text,
    in _secondNameMother text,
    in _lastNameMother text,
    in _secondLastNameMother text,
    in _firstNameExtra text,
    in _secondNameExtra text,
    in _lastNameExtra text,
    in _secondLastNameExtra text,
    --
    --
    -- in _uuidPersonHistory varchar(36),
    -- _in uuidPerson varchar(36) ,
    in _dateEvent datetime,
    in _comment varchar(1000),
    in _attachment varchar(500),
    -- in _uuidAddress varchar(36),
    --
    -- in uuidPerson,
    in _uuidCity varchar(36),
    in _addressLine1 varchar(100),
    in _addressLine2 varchar(100),
    in _phoneNumber varchar(15)
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

UPDATE
    PAS_Person
SET
    firstName = _firstName,
    secondName = _secondName,
    lastName = _lastName,
    secondLastName = _secondLastName,
    marriedName = _marriedName,
    bornDate = _bornDate,
    uuidReligion = _uuidReligion,
    uuidRole = _uuidRole,
    dateNameUpdated = _dateNameUpdated,
    mobilePhone = _mobilePhone,
    email = _email,
    firstNameFather = _firstNameFather,
    secondNameFather = _secondNameFather,
    lastNameFather = _lastNameFather,
    secondLastNameFather = _secondLastNameFather,
    firstNameMother = _firstNameMother,
    secondNameMother = _secondNameMother,
    lastNameMother = _lastNameMother,
    secondLastNameMother = _secondLastNameMother,
    firstNameExtra = _firstNameExtra,
    secondNameExtra = _secondNameExtra,
    lastNameExtra = _lastNameExtra,
    secondLastNameExtra = _secondLastNameExtra
WHERE
    id = _id;

UPDATE
    PAS_PersonHistory
SET
    uuid,
    uuidPerson,
    dateEvent = _dateEvent,
    comment = _comment,
    attachment = _attachment
WHERE
    uuidPerson = _uuidPerson;
UPDATE
    PAA_Address
SET
    uuidCity = _uuidCity,
    addressLine1 = _addressLine1,
    addressLine2 = _addressLine2,
    phoneNumbeR = _phoneNumber
WHERE
    uuidPerson = _uuidPerson;

COMMIT;

END $ ----------


-- VISTA PARA TRAER TODA LA INFORMACION DE UN PERSON PARA ACTUALIZAR
CREATE 
    ALGORITHM = UNDEFINED 
    DEFINER = `admin`@`%` 
    SQL SECURITY DEFINER
VIEW `fulldataperson` AS
    SELECT 
        `pe`.`uuid` AS `uuidPerson`,
        `pe`.`id` AS `id`,
        `pe`.`firstName` AS `firstName`,
        `pe`.`secondName` AS `secondName`,
        `pe`.`lastName` AS `lastName`,
        `pe`.`secondLastName` AS `secondLastName`,
        `pe`.`marriedName` AS `marriedName`,
        `pe`.`bornDate` AS `bornDate`,
        `pe`.`uuidRole` AS `uuidRole`,
        `pe`.`mobilePhone` AS `mobilePhone`,
        `pe`.`email` AS `email`,
        `pe`.`firstNameFather` AS `firstNameFather`,
        `pe`.`secondNameFather` AS `secondNameFather`,
        `pe`.`lastNameFather` AS `lastNameFather`,
        `pe`.`secondLastNameFather` AS `secondLastNameFather`,
        `pe`.`firstNameMother` AS `firstNameMother`,
        `pe`.`secondNameMother` AS `secondNameMother`,
        `pe`.`lastNameMother` AS `lastNameMother`,
        `pe`.`secondLastNameMother` AS `secondLastNameMother`,
        `pe`.`firstNameExtra` AS `firstNameExtra`,
        `pe`.`secondNameExtra` AS `secondNameExtra`,
        `pe`.`lastNameExtra` AS `lastNameExtra`,
        `pe`.`secondLastNameExtra` AS `secondLastNameExtra`,
        `ph`.`attachment` AS `attachment`,
        `ph`.`comment` AS `comment`,
        `adr`.`uuidCity` AS `uuidCity`,
        `adr`.`addressLine1` AS `addressLine1`,
        `adr`.`addressLine2` AS `addressLine2`,
        `adr`.`phoneNumber` AS `phoneNumber`,
        `pe`.`gender` AS `gender`,
        `pe`.`uuidReligion` AS `uuidReligion`,
        `pe`.`active` AS `active`
    FROM
        ((`PAS_Person` `pe`
        JOIN `PAA_Address` `adr` ON ((`pe`.`uuid` = `adr`.`uuidPerson`)))
        JOIN `PAS_PersonHistory` `ph` ON ((`pe`.`uuid` = `ph`.`uuidPerson`)))


-- VISTA PARA TRAER TODA LA INFORMACION DE UN PERSON PARA ACTUALIZAR UN PSICOLOGO
CREATE 
    ALGORITHM = UNDEFINED 
    SQL SECURITY DEFINER
VIEW `fulldatapersonpsychologist` AS
        SELECT 
        `pe`.`uuid` AS `uuidPerson`,
        `pe`.`id` AS `id`,
        `pe`.`firstName` AS `firstName`,
        `pe`.`secondName` AS `secondName`,
        `pe`.`lastName` AS `lastName`,
        `pe`.`secondLastName` AS `secondLastName`,
        `pe`.`marriedName` AS `marriedName`,
        `pe`.`bornDate` AS `bornDate`,
        `pe`.`uuidRole` AS `uuidRole`,
        `pe`.`mobilePhone` AS `mobilePhone`,
        `pe`.`email` AS `email`,
        `pe`.`firstNameFather` AS `firstNameFather`,
        `pe`.`secondNameFather` AS `secondNameFather`,
        `pe`.`lastNameFather` AS `lastNameFather`,
        `pe`.`secondLastNameFather` AS `secondLastNameFather`,
        `pe`.`firstNameMother` AS `firstNameMother`,
        `pe`.`secondNameMother` AS `secondNameMother`,
        `pe`.`lastNameMother` AS `lastNameMother`,
        `pe`.`secondLastNameMother` AS `secondLastNameMother`,
        `pe`.`firstNameExtra` AS `firstNameExtra`,
        `pe`.`secondNameExtra` AS `secondNameExtra`,
        `pe`.`lastNameExtra` AS `lastNameExtra`,
        `pe`.`secondLastNameExtra` AS `secondLastNameExtra`,
        `ph`.`attachment` AS `attachment`,
        `ph`.`comment` AS `comment`,
        `adr`.`uuidCity` AS `uuidCity`,
        `adr`.`addressLine1` AS `addressLine1`,
        `adr`.`addressLine2` AS `addressLine2`,
        `adr`.`phoneNumber` AS `phoneNumber`,
        `pe`.`active` AS `active`,
        `pe`.`gender` AS `gender`,
        `pe`.`uuidReligion` AS `uuidReligion`,
         pc.uuidAssignedUser,
         pc.desisted
    FROM
        PAC_Case AS pc 
        INNER JOIN `PAS_Person` `pp` ON pc.uuidAssignedUser = pp.uuid
        INNER JOIN `PAS_Person` `pe` ON pc.uuidPersonPatient = pe.uuid
        JOIN `PAA_Address` `adr` ON `pe`.`uuid` = `adr`.`uuidPerson`
        JOIN `PAS_PersonHistory` `ph` ON `pe`.`uuid` = `ph`.`uuidPerson`;



--
--
-- create user
--
--

DROP PROCEDURE IF EXISTS createuser;

delimiter $ CREATE PROCEDURE `createuser` (
    in _uuidPerson varchar(36),
    in _uuidRole VARCHAR(36),
    in _userName VARCHAR(320),
    in _email VARCHAR(320)
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
    PAS_Person(uuid, uuidRole)
VALUES
    (_uuidPerson, uuidRole);

INSERT INTO
    PAS_PersonUser(uuid, userName, email)
VALUES
    (_uuidPerson, _userName, _email);
COMMIT;

END $ ----------
