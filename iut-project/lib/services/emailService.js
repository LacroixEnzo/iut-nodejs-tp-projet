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
        try {
            await this.transporter.sendMail({
                from: process.env.SMTP_USER,
                to,
                subject,
                text
            });
            console.log(`Email envoyé à ${to} : ${subject}`);
        } catch (error) {
            console.error(`Erreur d'envoi d'email à ${to} :`, error);
        }
    }

    async sendMailWithAttachment(to, subject, text, filePath) {
        try {
            await this.transporter.sendMail({
                from: process.env.SMTP_USER,
                to,
                subject,
                text,
                attachments: [
                    {
                        filename: 'films.csv',
                        path: filePath
                    }
                ]
            });
            console.log(`Email avec CSV envoyé à ${to}`);
        } catch (error) {
            console.error(`Erreur envoi CSV à ${to} :`, error);
        }
    }
}

module.exports = EmailService;
