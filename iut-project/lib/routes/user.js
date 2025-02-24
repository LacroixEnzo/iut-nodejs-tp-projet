'use strict';

const Joi = require('joi');

module.exports = [
    {
        method: 'post',
        path: '/user',
        options: {
            auth: false,
            tags: ['api'],
            validate: {
                payload: Joi.object({
                    firstName: Joi.string().required().min(3).example('John').description('Prénom'),
                    lastName: Joi.string().required().min(3).example('Doe').description('Nom'),
                    email: Joi.string().required().email().example('john@doe.fr').description('Email'),
                    password: Joi.string().required().example('password').description('Mot de passe'),
                    username: Joi.string().required().example('johndoe').description('Nom d’utilisateur')
                })
            }
        },
        handler: async (request, h) => {
            const { userService } = request.services();
            return await userService.create(request.payload);
        }
    },
    {
        method: 'get',
        path: '/users',
        options: { tags: ['api'] },
        handler: async (request, h) => {
            const { userService } = request.services();
            return await userService.findAll();
        }
    },
    {
        method: 'delete',
        path: '/user/{id}',
        options: {
            tags: ['api'],
            validate: { params: Joi.object({ id: Joi.number().integer().required().min(1) }) }
        },
        handler: async (request, h) => {
            const { userService } = request.services();
            return await userService.delete(request.params.id);
        }
    },
    {
        method: 'patch',
        path: '/user/{id}',
        options: {
            tags: ['api'],
            auth: { scope: ['admin'] },
            validate: {
                params: Joi.object({ id: Joi.number().integer().required().min(1) }),
                payload: Joi.object({
                    firstName: Joi.string().min(3),
                    lastName: Joi.string().min(3),
                    email: Joi.string().email(),
                    password: Joi.string(),
                    username: Joi.string()
                })
            }
        },
        handler: async (request, h) => {
            const { userService } = request.services();
            return await userService.update(request.params.id, request.payload);
        }
    },
    {
        method: 'post',
        path: '/user/login',
        options: {
            tags: ['api'],
            auth: false,
            validate: {
                payload: Joi.object({
                    email: Joi.string().email().required(),
                    password: Joi.string().required()
                })
            }
        },
        handler: async (request, h) => {
            const { userService } = request.services();
            return await userService.login(request.payload.email, request.payload.password);
        }
    }
];