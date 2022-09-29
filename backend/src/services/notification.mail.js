const nodemailer = require('nodemailer')
const config = require('../lib/utils/env.config')
const notification = {}
let host = 'https://psicoapp.online:4000'

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.email,
        pass: config.emailPassword
    }
});

notification.sendNotificationActive = async (parameters, state) => {
    if (state == 1) {

        let mailOptions = {
            from: `"PsicoApp" ${config.email}`,
            to: parameters.email,
            subject: "Activación de cuenta ✔",
            html: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mailer</title>
    <style>
        .text-center {
            text-align: justify;
        }

        .content-center {
            align-content: center;
        }

        .color-gray {
            color: rgb(54, 54, 54);
        }

        .font {
            font-family: Arial, Helvetica, sans-serif;
            font-weight: bold;
            font-size: 1.5rem;
        }

        .bg-gray {
            background-color: rgb(245, 245, 245);
            padding: 0% !important;
            margin: 0% !important;
        }

        .bg-blue {
            color: rgb(14, 14, 68);
        }

        .bg-dark {
            background-color: rgb(250, 250, 255);
        }
    </style>
</head>
<body>
    <div style="padding-top: 2rem; padding-left: 2%; padding-right: 2%;">
        <div class="ed-container s-py-2 s-px-2 m-py-2 l-p-2 s-px-2 center color-gray bg-dark"
            style="border-radius: 6px 6px 6px 6px;">
            <div class="ed-item ed-container" style="border-radius: 8px 8px 8px 8px; ">
                <div class="ed-item"
                    style="background-color: rgb(1, 23, 71); color: ghostwhite; display:flex; align-content: flex-start; align-items: center; padding-top: 2px; margin-bottom: 2px;">
                    <div class="s-15 m-10 l-10 s-mr-1">
                        <!--Contenedor de la imagen-->
                        <div class="circle ">
                            <img src="${host}/public/img/logoumg.png" width="85px" height="70px">
                        </div>
                        <!--Profesor-->
                    </div>
                    <div style="text-align:center;">
                        <h5 style="font-size: 18px; font-weight: bold;">Bienvenid@ ${parameters.firstName || ''} ${parameters.lastName || ''} a PsicoApp</h5>
                    </div>
                </div>
                <div class="ed-item s-py-2">
                    <div class="text-center font">
                        <h5 style="font-size: 18px; font-weight: bold;">
                            Gracias por unirte, por este medio hacemos de tu conocimiento que tu cuenta en PsicoApp
                            System ha sido activada satisfactoriamente, por lo que ya puedes hacer uso de la misma.
                            Consulta con tu catedrático asesor si necesitas más información.
                        </h5>
                    </div>
                    <div style="padding-top: 20px; text-align: right;">
                        <strong style="color: rgb(209, 33, 33);"> Este correo fue generado automaticamente por el sistema</strong>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>`
        }

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            }
        });
    }
}

notification.sendNotificationInactive = async (parameters) => {
 

        let mailOptions = {
            from: `"PsicoApp" ${config.email}`,
            to: parameters.email,
            subject: "Desactivación de cuenta X",
            html: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mailer</title>
    <style>
        .text-center {
            text-align: justify;
        }

        .content-center {
            align-content: center;
        }

        .color-gray {
            color: rgb(54, 54, 54);
        }

        .font {
            font-family: Arial, Helvetica, sans-serif;
            font-weight: bold;
            font-size: 1.5rem;
        }

        .bg-gray {
            background-color: rgb(245, 245, 245);
            padding: 0% !important;
            margin: 0% !important;
        }

        .bg-blue {
            color: rgb(14, 14, 68);
        }

        .bg-dark {
            background-color: rgb(250, 250, 255);
        }
    </style>
</head>
<body>
    <div style="padding-top: 2rem; padding-left: 2%; padding-right: 2%;">
        <div class="ed-container s-py-2 s-px-2 m-py-2 l-p-2 s-px-2 center color-gray bg-dark"
            style="border-radius: 6px 6px 6px 6px;">
            <div class="ed-item ed-container" style="border-radius: 8px 8px 8px 8px; ">
                <div class="ed-item"
                    style="background-color: rgb(1, 23, 71); color: ghostwhite; display:flex; align-content: flex-start; align-items: center; padding-top: 2px; margin-bottom: 2px;">
                    <div class="s-15 m-10 l-10 s-mr-1">
                        <!--Contenedor de la imagen-->
                        <div class="circle ">
                            <img src="${host}/public/img/logoumg.png" width="85px" height="70px">
                        </div>
                        <!--Profesor-->
                    </div>
                    <div style="text-align:center;">
                        <h5 style="font-size: 18px; font-weight: bold;">La cuenta perteniciente al usuario ${parameters.firstName || ''} ${parameters.lastName || ''} a sido desactivada de la plataforma de PsicoApp</h5>
                    </div>
                </div>
                <div class="ed-item s-py-2">
                    <div class="text-center font">
                        <h5 style="font-size: 18px; font-weight: bold;">
                            Gracias por haber utilizado los servicios de psicoapp!
                        </h5>
                    </div>
                    <div style="padding-top: 20px; text-align: right;">
                        <strong style="color: rgb(209, 33, 33);"> Este correo fue generado automaticamente por el sistema</strong>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>`
        }

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            }
        });
    
}









