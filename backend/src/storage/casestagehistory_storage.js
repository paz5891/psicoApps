const pool = require('../lib/database/database');
const CaseStageHistory = require('../models/casehistory.model');

const StorageStageHistory = {};

StorageStageHistory.create = async (StageData, userInfo) => {
    let data = new CaseStageHistory()
    data = StageData;
    let query;
    console.log(userInfo);
    if (userInfo.rol === "admin") {
        query = `
        INSERT INTO
        PAC_StageCaseHistory (
                uuid,
                uuidCase,
                uuidStage,
                dateEvent,
                uuidPersonUser,
                comment,
                attachment
            )
        VALUES
            (
                ?,
                ?,
                (
                    SELECT
                        c.uuidStage
                    FROM PAC_Case c
                    WHERE
                        c.uuid = ?
                ), ?,?,?,?);
        `;
    } else {
        query = `
        INSERT INTO
        PAC_StageCaseHistory (
                uuid,
                uuidCase,
                uuidStage,
                dateEvent,
                uuidPersonUser,
                comment,
                attachment
            )
        VALUES
            (
                ?,
                ?,
                (
                    SELECT
                        c.uuidStage
                    FROM PAC_Case c
                    WHERE
                        c.uuid = ?
                        AND c.uuidAssignedUser = ?
                ), ?,?,?,?);
        `;
    }
    return new Promise((resolve, reject) => {
        pool.query(query,
            (userInfo.rol === "admin") ?
                [
                    data.uuid,
                    data.uuidCase, //
                    data.uuidCase,
                    data.dateEvent,
                    userInfo.id,
                    data.comment,
                    data.attachment

                ]
                :
                [
                    data.uuid,
                    data.uuidCase, //
                    data.uuidCase,
                    data.uuidPersonUser,///

                    data.dateEvent,
                    data.uuidPersonUser,
                    data.comment,
                    data.attachment

                ]
            , (err, results, fields) => {
                if (err) {
                    if (err.errno) {
                        reject({
                            err: err,
                            code: err.errno,
                            fileToDelete: data.attachment
                        })
                    }

                    reject({
                        err: err,
                        code: null,
                        fileToDelete: data.attachment
                    })
                }

                resolve(data)
            })
    })
}


module.exports = StorageStageHistory;