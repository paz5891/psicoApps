const StorageCaseInitial = require('../storage/caseinitial_storage');
const { fieldsForQuery } = require('../lib/utils/rex.files')

const CaseInitialService = {}

CaseInitialService.generateQuery = async (DataForQuery, id, uuidUserFromToken) => {
    console.log(uuidUserFromToken)

    var count = 0;
    var Query = `UPDATE `
    var QuerySelect = `SELECT `
    var value;

    for (var key in DataForQuery) {
        count++;
        if (count >= 2) {
            break;
        }
        if (fieldsForQuery.includes(`${key}`)) {
            value = DataForQuery[key]
            /*--Esta query genérica actualiza un campo, por uuid de caso y por uuid de usuario--*/
            Query += ` 
            PAC_CaseInitialStage ci
                INNER JOIN PAC_Case c ON ci.uuid = c.uuid
            SET 
                ci.${key.split(" ")[0].trim()} = ?
            WHERE ci.uuid = ? AND c.uuidAssignedUser = ?;
            `
            /*--Esta consulta genérica extrae el nombre del campo, por si es archivo--*/
            QuerySelect += ` 
            ci.${key.split(" ")[0].trim()} FROM PAC_CaseInitialStage ci
            INNER JOIN PAC_Case c ON ci.uuid = c.uuid
            WHERE ci.uuid = ? AND c.uuidAssignedUser = ?
            `
        } else {
            throw {
                error: 401,
                errmessage: `El campo: ${key} es desconocido`,
                fileToDelete: DataForQuery[key]
            }
        }
    }


    let values = [value, id, uuidUserFromToken]

    return await StorageCaseInitial.extractFieldFile(QuerySelect, values, id)
        .then((NameFile) => {
            return StorageCaseInitial.update(Query, values, NameFile)
        })
}

CaseInitialService.getAll = async () => {
    return await StorageCaseInitial.getAll();
}

CaseInitialService.getOnly = async (uuidCase, uuidUserFromToken, rol) => {
    let query = `SELECT * FROM PAC_CaseInitialStage `
    let values;

    if (rol == 'admin') {
        query += `WHERE uuid = ?;`
        values = [uuidCase]

    } else {

        query += `
        ci INNER JOIN PAC_Case c ON c.uuid = ci.uuid
        WHERE ci.uuid = ?
        AND c.uuidAssignedUser = ?
        `
        values = [uuidCase, uuidUserFromToken]
    }


    return await StorageCaseInitial.getOnly(query, values)
}

module.exports = CaseInitialService;

