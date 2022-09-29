const { validationResult } = require('express-validator');
const jwt = require('../helper/jwt-token')
const userService = require('../services/user_service')
const { getProfileInfo } = require('../helper/oauth.gmail')
const { sendNotificationActive, sendNotificationForActivateAccount,sendNotificationInactive} = require('../services/notification.mail')
const respondError = require('./respond');
const config = require('../lib/utils/env.config')

const userController = {}

const regExEmail = /^[a-zA-Z0-9._-]+@miumg.edu.gt/i

userController.OAuthWithGoogle = async (req, res) => {
    const errorsrex = validationResult(req)
    if (!errorsrex.isEmpty()) {
        return res.status(http.StatusBadRequest).json({ errorsrex: errorsrex.array() });
    }

    const code = req.body.code
    if (!code) {
        return res
            .status(400)
            .json({
                ok: false,
                message: 'No se encuentra el token.',
                data: []
            })
    }
    try {
        const profile = await getProfileInfo(code)

        if (profile.email != config.email) {
            let isOk = regExEmail.test(profile.email)
            if (!isOk) {
                return res
                    .status(401)
                    .json({
                        ok: false,
                        message: 'Su dominio de correo no es admitido.',
                        data: []
                    })
            }
        }

        let results;
        let data;
        let status = 200;
        let ok = true;
        let tokenjwt;
        let message;

        results = await userService.getCredentials(profile.email)
        if (results.ok) {
            tokenjwt = await jwt.CreateToken(results.data.id, results.data.rol)
            message = `Bienvenido al sistema ${profile.email}.`
            data = {
                picture: profile.picture,
                email: profile.email,
                rol: results.data.rol,
                token: tokenjwt,
            }
        }

        if (!results.ok) {
            results = await userService.createUser(profile.sub, profile.email, profile.given_name, profile.family_name)
            sendNotificationForActivateAccount(profile)
            status = 201;
            message = 'Su cuenta se encuentra en proceso de activación.'
            data = {
                picture: null,
                email: null,
                rol: null,
                token: null
            }
        }


        return res
            .status(status)
            .json({
                ok: ok,
                message: message,
                data: data
            })

    } catch (error) {

        if (error.status == 404) {
            return res
                .status(404)
                .json({
                    ok: false,
                    message: 'Usuario o contraseña incorrectos.',
                    data: []
                })
        }

        if (error.status == 1062) {
            return res
                .status(406)
                .json({
                    ok: false,
                    message: "Su cuenta se encuentra inactiva.",
                    data: []
                })
        }

        respondError(res, error)
        return
    }
}


userController.activeAccount = async (req, res) => {
    const { id, state } = req.body
    if (!id || state != 0 && state != 1) {
        return res
            .status(400)
            .json({
                ok: false,
                message: `Su solicitud está imcompleta: expected: id and state, got id: ${id || undefined}, state: ${state || undefined}.`,
                data: []
            })
    }
    if (typeof state != 'number') {
        return res
            .status(400)
            .json({
                ok: false,
                message: "El estado debe ser de tipo number.",
                data: []
            })
    }

    try {
        let states = await userService.getState(id)
        if (states.data.active == state) {
            return res
                .status(400)
                .json({
                    ok: true,
                    message: `No se puede sobreescribir el estado del usuario.`,
                    data: {
                        id: id
                    }
                })
        }

        sendNotificationActive(states.data, state)
        
        let results = await userService.activeAccount(state, id);

        return res
            .status(200)
            .json({
                ok: true,
                message: `El estado del usuario ${id} ha sido modificado.`,
                data: {
                    id: results.id
                }
            })
    } catch (error) {

        if (error.status == 404) {
            return res
                .status(404)
                .json({
                    ok: false,
                    message: `El registro ${error.id} no fue encontrado.`,
                    data: []
                })
        }
        respondError(res, error)
        return
    }
}



userController.deleteUser = async (req, res) => {
    const { id } = req.body    
    if (!id) {
        return res
            .status(400)
            .json({
                ok: false,
                message: `Su solicitud está imcompleta: expected: id and state, got id: ${id || undefined}.`,
                data: []
            })
    }

    try {
       
        let results = await userService.deleteUser(id)
        let states = await userService.getState(id)
        sendNotificationInactive(states.data)

        return res
            .status(200)
            .json({
                ok: true,
                message: `El estado del usuario ${id} ha sido Removido Exitosamente.`,
                data: {
                    id: results.id
                }
            })
    } catch (error) {

        if (error.status == 404) {
            return res
                .status(404)
                .json({
                    ok: false,
                    message: `El registro ${error.id} no fue encontrado.`,
                    data: []
                })
        }
        respondError(res, error)
        return
    }
}

module.exports = userController;