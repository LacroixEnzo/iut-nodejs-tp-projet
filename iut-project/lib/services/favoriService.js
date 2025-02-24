'use strict';

const Schmervice = require('@hapipal/schmervice');
const Boom = require('@hapi/boom');

module.exports = class FavoriService extends Schmervice.Service {
    async addFavori(userId, filmId) {
        const { Favori, Film } = this.server.models();

        // Vérifier si le film existe
        const film = await Film.query().findById(filmId);
        if (!film) {
            throw Boom.notFound('Le film demandé n’existe pas.');
        }

        // Vérifier si le favori existe déjà
        const existe = await Favori.query().where({ user_id: userId, film_id: filmId }).first();
        if (existe) {
            throw Boom.conflict('Ce film est déjà dans vos favoris.');
        }

        // Ajouter le film en favori
        return await Favori.query().insertAndFetch({ user_id: userId, film_id: filmId });
    }

    async removeFavori(userId, filmId) {
        const { Favori } = this.server.models();

        // Vérifier si le favori existe
        const favori = await Favori.query().where({ user_id: userId, film_id: filmId }).first();
        if (!favori) {
            throw Boom.notFound('Ce film n’est pas dans vos favoris.');
        }

        // Supprimer le favori
        await Favori.query().delete().where({ user_id: userId, film_id: filmId });

        return { message: 'Film retiré des favoris.' };
    }

    async getFavoris(userId) {
        const { Favori, Film } = this.server.models();

        // Récupérer les films favoris de l'utilisateur
        return await Favori.query()
            .where({ user_id: userId })
            .join('films', 'favoris.film_id', 'films.id')
            .select('films.*');
    }
};
