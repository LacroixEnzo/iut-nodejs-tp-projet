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

    async sendWelcomeEmail(to) {
        const mailOptions = {
            from: process.env.SMTP_USER,
            to,
            subject: 'Bienvenue sur notre plateforme !',
            text: 'Merci de vous être inscrit sur notre plateforme. Nous sommes ravis de vous compter parmi nous !'
        };

        try {
            await this.transporter.sendMail(mailOptions);
            console.log(`Email de bienvenue envoyé à ${to}`);
        } catch (error) {
            console.error('Erreur lors de l’envoi de l’email :', error);
        }
    }
}

module.exports = EmailService;
