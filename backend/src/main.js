const https = require('https')
const http = require('https')
const fs = require('fs');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express()
const path = require('path')
const ping = require('./middlewares/middle.database')
const { Auth } = require('./middlewares/auth')
const server = require('./lib/utils/env.config')

app.set('port', process.env.PORT || server.portserver || 3000)

app.use(cors())
// app.use(ping)
app.use(morgan('dev'))
app.use(express.json({ limit: '20mb' }))
app.use(express.urlencoded({ extended: false, limit: '10mb' }))

/** Static files for email templates */
app.use(express.static(path.join(__dirname, 'public')))
app.use("/public", express.static(__dirname + "/public"));

/** Free access routes */
app.use(require('./routes/auth.route'))

/** Protected access routes */
app.use('/psicoapp/v1', Auth, require('./routes/routes'))

//Starting the server


//configuracion de certificado
// Certificate
const privateKey = fs.readFileSync('/etc/letsencrypt/live/psicoapp.online/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/psicoapp.online/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/psicoapp.online/chain.pem', 'utf8');


const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca
};

const httpsServer=https.createServer(credentials,app);
httpsServer.listen(app.get('port'), () => {
	console.log(`Listen and server on port: ${app.get('port')}`);
});

/*
const httpServer=http.createServer(app);
httpServer.listen(app.get('port'), () => {
	console.log(`Listen and server on port: ${app.get('port')}`);
});*/