const person = require('../../src/services/person_service')

test('Obtener persona', async () => {
    let object = JSON.parse(JSON.stringify({
        "active": 1,
        "addressLine1": "Bo, Jalapa",
        "attachment": "c034d1ca-3a76-4eee-a2d8-b404e7c832c4.sql",
        "comment": "Otro al respecto",
        "email": "marold97@hotmail.com",
        "firstName": "mynor",
        "id": "2020-PAS28-00028",
        "lastName": "Castrillo",
        "mobilePhone": "45720194"
    }))
    let result = await person.get('2020-PAS28-00028')
    expect(result).toEqual(object)
})
