'use strict';

const Joi = require('joi');

module.exports = [
    {
        method: 'POST',
        path: '/favori/{filmId}',
        options: {
            tags: ['api'],
            auth: { scope: ['user'] },
            validate: {
                params: Joi.object({ filmId: Joi.number().integer().required() })
            }
        },
        handler: async (request, h) => {
            const { favoriService } = request.services();
            return await favoriService.addFavori(request.auth.credentials.id, request.params.filmId);
        }
    },
    {
        method: 'DELETE',
        path: '/favori/{filmId}',
        options: {
            tags: ['api'],
            auth: { scope: ['user'] },
            validate: {
                params: Joi.object({ filmId: Joi.number().integer().required() })
            }
        },
        handler: async (request, h) => {
            const { favoriService } = request.services();
            return await favoriService.removeFavori(request.auth.credentials.id, request.params.filmId);
        }
    },
    {
        method: 'GET',
        path: '/favoris',
        options: {
            tags: ['api'],
            auth: { scope: ['user'] }
        },
        handler: async (request, h) => {
            const { favoriService } = request.services();
            return await favoriService.getFavoris(request.auth.credentials.id);
        }
    }
];
