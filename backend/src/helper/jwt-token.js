const jwt = require('jwt-simple');
const moment = require('moment');
const { JWT_SECRET } = require('../certificates/jwt-config');

exports.CreateToken = async function (id, rol) {
    var payload = {
        rol: rol,
        sub: id,
        iat: moment().unix(),
        // exp: moment().add(24, "hours").unix(),
    };

    return jwt.encode(payload, JWT_SECRET);
}