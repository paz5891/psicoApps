const { OAuth2Client } = require('google-auth-library');
const credentialsOAuth2 = require('../lib/utils/env.config')

const client = new OAuth2Client(
    // '143496961981-ujnpieglv56e3etvkuph88s9s8ihp6t6.apps.googleusercontent.com',
    // 'MItQEzBUG1DIsncqUEkVRfXc',
    // process.env.GOOGLE_CLIENT_ID,
    // process.env.GOOGLE_CLIENT_SECRET,
    /**
     * To get access_token and refresh_token in server side,
     * the data for redirect_uri should be postmessage.
     * postmessage is magic value for redirect_uri to get credentials without actual redirect uri.
     */
    credentialsOAuth2.clientIdGoogle,
    credentialsOAuth2.clientSecretGoogle,
    'postmessage'
);

exports.getProfileInfo = async (code) => {
    const r = await client.getToken(code);
    const idToken = r.tokens.id_token;

    const ticket = await client.verifyIdToken({
        idToken,
        audience: credentialsOAuth2.clientIdGoogle,
    });

    const payload = ticket.getPayload();

    return payload;
};
