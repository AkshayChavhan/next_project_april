import nodemailer from "nodemailer";


export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        // configuration is remaining


        const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // Use `true` for port 465, `false` for all other ports
            auth: {
                user: "maddison53@ethereal.email",
                pass: "jn7jnAPss4f63QBp6D",
            },
        });

        const mailOptions = await transporter.sendMail({
            from: '"Akshay Chavhan 👻" <akshaychavhan676@gmail.com>',
            to: email,
            subject: emailType === 'VERIFY' ? "Verify your email" : "Reset your password",
            text: "Reset your password",
            html: "<b>Hello world?</b>",
        });

        const mailResponse = await transporter.sendMail(mailOptions);
        return mailResponse;
    } catch (error: any) {
        throw new Error(error.message)
    }
}


