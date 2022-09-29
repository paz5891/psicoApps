/*
Created: 8/8/2020
Modified: 8/25/2020
Model: MySQL 5.7
Database: MySQL 5.7
*/


-- Create tables section -------------------------------------------------

-- Table PAS_Person

CREATE TABLE `PAS_Person`
(
  `uuid` Varchar(36) NOT NULL,
  `id` Varchar(20) NOT NULL,
  `firstName` Text NOT NULL,
  `secondName` Text,
  `lastName` Text NOT NULL,
  `secondLastName` Text,
  `marriedName` Text,
  `bornDate` Datetime NOT NULL,
  `uuidRole` Varchar(36),
  `dateNameUpdated` Datetime,
  `mobilePhone` Varchar(15) NOT NULL,
  `email` Varchar(320),
  `firstNameFather` Text,
  `secondNameFather` Text,
  `lastNameFather` Text,
  `secondLastNameFather` Text,
  `firstNameMother` Text,
  `secondNameMother` Text,
  `lastNameMother` Text,
  `secondLastNameMother` Text,
  `firstNameExtra` Text,
  `secondNameExtra` Text,
  `lastNameExtra` Text,
  `secondLastNameExtra` Text,
  `uuidReligion` Varchar(36),
  `active` Bool NOT NULL DEFAULT (0)
)
;

CREATE UNIQUE INDEX `uniqueID` ON `PAS_Person` (`id`)
;

CREATE INDEX `IX_Relationship4` ON `PAS_Person` (`uuidRole`)
;

CREATE INDEX `IX_Relationship46` ON `PAS_Person` (`uuidReligion`)
;

ALTER TABLE `PAS_Person` ADD  PRIMARY KEY (`uuid`)
;

-- Table PAS_PersonPsychologist

CREATE TABLE `PAS_PersonPsychologist`
(
  `uuid` Varchar(36) NOT NULL
)
;

ALTER TABLE `PAS_PersonPsychologist` ADD  PRIMARY KEY (`uuid`)
;

-- Table PAS_PersonAdmin

CREATE TABLE `PAS_PersonAdmin`
(
  `uuid` Varchar(36) NOT NULL
)
;

ALTER TABLE `PAS_PersonAdmin` ADD  PRIMARY KEY (`uuid`)
;

-- Table PAS_PersonPatient

CREATE TABLE `PAS_PersonPatient`
(
  `uuid` Varchar(36) NOT NULL,
  `patientNumber` Varchar(25) NOT NULL
)
;

CREATE UNIQUE INDEX `uniqueCodePatient` ON `PAS_PersonPatient` (`patientNumber`)
;

ALTER TABLE `PAS_PersonPatient` ADD  PRIMARY KEY (`uuid`)
;

-- Table PAS_Role

CREATE TABLE `PAS_Role`
(
  `uuid` Varchar(36) NOT NULL,
  `name` Varchar(50) NOT NULL,
  `r_description` Varchar(500)
)
;

CREATE UNIQUE INDEX `uniqueName` ON `PAS_Role` (`name`)
;

ALTER TABLE `PAS_Role` ADD  PRIMARY KEY (`uuid`)
;

-- Table PAS_PersonUser

CREATE TABLE `PAS_PersonUser`
(
  `uuid` Varchar(36) NOT NULL,
  `userName` Varchar(320) NOT NULL,
  `token` Text NOT NULL
)
;

ALTER TABLE `PAS_PersonUser` ADD  PRIMARY KEY (`uuid`)
;

-- Table PAS_Menu

CREATE TABLE `PAS_Menu`
(
  `uuid` Varchar(36) NOT NULL,
  `name` Varchar(50) NOT NULL,
  `r_description` Varchar(500)
)
;

ALTER TABLE `PAS_Menu` ADD  PRIMARY KEY (`uuid`)
;

-- Table PAS_RoleMenu

