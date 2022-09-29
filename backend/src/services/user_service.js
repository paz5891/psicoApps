const userStorage = require('../storage/user.storage')
const configInsert = require('../lib/utils/env.config')
const uuidPSA = require('../lib/utils/uuid_psa')
const userService = {}

userService.getCredentials = async (email) => {
    return await userStorage.getCredentials(email)
}

userService.createUser = async (idPersonFromGoogle, email, firstname, lastname) => {

    let role = configInsert.defaultRoleUser
    let activeAccount = configInsert.defaultActiveUser
    let idUser = await uuidPSA.generate('PAS_Person', 'PSAU')

    return await userStorage.createUser(idPersonFromGoogle, idUser, email, firstname, lastname, role, activeAccount)
}

userService.activeAccount = async (state, idPerson) => {
    return await userStorage.activeAccount(state, idPerson)
}

userService.getState = async (id) => {
    return await userStorage.getState(id)
}

userService.deleteUser = async (id) => {
    return await userStorage.deleteUser(id)
}
module.exports = userService;