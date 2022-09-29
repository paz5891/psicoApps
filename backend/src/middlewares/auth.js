const jwt = require('jwt-simple')
const http = require('../lib/utils/status.response')
const { JWT_SECRET } = require('../certificates/jwt-config')

const AuthGoogle = {}

AuthGoogle.Auth = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            return res
                .status(http.StatusUnauthorized)
                .json({
                    ok: false,
                    message: 'Unauthorized',
                    data: []
                })
        }

        var token = req.headers.authorization.split(" ")[1];
        if (!token) {
            return res
                .status(http.StatusUnauthorized)
                .json({
                    ok: false,
                    message: 'Unauthorized, token not found in the request',
                    data: []
                })
        }

        var payload = jwt.decode(token, JWT_SECRET)
        req.user = {
            id: payload.sub,
            rol: payload.rol
        };

        next()
    } catch (error) {
        if (error.message == 'Token expired') {
            return res
                .status(401)
                .json({
                    ok: false,
                    message: 'Token was expired',
                    data: []
                })
        }

        if (error.message == 'Signature verification failed') {
            return res
                .status(401)
                .json({
                    ok: false,
                    message: 'Signature of the token is invalid',
                    data: []
                })
        }

        console.log(error)
        return res
            .status(401)
            .json({
                ok: false,
                message: 'The token is invalid',
                data: []
            })

    }
}


module.exports = AuthGoogle;