CREATE TABLE `PAS_RoleMenu`
(
  `uuidRole` Varchar(36) NOT NULL,
  `uuidMenu` Varchar(36) NOT NULL
)
;

ALTER TABLE `PAS_RoleMenu` ADD  PRIMARY KEY (`uuidRole`,`uuidMenu`)
;

-- Table PAS_Audit

CREATE TABLE `PAS_Audit`
(
  `uuid` Varchar(36) NOT NULL,
  `eventDate` Datetime NOT NULL,
  `uuidPersonUser` Varchar(36) NOT NULL,
  `uuidAction` Varchar(36) NOT NULL,
  `reason` Varchar(500)
)
;

CREATE INDEX `IX_Relationship12` ON `PAS_Audit` (`uuidPersonUser`)
;

CREATE INDEX `IX_Relationship13` ON `PAS_Audit` (`uuidAction`)
;

ALTER TABLE `PAS_Audit` ADD  PRIMARY KEY (`uuid`)
;

-- Table PAS_Action

CREATE TABLE `PAS_Action`
(
  `uuid` Varchar(36) NOT NULL,
  `name` Varchar(50) NOT NULL,
  `r_description` Varchar(500)
)
;

CREATE UNIQUE INDEX `uniqueAction` ON `PAS_Action` (`name`)
;

ALTER TABLE `PAS_Action` ADD  PRIMARY KEY (`uuid`)
;

-- Table PAS_EncryptionControl

CREATE TABLE `PAS_EncryptionControl`
(
  `uuid` Varchar(36) NOT NULL,
  `secondaryKey` Text NOT NULL,
  `uuidPersonUser` Varchar(36) NOT NULL,
  `dateFrom` Datetime NOT NULL
)
;

CREATE INDEX `IX_Relationship14` ON `PAS_EncryptionControl` (`uuidPersonUser`)
;

ALTER TABLE `PAS_EncryptionControl` ADD  PRIMARY KEY (`uuid`)
;

-- Table PAC_Case

CREATE TABLE `PAC_Case`
(
  `uuid` Varchar(36) NOT NULL,
  `caseNumber` Varchar(25) NOT NULL,
  `uuidAssignedUser` Varchar(36),
  `uuidOwnerUser` Varchar(36) NOT NULL,
  `uuidPersonPatient` Varchar(36) NOT NULL,
  `creationDate` Datetime NOT NULL,
  `uuidStage` Varchar(36),
  `reasonForConsultation` Varchar(1000) NOT NULL,
  `desisted` Bool NOT NULL DEFAULT (0)
)
;

CREATE UNIQUE INDEX `uniqueCaseNumber` ON `PAC_Case` (`caseNumber`)
;

CREATE INDEX `IX_Relationship15` ON `PAC_Case` (`uuidAssignedUser`)
;

CREATE INDEX `IX_Relationship16` ON `PAC_Case` (`uuidOwnerUser`)
;

CREATE INDEX `IX_Relationship17` ON `PAC_Case` (`uuidPersonPatient`)
;

CREATE INDEX `IX_Relationship18` ON `PAC_Case` (`uuidStage`)
;

ALTER TABLE `PAC_Case` ADD  PRIMARY KEY (`uuid`)
;

-- Table PAC_Stage

CREATE TABLE `PAC_Stage`
(
  `uuid` Varchar(36) NOT NULL,
  `name` Varchar(50) NOT NULL
 COMMENT 'metadata',
  `r_description` Varchar(500)
)
;

CREATE UNIQUE INDEX `uniqueName` ON `PAC_Stage` (`name`)
;

ALTER TABLE `PAC_Stage` ADD  PRIMARY KEY (`uuid`)
;

-- Table PAC_StageCaseHistory

CREATE TABLE `PAC_StageCaseHistory`
(
  `uuid` Varchar(36) NOT NULL,
  `uuidCase` Varchar(36) NOT NULL,
  `uuidStage` Varchar(36) NOT NULL,
  `dateEvent` Datetime NOT NULL,
  `uuidPersonUser` Varchar(36),
  `comment` Varchar(1000),
  `attachment` Varchar(500)
)
;

