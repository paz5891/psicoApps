const Address = require("./address.model")


class Attendant extends Address {
    constructor(
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
        secondLastNameExtra
    ) {
        super();
        this.firstNameFather = firstNameFather
        this.secondNameFather = secondNameFather
        this.lastNameFather = lastNameFather
        this.secondLastNameFather = secondLastNameFather
        this.firstNameMother = firstNameMother
        this.secondNameMother = secondNameMother
        this.lastNameMother = lastNameMother
        this.secondLastNameMother = secondLastNameMother
        this.firstNameExtra = firstNameExtra
        this.secondNameExtra = secondNameExtra
        this.lastNameExtra = lastNameExtra
        this.secondLastNameExtra = secondLastNameExtra
    }
}

module.exports = Attendant;