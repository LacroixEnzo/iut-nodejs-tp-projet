'use strict';

const Schmervice = require('@hapipal/schmervice');
const Boom = require('@hapi/boom');
const EmailService = require('./emailService');
const exportQueue = require('../queues/exportQueue');

module.exports = class FilmService extends Schmervice.Service {

    /**
     * Créer un film (Admin uniquement) et notifier les utilisateurs
     */
    async create(filmData, user) {
        if (user.scope !== 'admin') {
            throw Boom.forbidden('Seuls les administrateurs peuvent ajouter un film.');
        }

        const { Film, User } = this.server.models();
        const emailService = new EmailService();

        // Création du film
        const newFilm = await Film.query().insertAndFetch(filmData);

        // Récupérer tous les utilisateurs
        const users = await User.query().select('email');

        // Envoyer un email à chaque utilisateur
        for (const user of users) {
            await emailService.sendMail(user.email, '🎬 Nouveau film ajouté',
                `Un nouveau film **"${newFilm.titre}"** a été ajouté ! Découvrez-le dès maintenant.`);
        }

        return newFilm;
    }

    /**
     * Modifier un film (Admin uniquement) et notifier les utilisateurs ayant le film en favori
     */
    async update(id, filmData, user) {
        if (user.scope !== 'admin') {
            throw Boom.forbidden('Seuls les administrateurs peuvent modifier un film.');
        }

        const { Film, Favori, User } = this.server.models();
        const emailService = new EmailService();

        // Vérifier si le film existe
        const film = await Film.query().findById(id);
        if (!film) {
            throw Boom.notFound('Film non trouvé.');
        }

        // Mise à jour du film
        const updatedFilm = await Film.query().patchAndFetchById(id, filmData);

        // Récupérer les utilisateurs ayant ce film en favori
        const favoris = await Favori.query().where('film_id', id);
        const userIds = favoris.map(f => f.user_id);
        const users = await User.query().whereIn('id', userIds).select('email');

        // Envoyer un email aux utilisateurs concernés
        for (const user of users) {
            await emailService.sendMail(user.email, '🔔 Un film que vous suivez a été mis à jour',
                `Le film **"${updatedFilm.titre}"** a été mis à jour ! Consultez les nouveautés.`);
        }

        return updatedFilm;
    }

    /**
     * Exporter les films en CSV et envoyer par email (Admin uniquement)
     */
    async exportCSV(user) {
        if (user.scope !== 'admin') {
            throw Boom.forbidden('Seuls les administrateurs peuvent demander un export CSV.');
        }

        const { Film } = this.server.models();
        const films = await Film.query().select('titre', 'description', 'date_sortie', 'realisateur');

        if (!films.length) {
            throw Boom.notFound('Aucun film trouvé dans la base de données.');
        }

        // Ajouter l'export à la file d'attente Redis (message broker)
        await exportQueue.add({ films, email: user.email });

        return { message: '📩 Votre export est en cours. Vous recevrez un email sous peu.' };
    }
};