notification.sendNotificationForActivateAccount = async (parameters) => {

    let mailOptions = {
        from: `"PsicoApp" ${config.email}`,
        to: config.email,
        subject: "Solicitud de activación ✎",
        html: `
                <!DOCTYPE html>
                    <html lang="en">

                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    </head>

                    <body>
                        <div style="height: 40px">
                            <h3 align="center" style="font-family: Arial, Helvetica, sans-serif; color: rgb(68, 67, 67);"> 
                                El usuario ${parameters.name || ''} solicita la activación de su cuenta.</h3>
                                <p align="center" style="font-family: Arial, Helvetica, sans-serif; color: rgb(6, 6, 124);">
                            <strong>
                            <a href="http://psicoapp.online:8080/users">Dirijase acá para activar al usuario</a>
                            </strong>
                        </p>
                        </div>
                    </body>

                </html>`
    }

    sendMail(mailOptions)

}

notification.sendNotificationForDessistmentCase = async (email, name, numbercase) => {

    let mailOptions = {
        from: `"PsicoApp" ${config.email}`,
        to: config.email,
        subject: "Solicitud de desistimiento de caso",
        html: `
                <!DOCTYPE html>
                    <html lang="en">

                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    </head>

                    <body>
                        <div style="height: 40px">
                            <h3 align="center" style="font-family: Arial, Helvetica, sans-serif; color: rgb(68, 67, 67);"> 
                                El usuario ${name || ''} solicita el desistimiento del caso ${numbercase || ''}.</h3>
                                <p align="center" style="font-family: Arial, Helvetica, sans-serif; color: rgb(6, 6, 124);">
                        </p>
                        </div>
                    </body>

                </html>`
    }

    sendMail(mailOptions)
}

