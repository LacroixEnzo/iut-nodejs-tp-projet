'use strict';

const { Model } = require('schwifty');

module.exports = class Film extends Model {
    static get tableName() {
        return 'films';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['titre', 'description', 'date_sortie', 'realisateur'],
            properties: {
                id: { type: 'integer' },
                titre: { type: 'string', minLength: 1, maxLength: 255 },
                description: { type: 'string', minLength: 1 },
                date_sortie: { type: 'string', format: 'date' },
                realisateur: { type: 'string', minLength: 1, maxLength: 255 },
                created_at: { type: 'string', format: 'date-time' },
                updated_at: { type: 'string', format: 'date-time' }
            }
        };
    }
};