CREATE INDEX `IX_Relationship19` ON `PAC_StageCaseHistory` (`uuidCase`)
;

CREATE INDEX `IX_Relationship20` ON `PAC_StageCaseHistory` (`uuidStage`)
;

CREATE INDEX `IX_Relationship21` ON `PAC_StageCaseHistory` (`uuidPersonUser`)
;

ALTER TABLE `PAC_StageCaseHistory` ADD  PRIMARY KEY (`uuid`)
;

-- Table PAC_CaseInitialStage

CREATE TABLE `PAC_CaseInitialStage`
(
  `uuid` Varchar(36) NOT NULL,
  `premorbidPersonality` Text
 COMMENT 'almacena html ( 2000 caracteres netos)',
  `premorbidPersonalityFile` Varchar(500),
  `currentProblem` Text NOT NULL
 COMMENT 'almacena html , 2000 caracteres netos.',
  `currentProblemFile` Varchar(500),
  `healthHistory` Text NOT NULL
 COMMENT 'almacenar html (2000 caracteres netos)',
  `healthHistoryFile` Varchar(500),
  `sexualHistory` Text NOT NULL
 COMMENT 'Almacena html (2000 caracteres netos)',
  `sexualHistoryFile` Varchar(500),
  `growthHistory` Text NOT NULL
 COMMENT 'almacena html (2000 caracteres netos)',
  `growthHistoryFile` Varchar(500),
  `perinatalHistory` Text NOT NULL
 COMMENT 'almacena html (2000 caracteres netos)',
  `perinatalHistoryFile` Varchar(500),
  `familyHistory` Text NOT NULL
 COMMENT 'almacena html (2000 caracteres netos)',
  `familyHistoryFile` Varchar(500),
  `genogramFile` Varchar(500) NOT NULL,
  `schoolHistory` Text NOT NULL
 COMMENT 'almacena html (2000 campos netos)',
  `schoolHistoryFile` Varchar(500),
  `workHistory` Text NOT NULL
 COMMENT 'almacena html (2000 caracteres netos)',
  `workHistoryFile` Varchar(500),
  `mentalEvaluationTest` Text NOT NULL
 COMMENT 'almacena html (2000 caracteres netos)',
  `mentalEvaluationTestFile` Varchar(500),
  `clinicalInterpretation` Text NOT NULL
 COMMENT 'almacena html (2000 caracteres netos)',
  `clinicalInterpretationFile` Varchar(500),
  `interpreationOfEvidence` Text NOT NULL
 COMMENT 'almacena html (2000 caracteres netos)',
  `interpreationOfEvidenceFile` Varchar(500),
  `therapeuticContract` Text NOT NULL
 COMMENT 'almacena html (2000 caracteres netos)',
  `therapeuticContractFile` Varchar(500)
)
;

ALTER TABLE `PAC_CaseInitialStage` ADD  PRIMARY KEY (`uuid`)
;

-- Table PAC_CaseIntermediateStage

CREATE TABLE `PAC_CaseIntermediateStage`
(
  `uuid` Varchar(36) NOT NULL,
  `therapeuticPlan` Text NOT NULL
 COMMENT 'almacena html (2000 caracteres netos)',
  `therapeuticPlanFile` Varchar(500)
)
;

ALTER TABLE `PAC_CaseIntermediateStage` ADD  PRIMARY KEY (`uuid`)
;

-- Table PAC_CaseDiagnosticStage

CREATE TABLE `PAC_CaseDiagnosticStage`
(
  `uuid` Varchar(36) NOT NULL
)
;

ALTER TABLE `PAC_CaseDiagnosticStage` ADD  PRIMARY KEY (`uuid`)
;

-- Table PAC_CaseCloseStage

