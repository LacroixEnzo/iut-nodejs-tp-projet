'use strict';

const Schmervice = require('@hapipal/schmervice');
const Boom = require('@hapi/boom');

module.exports = class FilmService extends Schmervice.Service {
    async create(filmData, user) {
        if (user.scope !== 'admin') {
            throw Boom.forbidden('Seuls les administrateurs peuvent ajouter un film.');
        }
        const { Film } = this.server.models();
        return await Film.query().insertAndFetch(filmData);
    }

    async findAll() {
        const { Film } = this.server.models();
        return await Film.query();
    }

    async update(id, filmData, user) {
        if (user.scope !== 'admin') {
            throw Boom.forbidden('Seuls les administrateurs peuvent modifier un film.');
        }
        const { Film } = this.server.models();
        return await Film.query().patchAndFetchById(id, filmData);
    }

    async delete(id, user) {
        if (user.scope !== 'admin') {
            throw Boom.forbidden('Seuls les administrateurs peuvent supprimer un film.');
        }
        const { Film } = this.server.models();
        return await Film.query().deleteById(id);
    }
};
