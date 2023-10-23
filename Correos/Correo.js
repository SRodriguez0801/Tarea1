const nodemailer = require('nodemailer');
require('dotenv').config();
const pass_api = process.env.api_Prueb;

exports.correoDeBienvenida = async (emailData) => {
    const conexion = await nodemailer.createTransport({
        host: "smtp.resend.com",
        port: 465,
        auth: {
            user: "resend",
            pass: pass_api
        },
    });




    let content = {
        from: "Prueb@resend.dev",
        to: emailData.to,
        subject: "Correo de Bienvenida",
        html: `<p> Registrado con Exito <strong> ${emailData.name} </strong><p>`
    }

   await conexion.sendMail(content, (error, info) => {

        if (error) {
            console.log(`Error ${error}`);
        } else {
            console.log(`Correo enviado exitosamente ${info.response}`);
        }
    });
}