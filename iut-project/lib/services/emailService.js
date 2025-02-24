'use strict';

const nodemailer = require('nodemailer');

class EmailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        });
    }

    async sendMail(to, subject, text) {
        const mailOptions = {
            from: process.env.SMTP_USER,
            to,
            subject,
            text
        };

        try {
            await this.transporter.sendMail(mailOptions);
            console.log(`Email envoyé à ${to} : ${subject}`);
        } catch (error) {
            console.error(`Erreur lors de l'envoi de l'email à ${to} :`, error);
        }
    }
}

module.exports = EmailService;