CREATE TABLE `PAC_CaseCloseStage`
(
  `uuid` Varchar(36) NOT NULL,
  `closeDate` Datetime NOT NULL,
  `conclusion` Text NOT NULL
 COMMENT 'almacena html (2000 caracteres netos)',
  `recommendation` Text NOT NULL
 COMMENT 'almacena html (2000 caracteres netos)'
)
;

ALTER TABLE `PAC_CaseCloseStage` ADD  PRIMARY KEY (`uuid`)
;

-- Table PAC_DSM5

CREATE TABLE `PAC_DSM5`
(
  `uuid` Varchar(36) NOT NULL,
  `name` Varchar(50) NOT NULL,
  `r_description` Varchar(500)
)
;

ALTER TABLE `PAC_DSM5` ADD  PRIMARY KEY (`uuid`)
;

-- Table PAC_DiagnosedProblems

CREATE TABLE `PAC_DiagnosedProblems`
(
  `uuid` Varchar(36) NOT NULL,
  `uuidCaseDiagnosticStage` Varchar(36) NOT NULL,
  `uuidDSM5` Varchar(36) NOT NULL,
  `descriptionOfProblem` Text NOT NULL
 COMMENT 'almacena html (2000 caracteres netos)',
  `descriptionOfProblemFile` Varchar(500)
)
;

CREATE INDEX `IX_Relationship26` ON `PAC_DiagnosedProblems` (`uuidCaseDiagnosticStage`)
;

CREATE INDEX `IX_Relationship27` ON `PAC_DiagnosedProblems` (`uuidDSM5`)
;

ALTER TABLE `PAC_DiagnosedProblems` ADD  PRIMARY KEY (`uuid`)
;

-- Table PAC_TherapeuticPlanActivity

CREATE TABLE `PAC_TherapeuticPlanActivity`
(
  `uuid` Varchar(36) NOT NULL,
  `uuidCaseIntermediateStage` Varchar(36) NOT NULL,
  `aspectToWork` Text NOT NULL
 COMMENT 'almacena html (2000 caracteres netos)',
  `aspectToWorkFile` Varchar(500),
  `objetives` Text
 COMMENT 'almacena html (2000 caracteres netos)',
  `objetivesFile` Varchar(500),
  `goals` Text
 COMMENT 'almacena html (2000 caracteres netos)',
  `goalsFile` Varchar(500),
  `focus` Text
 COMMENT 'almacena html (2000 caracteres netos)',
  `focusFile` Varchar(500),
  `techniques` Text
 COMMENT 'almacena html (2000 caracteres netos)',
  `techniquesFile` Varchar(500)
)
;

CREATE INDEX `IX_Relationship28` ON `PAC_TherapeuticPlanActivity` (`uuidCaseIntermediateStage`)
;

ALTER TABLE `PAC_TherapeuticPlanActivity` ADD  PRIMARY KEY (`uuid`)
;

-- Table PAC_TestType

CREATE TABLE `PAC_TestType`
(
  `uuid` Varchar(36) NOT NULL
 COMMENT 'Psicometricas
Personalidad
Habilidades
Proyectivas
Inteligencia',
  `name` Varchar(50) NOT NULL,
  `r_description` Varchar(500)
)
;

ALTER TABLE `PAC_TestType` ADD  PRIMARY KEY (`uuid`)
;

-- Table PAC_TestingApplication

CREATE TABLE `PAC_TestingApplication`
(
  `uuid` Varchar(36) NOT NULL,
  `uuidCaseInitialStage` Varchar(36),
  `uuidTestType` Varchar(36) NOT NULL,
  `testingApplication` Text NOT NULL
 COMMENT 'almacena html (2000 caracteres netos)',
  `testingApplicationFile` Varchar(500)
)
;

CREATE INDEX `IX_Relationship29` ON `PAC_TestingApplication` (`uuidCaseInitialStage`)
;

CREATE INDEX `IX_Relationship30` ON `PAC_TestingApplication` (`uuidTestType`)
;

