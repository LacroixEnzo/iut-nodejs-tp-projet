'use strict';

const Queue = require('bull');
const fs = require('fs');
const path = require('path');
const fastCsv = require('fast-csv');
const EmailService = require('../services/emailService');

const exportQueue = new Queue('exportCSV', {
    redis: {
        host: process.env.REDIS_HOST || '127.0.0.1',
        port: process.env.REDIS_PORT || 6379
    }
});

// Traitement des tâches dans la file d'attente
exportQueue.process(async (job) => {
    const { films, email } = job.data;
    const filePath = path.join(__dirname, '../../exports/films.csv');

    return new Promise((resolve, reject) => {
        const writableStream = fs.createWriteStream(filePath);
        const csvStream = fastCsv.format({ headers: true });

        csvStream.pipe(writableStream);
        films.forEach((film) => csvStream.write(film));
        csvStream.end();

        writableStream.on('finish', async () => {
            // Envoyer l'email avec le CSV en pièce jointe
            const emailService = new EmailService();
            await emailService.sendMailWithAttachment(
                email,
                'Export CSV des films',
                'Voici la liste des films en pièce jointe.',
                filePath
            );

            console.log(`Export CSV envoyé à ${email}`);
            resolve();
        });

        writableStream.on('error', reject);
    });
});

module.exports = exportQueue;
