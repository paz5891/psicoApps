const StorageCaseStage = require('../storage/casestage_storage')
const { getDataUserCase } = require('../storage/case_storage')
const stages = require('../lib/utils/casestages')

const casestageService = {}

casestageService.changeCaseStageToDagnostic = async (uuidCaseInitialStage, uuidUserFromToken, rol) => {

    if (rol == 'admin') {
        let query = `
        SELECT c.uuid FROM PAC_Case c
        INNER JOIN PAC_CaseDiagnosticStage cds ON cds.uuid = c.uuid
        WHERE c.uuid = ?;
        `
        let values = [uuidCaseInitialStage]

        /** 2 = etapa diagnóstico, 
        *  1 = etapa inicial
        */
        return await StorageCaseStage.existCaseStage(query, values, 2, 1)
            .then((data) => {
                if (data.no == 1) {
                    return data
                }

                return data
            })
    } else {
        let query = `
        SELECT c.uuid FROM PAC_Case c
        INNER JOIN PAC_CaseDiagnosticStage cds ON cds.uuid = c.uuid
        WHERE c.uuid = ? 
        AND c.uuidAssignedUser = ?;
        `

        let values = [uuidCaseInitialStage, uuidUserFromToken]
        /** 2 = etapa diagnóstico, 
         *  1 = etapa inicial
         */
        return await StorageCaseStage.existCaseStage(query, values, 2, 1)
            .then((data) => {
                if (data.no == 1) {
                    return StorageCaseStage.caseInitialIsOk(uuidCaseInitialStage, uuidUserFromToken)
                        .then((data) => {
                            if (data.no) {
                                if (data.no == 1) {
                                    return data
                                }
                            }

                            if (
                                !data[0].currentProblem ||
                                !data[0].genogramFile ||
                                !data[0].mentalEvaluationTest ||
                                !data[0].mentalEvaluationTestFile ||
                                !data[0].clinicalInterpretation ||
                                !data[0].clinicalInterpretationFile ||
                                !data[0].interpreationOfEvidence ||
                                !data[0].interpreationOfEvidenceFile ||
                                !data[0].therapeuticContract ||
                                !data[0].therapeuticContractFile
                            ) {
                                return {
                                    id: uuidCaseInitialStage,
                                    no: 1
                                }
                            } else {
                                return StorageCaseStage.changeCaseStage(stages[1], uuidCaseInitialStage, uuidUserFromToken)
                            }

                        })
                }

                return data
            })
    }

}

/** Evalua la etapa de diagnóstico y cambia el estado del caso a intermedio */
casestageService.changeCaseStageToIntermediate = async (uuidCase, uuidUserFromToken, rol) => {
    console.log(uuidCase, uuidUserFromToken, rol)
    let query = `
    SELECT COUNT(c.uuid) AS count FROM PAC_Case c
    INNER JOIN  PAC_CaseIntermediateStage cis ON cis.uuid = c.uuid `;
    let values;

    if (rol == 'admin') {
        query += ` WHERE c.uuid = ?;`;
        values = [uuidCase]

        /** 2 = etapa diagnóstico, 
        *  3 = etapa intermedia
        */
        return await StorageCaseStage.existCaseStage(query, values, 3, 2)

    } else {
        query += `
        WHERE c.uuid = ?
        AND c.uuidAssignedUser = ?;`;

        values = [uuidCase, uuidUserFromToken]
        /** 2 = etapa diagnóstico, 
        *  3 = etapa intermedia
        */

        return await StorageCaseStage.existCaseStage(query, values, 3, 2)
            .then(data => {
                if (data.no == 2) {
                    return StorageCaseStage.caseDiagnosticIsOk(uuidCase, uuidUserFromToken)
                        .then(data => {
                            if (data.no == 3) {
                                return StorageCaseStage.updateStageCase(stages[2], uuidCase, uuidUserFromToken, 3)
                            }
                            return data
                        })
                }
                return data
            })
    }

}

/** Evalua la etapa intermedia unicamente para darle paso a la siguiente etapa */
casestageService.caseIntermediateIsOk = async (uuidCase, uuidUserFromToken) => {
    return await StorageCaseStage.caseIntermediateIsOk(uuidCase, uuidUserFromToken)
}

/*** Retorna el estado del caso  */
/**
 * 1 = inicial
 * 2 = diagnostico
 * 3 = intermedio
 * 4 = finalizado
 */
casestageService.getStageCase = async (uuidCase) => {
    return await getDataUserCase(uuidCase)
        .then(data => {
            if (data.uuidStage == stages[0]) {
                return 1
            }

            if (data.uuidStage == stages[1]) {
                return 2
            }

            if (data.uuidStage == stages[2]) {
                return 3
            }

            if (data.uuidStage == stages[3]) {
                return 4
            }

            throw {
                code: 404
            }
        })
}

module.exports = casestageService