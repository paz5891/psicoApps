

CREATE PROCEDURE `activeOrDisable`(
    in puuid varchar(36),in pactive TINYINT(1)
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

SET @count = (SELECT COUNT(1) FROM PAC_Case WHERE uuidAssignedUser=puuid LIMIT 1);
IF @count = 0 THEN
    UPDATE  PAS_Person SET active=pactive WHERE uuid=puuid;
END IF;
IF @count > 0 THEN
    SET @old = (SELECT retired FROM PAS_Person WHERE uuid=puuid);
    IF @old = 1 THEN 
        UPDATE  PAS_Person SET retired=0 WHERE uuid=puuid;
        UPDATE  PAS_Person SET active=1 WHERE uuid=puuid;
    END IF;
     IF @old = 0 THEN 
        UPDATE  PAS_Person SET active=0 WHERE uuid=puuid;
        UPDATE  PAS_Person SET retired=1 WHERE uuid=puuid;
    END IF;
    
END IF;
COMMIT;

END