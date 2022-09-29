/**
 *@alias id should be in this format 2020-PSA-00005
 */

const pool = require('../database/database')
const UUID20 = {}

UUID20.call = async (tableName) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT COUNT(*) AS COUNT FROM ${tableName};`, (err, results, fields) => {
            if (err) {
                console.log(err);
                reject(err)
            };
            resolve(results[0].COUNT)
        })
    })
}
// Genera un id con formato 0^N+Q
// Donde 0^N es la cantidad de 0 que se anteponen y Q el numero real
// Ejemplo 00009 || 0000023
UUID20.create = async (nr, n, str) => {
    return Array(n - String(nr).length + 1).join(str || '0') + nr;
}

// Genera un id con formato Year-PSADay-0^N+Count
// Donde 0^N es la cantidad de 0 que se anteponen y Count el contador de la DB
// Ejemplo 2020-PSA21-00026
UUID20.generate = async (tableName, prefix) => {
    try {
        let date = new Date()
        let count = await UUID20.call(tableName)
        let idpent = await UUID20.create(parseInt(count) + 1, 5)

        return date.getFullYear() + `-${prefix}${date.getDate()}-` + idpent

    } catch (error) {
        console.log(error);
    }
}

UUID20.test = async () => {
    let idres = await UUID20.generate()
    console.log(idres);
}

// console.log(UUID20.test());
module.exports = UUID20;