ALTER TABLE `PAC_TestingApplication` ADD  PRIMARY KEY (`uuid`)
;

-- Table PAC_CaseAssigmentHistory

CREATE TABLE `PAC_CaseAssigmentHistory`
(
  `uuid` Varchar(36) NOT NULL,
  `uuidCase` Varchar(36),
  `dateEvent` Datetime NOT NULL,
  `uuidFromPersonUser` Varchar(36) NOT NULL,
  `uuidToPersonUser` Varchar(36),
  `uuidAprovePersonAdmin` Varchar(36),
  `comment` Varchar(500) NOT NULL
)
;

CREATE INDEX `IX_Relationship31` ON `PAC_CaseAssigmentHistory` (`uuidFromPersonUser`)
;

CREATE INDEX `IX_Relationship32` ON `PAC_CaseAssigmentHistory` (`uuidToPersonUser`)
;

CREATE INDEX `IX_Relationship33` ON `PAC_CaseAssigmentHistory` (`uuidAprovePersonAdmin`)
;

CREATE INDEX `IX_Relationship34` ON `PAC_CaseAssigmentHistory` (`uuidCase`)
;

ALTER TABLE `PAC_CaseAssigmentHistory` ADD  PRIMARY KEY (`uuid`)
;

-- Table PAC_Meeting

CREATE TABLE `PAC_Meeting`
(
  `uuid` Varchar(36) NOT NULL,
  `uuidCase` Varchar(36) NOT NULL,
  `uuidTherapeuticPlanActivity` Varchar(36),
  `title` Varchar(100) NOT NULL,
  `beginDate` Datetime NOT NULL,
  `endDate` Datetime NOT NULL,
  `latitude` Varchar(15),
  `longitude` Varchar(15)
)
;

CREATE INDEX `IX_Relationship35` ON `PAC_Meeting` (`uuidCase`)
;

CREATE INDEX `IX_Relationship36` ON `PAC_Meeting` (`uuidTherapeuticPlanActivity`)
;

ALTER TABLE `PAC_Meeting` ADD  PRIMARY KEY (`uuid`)
;

-- Table PAA_Address

CREATE TABLE `PAA_Address`
(
  `uuid` Varchar(36) NOT NULL,
  `uuidPerson` Varchar(36),
  `uuidMeeting` Varchar(36),
  `uuidCity` Varchar(36) NOT NULL,
  `addressLine1` Varchar(100) NOT NULL,
  `addressLine2` Varchar(100),
  `phoneNumber` Varchar(15)
)
;

CREATE INDEX `IX_Relationship37` ON `PAA_Address` (`uuidPerson`)
;

CREATE INDEX `IX_Relationship38` ON `PAA_Address` (`uuidMeeting`)
;

CREATE INDEX `IX_Relationship43` ON `PAA_Address` (`uuidCity`)
;

ALTER TABLE `PAA_Address` ADD  PRIMARY KEY (`uuid`)
;

-- Table PAA_Country

CREATE TABLE `PAA_Country`
(
  `uuid` Varchar(36) NOT NULL,
  `isoName` Varchar(3) NOT NULL,
  `name` Varchar(50) NOT NULL
)
;

ALTER TABLE `PAA_Country` ADD  PRIMARY KEY (`uuid`)
;

-- Table PAA_State

CREATE TABLE `PAA_State`
(
  `uuid` Varchar(36) NOT NULL,
  `uuidCountry` Varchar(36) NOT NULL,
  `name` Varchar(50) NOT NULL
)
;

CREATE INDEX `IX_Relationship39` ON `PAA_State` (`uuidCountry`)
;

ALTER TABLE `PAA_State` ADD  PRIMARY KEY (`uuid`)
;

-- Table PAA_City

CREATE TABLE `PAA_City`
(
  `uuid` Varchar(36) NOT NULL,
  `uuidState` Varchar(36) NOT NULL,
  `name` Varchar(50) NOT NULL
)
;