notification.desistmentIsAproved = (data) => {
    let mailOptions = {
        from: `"PsicoApp" ${config.email}`,
        to: data.email,
        subject: "Solicitud de desistimiento de caso",
        html: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mailer</title>
    <style>
        .text-center {
            text-align: justify;
        }

        .content-center {
            align-content: center;
        }

        .color-gray {
            color: rgb(54, 54, 54);
        }

        .font {
            font-family: Arial, Helvetica, sans-serif;
            font-weight: bold;
            font-size: 1.5rem;
        }

        .bg-gray {
            background-color: rgb(245, 245, 245);
            padding: 0% !important;
            margin: 0% !important;
        }

        .bg-blue {
            color: rgb(14, 14, 68);
        }

        .bg-dark {
            background-color: rgb(250, 250, 255);
        }

        table,
        th,
        td {
            border: solid rgb(0, 2, 82);
        }

        td{
            font-size: 14px;
        }

        .bold {
            font-weight: bold;
            color: rgb(41, 41, 41);
        }
    </style>
</head>
<body>
    <div style="padding-top: 2rem; padding-left: 2%; padding-right: 2%;">
        <div class="ed-container s-py-2 s-px-2 m-py-2 l-p-2 s-px-2 center color-gray bg-dark"
            style="border-radius: 6px 6px 6px 6px;">
            <div class="ed-item ed-container" style="border-radius: 8px 8px 8px 8px; ">
                <div class="ed-item"
                    style="background-color: rgb(1, 23, 71); color: ghostwhite; display:flex; align-content: flex-start; align-items: center; padding-top: 2px; margin-bottom: 2px;">
                    <div class="s-15 m-10 l-10 s-mr-1">
                        <!--Contenedor de la imagen-->
                        <div style="text-align: center;">
                            <img src="${host}/public/img/logoumg.png" width="85px" height="70px">
                        </div>
                        <!--Profesor-->
                    </div>
                    <div style="text-align:center;">
                        <h5 style="font-size: 18px; font-weight: bold;">Desistimiento de caso ${data.caseNumber}</h5>
                    </div>
                </div>
                <div style="padding-left: 3%; padding-right: 3%;">
                    <div class="text-center font">
                        <h5 style="font-size: 18px; font-weight: bold;">
                            Su solicitud de desistimiento de caso fue aceptada. Por favor contactese con su catedrático
                            asesor si necesita mayor información
                        </h5>
                    </div>
                    <div>
                        <table>
                            <tr>
                                <td class="bold">Usuario</td>
                                <td>${data.firstName || ''} ${data.lastName || ''}</td>
                            </tr>
                            <tr>
                                <td class="bold">Caso</td>
                                <td>${data.caseNumber}</td>
                            </tr>
                        </table>
                    </div>
                    <div style="padding-top: 20px; text-align: right; padding-bottom: 1rem;">
                        <strong style="color: rgb(209, 33, 33);"> Este correo fue generado por el sistema</strong>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>`
    }

    sendMail(mailOptions)
}

notification.deniedDesistmentCase = (data) => {
    let mailOptions = {
        from: `"PsicoApp" ${config.email}`,
        to: data.email,
        subject: "Solicitud de desistimiento de caso",
        html: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mailer</title>
    <style>
        .text-center {
            text-align: justify;
        }

        .content-center {
            align-content: center;
        }

        .color-gray {
            color: rgb(54, 54, 54);
        }

        .font {
            font-family: Arial, Helvetica, sans-serif;
            font-weight: bold;
            font-size: 1.5rem;
        }

        .bg-gray {
            background-color: rgb(245, 245, 245);
            padding: 0% !important;
            margin: 0% !important;
        }

        .bg-blue {
            color: rgb(14, 14, 68);
        }

        .bg-dark {
            background-color: rgb(250, 250, 255);
        }

        table,
        th,
        td {
            border: solid rgb(0, 2, 82);
        }

        td{
            font-size: 14px;
        }

        .bold {
            font-weight: bold;
            color: rgb(41, 41, 41);
        }
    </style>

</head>
<body>
    <div style="padding-top: 2rem; padding-left: 2%; padding-right: 2%;">
        <div class="ed-container s-py-2 s-px-2 m-py-2 l-p-2 s-px-2 center color-gray bg-dark"
            style="border-radius: 6px 6px 6px 6px;">
            <div class="ed-item ed-container" style="border-radius: 8px 8px 8px 8px; ">
                <div class="ed-item"
                    style="background-color: rgb(1, 23, 71); color: ghostwhite; display:flex; align-content: flex-start; align-items: center; padding-top: 2px; margin-bottom: 2px;">
                    <div class="s-15 m-10 l-10 s-mr-1">
                        <!--Contenedor de la imagen-->
                        <div style="text-align: center;">
                            <img src="${host}/public/img/logoumg.png" width="85px" height="70px">
                        </div>
                        <!--Profesor-->
                    </div>
                    <div style="text-align:center;">
                        <h5 style="font-size: 18px; font-weight: bold;">Desistimiento de caso ${data.caseNumber}</h5>
                    </div>
                </div>
                <div style="padding-left: 3%; padding-right: 3%;">
                    <div class="text-center font">
                        <h5 style="font-size: 18px; font-weight: bold;">
                            Su solicitud de desistimiento de caso fue rechazada, por favor contactese con su catedrático
                            asesor si necesita mayor información.
                        </h5>
                    </div>
                    <div>
                        <table>
                            <tr>
                                <td class="bold">Usuario</td>
                                <td>${data.firstName || ''} ${data.lastName || ''}</td>
                            </tr>
                            <tr>
                                <td class="bold">Caso</td>
                                <td>${data.caseNumber}</td>
                            </tr>
                        </table>
                    </div>
                    <div style="padding-top: 20px; text-align: right; padding-bottom: 1rem;">
                        <strong style="color: rgb(209, 33, 33);"> Este correo fue generado por el sistema</strong>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>`
    }

    sendMail(mailOptions)
}

function sendMail(mailOptions) {
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        }
    });
}
module.exports = notification;