import nodemailer from 'nodemailer'

const emailOlvidePassword = async datos => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const {email, nombre, token} = datos

    // Enviar el email
    const info = await transporter.sendMail({
        from: "APV - Administrador de pacientes de veterinaria",
        to: email,
        subject: 'Reestablece tu password',
        text: 'Reestablece tu password',
        html: `<p>Hola, ${nombre}. Has solicitado reestablecer tu password.</p>
            
            <p>En el siguiente enlace podrás generar tu nuevo password:
                <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Reestablecer password</a>
            </p>

            <p>Si tu no creaste esta cuenta, puedes ignorar este mensaje</p>
        
        `
    })

    console.log("mensaje enviado: %s", info.messageId)
}

export default emailOlvidePassword