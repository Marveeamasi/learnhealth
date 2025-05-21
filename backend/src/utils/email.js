const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
     host: "mail.enthernetservices.com",
      port: 465,
      secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

async function sendEmail(to, subject, text) {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject,
            text,
        });
        return { success: true };
    } catch (error) {
        throw new Error(`Email sending failed: ${error.message}`);
    }
}

module.exports = { sendEmail };