CREATE INDEX `IX_Relationship40` ON `PAA_City` (`uuidState`)
;

ALTER TABLE `PAA_City` ADD  PRIMARY KEY (`uuid`)
;

-- Table PAS_PersonHistory

CREATE TABLE `PAS_PersonHistory`
(
  `uuid` Varchar(36) NOT NULL,
  `uuidPerson` Varchar(36) NOT NULL,
  `dateEvent` Datetime NOT NULL,
  `comment` Varchar(1000),
  `attachment` Varchar(500)
)
;

CREATE INDEX `IX_Relationship44` ON `PAS_PersonHistory` (`uuidPerson`)
;

ALTER TABLE `PAS_PersonHistory` ADD  PRIMARY KEY (`uuid`)
;

-- Table PAS_Religion

CREATE TABLE `PAS_Religion`
(
  `uuid` Varchar(36) NOT NULL,
  `name` Varchar(250) NOT NULL,
  `r_description` Varchar(1000)
)
;

ALTER TABLE `PAS_Religion` ADD  PRIMARY KEY (`uuid`)
;

-- Create relationships section ------------------------------------------------- 

ALTER TABLE `PAS_PersonPatient` ADD CONSTRAINT `Relationship3` FOREIGN KEY (`uuid`) REFERENCES `PAS_Person` (`uuid`) ON DELETE RESTRICT ON UPDATE RESTRICT
;

ALTER TABLE `PAS_Person` ADD CONSTRAINT `Relationship4` FOREIGN KEY (`uuidRole`) REFERENCES `PAS_Role` (`uuid`) ON DELETE RESTRICT ON UPDATE RESTRICT
;

ALTER TABLE `PAS_PersonUser` ADD CONSTRAINT `Relationship7` FOREIGN KEY (`uuid`) REFERENCES `PAS_Person` (`uuid`) ON DELETE RESTRICT ON UPDATE RESTRICT
;

ALTER TABLE `PAS_PersonPsychologist` ADD CONSTRAINT `Relationship8` FOREIGN KEY (`uuid`) REFERENCES `PAS_PersonUser` (`uuid`) ON DELETE RESTRICT ON UPDATE RESTRICT
;

ALTER TABLE `PAS_PersonAdmin` ADD CONSTRAINT `Relationship9` FOREIGN KEY (`uuid`) REFERENCES `PAS_PersonUser` (`uuid`) ON DELETE RESTRICT ON UPDATE RESTRICT
;

ALTER TABLE `PAS_RoleMenu` ADD CONSTRAINT `Relationship10` FOREIGN KEY (`uuidRole`) REFERENCES `PAS_Role` (`uuid`) ON DELETE RESTRICT ON UPDATE RESTRICT
;

ALTER TABLE `PAS_RoleMenu` ADD CONSTRAINT `Relationship11` FOREIGN KEY (`uuidMenu`) REFERENCES `PAS_Menu` (`uuid`) ON DELETE RESTRICT ON UPDATE RESTRICT
;

ALTER TABLE `PAS_Audit` ADD CONSTRAINT `Relationship12` FOREIGN KEY (`uuidPersonUser`) REFERENCES `PAS_PersonUser` (`uuid`) ON DELETE RESTRICT ON UPDATE RESTRICT
;

ALTER TABLE `PAS_Audit` ADD CONSTRAINT `Relationship13` FOREIGN KEY (`uuidAction`) REFERENCES `PAS_Action` (`uuid`) ON DELETE RESTRICT ON UPDATE RESTRICT
;

ALTER TABLE `PAS_EncryptionControl` ADD CONSTRAINT `Relationship14` FOREIGN KEY (`uuidPersonUser`) REFERENCES `PAS_PersonUser` (`uuid`) ON DELETE RESTRICT ON UPDATE RESTRICT
;

ALTER TABLE `PAC_Case` ADD CONSTRAINT `Relationship15` FOREIGN KEY (`uuidAssignedUser`) REFERENCES `PAS_PersonUser` (`uuid`) ON DELETE RESTRICT ON UPDATE RESTRICT
;

