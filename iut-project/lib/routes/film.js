'use strict';

const Joi = require('joi');

module.exports = [
    {
        method: 'POST',
        path: '/film',
        options: {
            tags: ['api'],
            auth: { scope: ['admin'] },
            validate: {
                payload: Joi.object({
                    titre: Joi.string().required(),
                    description: Joi.string().required(),
                    date_sortie: Joi.string().isoDate().required(),
                    realisateur: Joi.string().required()
                })
            }
        },
        handler: async (request, h) => {
            const { filmService } = request.services();
            return await filmService.create(request.payload, request.auth.credentials);
        }
    },
    {
        method: 'GET',
        path: '/films',
        options: { tags: ['api'], auth: false },
        handler: async (request, h) => {
            const { filmService } = request.services();
            return await filmService.findAll();
        }
    },
    {
        method: 'PATCH',
        path: '/film/{id}',
        options: {
            tags: ['api'],
            auth: { scope: ['admin'] },
            validate: {
                params: Joi.object({ id: Joi.number().integer().required() }),
                payload: Joi.object({
                    titre: Joi.string(),
                    description: Joi.string(),
                    date_sortie: Joi.string().isoDate(),
                    realisateur: Joi.string()
                })
            }
        },
        handler: async (request, h) => {
            const { filmService } = request.services();
            return await filmService.update(request.params.id, request.payload, request.auth.credentials);
        }
    },
    {
        method: 'DELETE',
        path: '/film/{id}',
        options: {
            tags: ['api'],
            auth: { scope: ['admin'] },
            validate: {
                params: Joi.object({ id: Joi.number().integer().required() })
            }
        },
        handler: async (request, h) => {
            const { filmService } = request.services();
            return await filmService.delete(request.params.id, request.auth.credentials);
        }
    }
];