ALTER TABLE `PAC_Case` ADD CONSTRAINT `Relationship16` FOREIGN KEY (`uuidOwnerUser`) REFERENCES `PAS_PersonUser` (`uuid`) ON DELETE RESTRICT ON UPDATE RESTRICT
;

ALTER TABLE `PAC_Case` ADD CONSTRAINT `Relationship17` FOREIGN KEY (`uuidPersonPatient`) REFERENCES `PAS_PersonPatient` (`uuid`) ON DELETE RESTRICT ON UPDATE RESTRICT
;

ALTER TABLE `PAC_Case` ADD CONSTRAINT `Relationship18` FOREIGN KEY (`uuidStage`) REFERENCES `PAC_Stage` (`uuid`) ON DELETE RESTRICT ON UPDATE RESTRICT
;

ALTER TABLE `PAC_StageCaseHistory` ADD CONSTRAINT `Relationship19` FOREIGN KEY (`uuidCase`) REFERENCES `PAC_Case` (`uuid`) ON DELETE RESTRICT ON UPDATE RESTRICT
;

ALTER TABLE `PAC_StageCaseHistory` ADD CONSTRAINT `Relationship20` FOREIGN KEY (`uuidStage`) REFERENCES `PAC_Stage` (`uuid`) ON DELETE RESTRICT ON UPDATE RESTRICT
;

ALTER TABLE `PAC_StageCaseHistory` ADD CONSTRAINT `Relationship21` FOREIGN KEY (`uuidPersonUser`) REFERENCES `PAS_PersonUser` (`uuid`) ON DELETE RESTRICT ON UPDATE RESTRICT
;

ALTER TABLE `PAC_CaseInitialStage` ADD CONSTRAINT `Relationship22` FOREIGN KEY (`uuid`) REFERENCES `PAC_Case` (`uuid`) ON DELETE RESTRICT ON UPDATE RESTRICT
;

ALTER TABLE `PAC_CaseDiagnosticStage` ADD CONSTRAINT `Relationship23` FOREIGN KEY (`uuid`) REFERENCES `PAC_Case` (`uuid`) ON DELETE RESTRICT ON UPDATE RESTRICT
;

ALTER TABLE `PAC_CaseIntermediateStage` ADD CONSTRAINT `Relationship24` FOREIGN KEY (`uuid`) REFERENCES `PAC_Case` (`uuid`) ON DELETE RESTRICT ON UPDATE RESTRICT
;

ALTER TABLE `PAC_CaseCloseStage` ADD CONSTRAINT `Relationship25` FOREIGN KEY (`uuid`) REFERENCES `PAC_Case` (`uuid`) ON DELETE RESTRICT ON UPDATE RESTRICT
;

ALTER TABLE `PAC_DiagnosedProblems` ADD CONSTRAINT `Relationship26` FOREIGN KEY (`uuidCaseDiagnosticStage`) REFERENCES `PAC_CaseDiagnosticStage` (`uuid`) ON DELETE RESTRICT ON UPDATE RESTRICT
;

ALTER TABLE `PAC_DiagnosedProblems` ADD CONSTRAINT `Relationship27` FOREIGN KEY (`uuidDSM5`) REFERENCES `PAC_DSM5` (`uuid`) ON DELETE RESTRICT ON UPDATE RESTRICT
;

ALTER TABLE `PAC_TherapeuticPlanActivity` ADD CONSTRAINT `Relationship28` FOREIGN KEY (`uuidCaseIntermediateStage`) REFERENCES `PAC_CaseIntermediateStage` (`uuid`) ON DELETE RESTRICT ON UPDATE RESTRICT
;

ALTER TABLE `PAC_TestingApplication` ADD CONSTRAINT `Relationship29` FOREIGN KEY (`uuidCaseInitialStage`) REFERENCES `PAC_CaseInitialStage` (`uuid`) ON DELETE RESTRICT ON UPDATE RESTRICT
;

ALTER TABLE `PAC_TestingApplication` ADD CONSTRAINT `Relationship30` FOREIGN KEY (`uuidTestType`) REFERENCES `PAC_TestType` (`uuid`) ON DELETE RESTRICT ON UPDATE RESTRICT
;

ALTER TABLE `PAC_CaseAssigmentHistory` ADD CONSTRAINT `Relationship31` FOREIGN KEY (`uuidFromPersonUser`) REFERENCES `PAS_PersonUser` (`uuid`) ON DELETE RESTRICT ON UPDATE RESTRICT
;

ALTER TABLE `PAC_CaseAssigmentHistory` ADD CONSTRAINT `Relationship32` FOREIGN KEY (`uuidToPersonUser`) REFERENCES `PAS_PersonUser` (`uuid`) ON DELETE RESTRICT ON UPDATE RESTRICT
;

ALTER TABLE `PAC_CaseAssigmentHistory` ADD CONSTRAINT `Relationship33` FOREIGN KEY (`uuidAprovePersonAdmin`) REFERENCES `PAS_PersonAdmin` (`uuid`) ON DELETE RESTRICT ON UPDATE RESTRICT
;

ALTER TABLE `PAC_CaseAssigmentHistory` ADD CONSTRAINT `Relationship34` FOREIGN KEY (`uuidCase`) REFERENCES `PAC_Case` (`uuid`) ON DELETE RESTRICT ON UPDATE RESTRICT
;

ALTER TABLE `PAC_Meeting` ADD CONSTRAINT `Relationship35` FOREIGN KEY (`uuidCase`) REFERENCES `PAC_Case` (`uuid`) ON DELETE RESTRICT ON UPDATE RESTRICT
;

ALTER TABLE `PAC_Meeting` ADD CONSTRAINT `Relationship36` FOREIGN KEY (`uuidTherapeuticPlanActivity`) REFERENCES `PAC_TherapeuticPlanActivity` (`uuid`) ON DELETE RESTRICT ON UPDATE RESTRICT
;

ALTER TABLE `PAA_Address` ADD CONSTRAINT `Relationship37` FOREIGN KEY (`uuidPerson`) REFERENCES `PAS_Person` (`uuid`) ON DELETE RESTRICT ON UPDATE RESTRICT
;

ALTER TABLE `PAA_Address` ADD CONSTRAINT `Relationship38` FOREIGN KEY (`uuidMeeting`) REFERENCES `PAC_Meeting` (`uuid`) ON DELETE RESTRICT ON UPDATE RESTRICT
;

ALTER TABLE `PAA_State` ADD CONSTRAINT `Relationship39` FOREIGN KEY (`uuidCountry`) REFERENCES `PAA_Country` (`uuid`) ON DELETE RESTRICT ON UPDATE RESTRICT
;

ALTER TABLE `PAA_City` ADD CONSTRAINT `Relationship40` FOREIGN KEY (`uuidState`) REFERENCES `PAA_State` (`uuid`) ON DELETE RESTRICT ON UPDATE RESTRICT
;

ALTER TABLE `PAA_Address` ADD CONSTRAINT `Relationship43` FOREIGN KEY (`uuidCity`) REFERENCES `PAA_City` (`uuid`) ON DELETE RESTRICT ON UPDATE RESTRICT
;

ALTER TABLE `PAS_PersonHistory` ADD CONSTRAINT `Relationship44` FOREIGN KEY (`uuidPerson`) REFERENCES `PAS_Person` (`uuid`) ON DELETE RESTRICT ON UPDATE RESTRICT
;

ALTER TABLE `PAS_Person` ADD CONSTRAINT `Relationship46` FOREIGN KEY (`uuidReligion`) REFERENCES `PAS_Religion` (`uuid`) ON DELETE RESTRICT ON UPDATE RESTRICT
;

